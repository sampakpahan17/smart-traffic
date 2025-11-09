import cv2
import threading
import time
from vehicle_detection import detect_vehicles

# ==============================
# Daftar 10 lokasi CCTV ATCS
# ==============================
CCTV_STREAMS = {
    "PENGADILAN": "https://atcsdishub.medan.go.id/stream/L9PENGADILANKPT.MAULANALUBIS/stream.m3u8",
    "SUPRAPTO": "https://atcsdishub.medan.go.id/stream/L12SUPRAPTOMULTATULI/stream.m3u8",
    "SUDIRMAN": "https://atcsdishub.medan.go.id/stream/L16SUDIRMANDIPONEGORO/stream.m3u8",
    "PELANGI": "https://atcsdishub.medan.go.id/stream/L21SMRAJAPELANGI/stream.m3u8",
    "PANGLIMA-DENAI": "https://atcsdishub.medan.go.id/stream/L23AMPLAS/stream.m3u8",
    "HARYONO": "https://atcsdishub.medan.go.id/stream/L25MEDANMALL/stream.m3u8",
    "ALFALAH": "https://atcsdishub.medan.go.id/stream/L34SMRAJAALFALAH/stream.m3u8",
    "GAHARU": "https://atcsdishub.medan.go.id/stream/L44GAHARUPERINTIS/stream.m3u8",
    "YOSUDARSO": "https://atcsdishub.medan.go.id/stream/L48BILALYOSSUDARSO/stream.m3u8",
    "JUANDA": "https://atcsdishub.medan.go.id/stream/L55JUANDAWALIKOTA/stream.m3u8"
}

# ==============================
# Variabel global
# ==============================
detection_results = {}
stream_threads = {}
lock = threading.Lock()

# ==============================
# Fungsi utama deteksi per lokasi
# ==============================
def process_stream(location, url):
    cap = cv2.VideoCapture(url)
    if not cap.isOpened():
        print(f"[ERROR] Gagal membuka stream: {location}")
        return

    print(f"[INFO] Stream aktif: {location}")

    while True:
        ret, frame = cap.read()
        if not ret:
            print(f"[WARNING] Stream {location} berhenti sementara...")
            time.sleep(2)
            continue

        frame, counts = detect_vehicles(frame)

        # Simpan hasil deteksi (thread-safe)
        with lock:
            detection_results[location] = {
                "counts": counts,
                "timestamp": time.time()
            }

        time.sleep(1)  # deteksi tiap 1 detik

# ==============================
# Manajemen Thread Stream
# ==============================
def start_stream(location):
    if location in CCTV_STREAMS and location not in stream_threads:
        t = threading.Thread(target=process_stream, args=(location, CCTV_STREAMS[location]), daemon=True)
        t.start()
        stream_threads[location] = t

def start_all_streams():
    for loc in CCTV_STREAMS:
        start_stream(loc)

# ==============================
# Untuk FastAPI Streaming Video
# ==============================
def generate_frames(location):
    """
    Fungsi generator yang mengirimkan frame MJPEG ke client secara streaming.
    """
    start_stream(location)
    cap = cv2.VideoCapture(CCTV_STREAMS[location])
    if not cap.isOpened():
        raise RuntimeError(f"Stream {location} tidak dapat dibuka")

    while True:
        success, frame = cap.read()
        if not success:
            print(f"[WARNING] Gagal membaca frame dari {location}")
            time.sleep(1)
            continue

        # Jalankan deteksi kendaraan
        frame, _ = detect_vehicles(frame)

        # Encode frame ke JPEG
        ret, buffer = cv2.imencode('.jpg', frame)
        if not ret:
            continue

        frame_bytes = buffer.tobytes()

        # Kirim frame dalam format multipart MJPEG
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

# ==============================
# API Helper
# ==============================
def get_latest_data(location):
    with lock:
        return detection_results.get(location, {"error": "Location not found"})

def get_all_data():
    with lock:
        return detection_results

# ==============================
# 🔥 Summary untuk /data/all
# ==============================
def get_all_data_summary():
    with lock:
        total_counts = {"Mobil": 0, "Motor": 0, "Bus": 0, "Truk": 0}
        data_per_location = {}

        for loc, data in detection_results.items():
            counts = data.get("counts", {})
            mapped = {
                "Mobil": counts.get("car", 0),
                "Motor": counts.get("motorcycle", 0),
                "Bus": counts.get("bus", 0),
                "Truk": counts.get("truck", 0)
            }

            for k in total_counts:
                total_counts[k] += mapped[k]

            data_per_location[loc] = mapped

        return {
            "total_counts": total_counts,
            "locations": data_per_location,
            "timestamp": time.time()
        }
