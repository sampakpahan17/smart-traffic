# 🚦 Smart Traffic Vision — Deteksi Kemacetan Otomatis Berbasis AI

### 👥 Tim: **S² F Logic**
Proyek ini merupakan tugas **Ujian Tengah Semester (UTS)** mata kuliah **Machine Learning**, dengan tujuan membangun sistem yang mampu **mendeteksi tingkat kemacetan lalu lintas secara otomatis** menggunakan **AI berbasis Computer Vision (YOLOv8)**.  
Aplikasi ini menggabungkan **backend FastAPI** untuk pemrosesan AI & streaming video, serta **frontend React + TailwindCSS** untuk visualisasi data real-time.

---

## 👨‍💻 Anggota Kelompok 15

| Nama Lengkap | NIM | Peran |
|---------------|------|-------|
| **Samuel G. Christian Pakpahan** | 221113531 | Backend, Frontend & Integrasi AI |
| **Sontiar Eseria Tampubolon** | 221112223 | Frontend & Visualisasi Data |

---

## 📸 Tampilan Aplikasi

### Dashboard
![Dashboard]("assets/hasil%20(2).png")

### Live Streaming
![LiveStreaming](.assets/hasil%20(3).png)

### About
![About](.assets/hasil%20(1).png)

---

## 🚀 Fitur Utama

- ✅ **Real-time YOLOv8 Detection** — deteksi kendaraan langsung dari CCTV ATCS Kota Medan  
- 🧠 **Analisis Kepadatan Otomatis** — sistem menentukan status jalan (Lancar, Padat, Macet)  
- 🌐 **Live Streaming & Heatmap** — visualisasi interaktif dari data real-time  
- 📊 **Dashboard Statistik** — menampilkan volume kendaraan per jenis & lokasi  
- ⚙️ **Backend FastAPI + Frontend React** — terintegrasi penuh dan dapat dikonfigurasi lokal

---

## 🧩 Arsitektur Sistem

```
📂 smart_traffic/
 ├── 📁 be/                # Backend FastAPI (YOLOv8 + API)
 │    ├── main.py          # Endpoint utama
 │    ├── video_stream.py  # Deteksi kendaraan & manajemen stream
 │    ├── vehicle_detection.py
 │    ├── requirements.txt
 ├── 📁 fe/                # Frontend React + Tailwind
 │    ├── src/
 │    │    ├── components/
 │    │    ├── pages/
 │    │    ├── utils/
 │    │    └── App.jsx
 │    ├── package.json
 └── README.md
```

---

## ⚙️ 1. Cara Instalasi dan Konfigurasi

### 🧱 Persiapan Awal
> Lakukan semua langkah ini di **VS Code Terminal** atau **Command Prompt (cmd)**.

1. **Clone repository GitHub:**
   ```bash
   git clone https://github.com/sampakpahan17/smart-traffic.git
   cd smart-traffic
   ```

2. **Masuk ke folder backend:**
   ```bash
   cd be
   ```

3. **Buat Virtual Environment (venv):**
   > Langkah ini menjaga dependency agar tidak bentrok dengan proyek lain.
   ```bash
   python -m venv venv
   ```

4. **Aktifkan Virtual Environment:**
   - 🪟 **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - 🐧 **Linux/Mac:**
     ```bash
     source venv/bin/activate
     ```

5. **Instal semua dependensi backend:**
   ```bash
   pip install -r requirements.txt
   ```
---

## 🧠 2. Menjalankan Backend (FastAPI + YOLOv8)

1. Jalankan server FastAPI:
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```
2. Jika berhasil, akan muncul pesan:
   ```
   INFO:     Application startup complete.
   INFO:     Semua stream CCTV sudah aktif otomatis.
   ```
3. Buka di browser:
   👉 [http://localhost:8000](http://localhost:8000)

---

## 💻 3. Menjalankan Frontend (React + TailwindCSS)

1. **Masuk ke folder frontend:**
   ```bash
   cd ../fe
   ```

2. **Instal dependensi frontend:**
   ```bash
   npm install
   ```

3. **Jalankan frontend:**
   ```bash
   npm run dev
   ```

4. Buka di browser:
   👉 [http://localhost:5173](http://localhost:5173)

---

## 🔗 4. Menjalankan Kedua Sistem Bersamaan

| Komponen | Port | Deskripsi |
|-----------|-------|-----------|
| **Backend (FastAPI)** | `8000` | API & deteksi kendaraan |
| **Frontend (Vite)** | `5173` | Antarmuka pengguna |

Pastikan kedua terminal aktif:
- Terminal 1 → jalankan backend (`uvicorn main:app`)
- Terminal 2 → jalankan frontend (`npm run dev`)

---

## 🎯 5. Petunjuk Penggunaan Aplikasi

1. **Buka halaman Dashboard**
   - Lihat grafik total kendaraan, pie chart per jenis & per lokasi
   - Heatmap menunjukkan kondisi lalu lintas (hijau → merah)

2. **Masuk ke halaman Live Streaming**
   - Pilih lokasi CCTV ATCS
   - Tonton video live dengan deteksi kendaraan real-time
   - Lihat jumlah kendaraan & tingkat kepadatan otomatis

3. **Backend API Utama:**
   - `GET /` → daftar lokasi CCTV
   - `GET /data/all` → ringkasan semua lokasi
   - `GET /data/{location}` → data satu lokasi
   - `GET /stream/{location}` → video stream MJPEG

---

## 🧩 6. Teknologi yang Digunakan

| Layer | Teknologi |
|-------|------------|
| **AI Engine** | YOLOv8 (Ultralytics) |
| **Backend** | FastAPI, OpenCV, Threading, CORS |
| **Frontend** | React.js, TailwindCSS, Recharts, Leaflet.js |
| **Video Stream** | MJPEG via FastAPI StreamingResponse |

---

## 🎬 7. Demo Video & Link Repository

📽️ **Demo Video UTS Machine Learning:**  
👉 *(Akan diunggah ke folder video di repo / link YouTube oleh tim S² F Logic)*  

📦 **Repository GitHub (Publik):**  
🔗 [https://github.com/sampakpahan17/smart-traffic](https://github.com/sampakpahan17/smart-traffic)

🗂️ **Backup Kode Program Lengkap (Google Drive):**  
🔗 [https://drive.google.com/drive/folders/1vTw7TpM8RCr2gZRs-yC5gRXCUXS1e_Ic?usp=sharing](https://drive.google.com/drive/folders/1vTw7TpM8RCr2gZRs-yC5gRXCUXS1e_Ic?usp=sharing)

---

## 🏁 Penutup

> “Smart Traffic Vision membantu memantau lalu lintas secara **efisien dan real-time**, memberikan solusi nyata untuk mengurangi kemacetan dengan teknologi AI.”

✨ Dibuat oleh **Tim S² F Logic** — _Machine Learning Project UTS 2025_
