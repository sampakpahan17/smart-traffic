# 🚦 Smart Traffic Vision (S² F Logic)

## 📘 Deskripsi Proyek
Proyek **Smart Traffic Vision** adalah sistem **AI berbasis Computer Vision** yang digunakan untuk mendeteksi dan menganalisis **tingkat kepadatan lalu lintas** secara otomatis dari kamera **CCTV ATCS Kota Medan**.  
Aplikasi ini menampilkan hasil deteksi kendaraan seperti **mobil, motor, bus, dan truk**, serta menghitung volume kendaraan untuk menilai **tingkat kemacetan (Lenggang, Lancar, Ramai, Padat, Macet)** secara real-time.

---

## 👥 Tim S² F Logic
| Nama Lengkap | NIM | Peran |
|---------------|------|-------|
| **Samuel G. Christian Pakpahan** | 221113531 | Backend & Frontend Developer / Integrator YOLOv8 |
| **Sontiar Eseria Tampubolon** | 221112223 | Frontend Developer / UI Designer |

---

## 🎯 Tujuan Proyek
Proyek ini merupakan **tugas Ujian Tengah Semester (UTS)** mata kuliah **Machine Learning** dengan fokus penerapan model **YOLOv8** untuk deteksi kendaraan.  
Sistem ini membantu menganalisis kondisi lalu lintas dengan menampilkan data deteksi secara visual melalui **dashboard interaktif** berbasis web.

---

## 🧠 Teknologi yang Digunakan
### Backend
- **Python 3.11+**
- **FastAPI** – Framework untuk REST API dan video streaming.
- **OpenCV** – Pengolahan video real-time dari CCTV.
- **Ultralytics YOLOv8** – Model AI deteksi objek (kendaraan).
- **Threading** – Untuk multi-stream deteksi paralel.
- **Uvicorn** – Web server untuk menjalankan API FastAPI.

### Frontend
- **React.js (Vite)** – Framework SPA untuk dashboard.
- **Tailwind CSS** – Desain responsif dan modern.
- **Recharts** – Visualisasi data (pie chart, line chart, dsb).
- **Axios** – Komunikasi API dengan backend.

---

## 🖼️ Fitur Utama
- 🔴 **Live Streaming Deteksi Kendaraan** dari CCTV ATCS.
- 📊 **Dashboard Statistik** total kendaraan per jenis dan per lokasi.
- 🕒 **Update Real-Time** setiap 5 detik.
- 🌡️ **Status Kepadatan Otomatis**: Lenggang, Lancar, Ramai, Padat, Macet.
- 📈 **Visualisasi Data** menggunakan grafik dan pie chart interaktif.

---

## ⚙️ Cara Instalasi dan Konfigurasi

### 1️⃣ Clone Repository
```bash
git clone https://github.com/username/smart-traffic-vision.git
cd smart-traffic-vision
```

### 2️⃣ Setup Backend (FastAPI + YOLOv8)
Masuk ke folder backend:
```bash
cd be
pip install -r requirements.txt
```

Jalankan backend:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```
Akan berjalan di `http://localhost:8000`

---

### 3️⃣ Setup Frontend (React + Tailwind)
Masuk ke folder frontend:
```bash
cd fe
npm install
npm run dev
```
Frontend berjalan di `http://localhost:5173`

Pastikan koneksi API diarahkan ke backend (`http://localhost:8000`).

---

## 🧩 Struktur Folder
```
smart-traffic-vision/
│
├── 📂 be/                 # Backend (FastAPI, YOLOv8, OpenCV)
│   ├── main.py
│   ├── video_stream.py
│   ├── vehicle_detection.py
│   ├── requirements.txt
│   └── best.pt
│
├── 📂 fe/                 # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   │   ├── VehicleStats.jsx
│   │   │   ├── TrafficChart.jsx
│   │   │   └── Heatmap.jsx
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── 📂 video/              # Folder video demonstrasi
│   └── demo.mp4 (atau link.txt)
│
└── 📄 README.md
```

## 🧾 Kriteria Penilaian (Sesuai Panduan Dosen)
| Aspek | Deskripsi |
|-------|------------|
| 💡 **Kompleksitas Masalah & Solusi** | Deteksi multi-objek real-time dari streaming CCTV publik |
| 🧠 **Kualitas Implementasi AI** | YOLOv8 pretrained model, optimasi OpenCV, multithreading |
| 🌐 **Deployment & Integrasi Live** | Fullstack terhubung React + FastAPI |
| 🎥 **Demo Video** | Jelas, terstruktur, dan menunjukkan hasil live |
| 📄 **Dokumentasi & Kode Sumber** | Lengkap, modular, mudah dijalankan |

---

## 📸 Tampilan Aplikasi Smart Traffic Vision

### Dashboard
![Dashboard](./assets/hasil%20(2).png)

### Live Streaming
![LiveStreaming](./assets/hasil%20(3).png)

### About Page
![AboutPage](./assets/hasil%20(1).png)

---

## 🏁 Penutup
Proyek ini menjadi wujud penerapan nyata dari **AI dalam Smart City**, khususnya untuk analisis lalu lintas di Medan.  
Dengan sistem ini, diharapkan dapat membantu **Dinas Perhubungan** dalam pengambilan keputusan berbasis data real-time.

---

**📘 Tim S² F Logic – Machine Learning UTS 2025**  
`Samuel G. Christian Pakpahan (221113531)`  
`Sontiar Eseria Tampubolon (221112223)`
