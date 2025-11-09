import React from "react";

export default function AboutUs(){
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-2xl font-semibold mb-3">About Smart Traffic Vision</h2>
      <p className="mb-2">Nama Tim: S^2 F Logic</p>
      <p className="mb-2">Anggota: Samuel G. Christian Pakpahan (221113531), Sontiar Eseria Tampubolon (221112223)</p>
      <p className="mb-2">Deskripsi: Sistem deteksi kepadatan lalu lintas berbasis Computer Vision menggunakan YOLOv8. Menampilkan live stream CCTV ATCS, deteksi kendaraan realtime, heatmap lokasi, dan grafik statistik.</p>
      <p className="mb-2">Backend: Python + FastAPI + YOLOv8. Frontend: React + Vite + Tailwind.</p>
    </div>
  );
}
