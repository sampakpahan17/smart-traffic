import React from "react";
import { useLocation } from "react-router-dom";

export default function VehicleStats({ counts = {} }) {
  const location = useLocation();
  const isLivePage = location.pathname.includes("/live");

  // Total kendaraan dari semua jenis
  const total = Object.values(counts || {}).reduce((a, b) => a + (b || 0), 0);

  // Fungsi kepadatan otomatis (lebih halus untuk Live)
  const getKepadatan = (jumlah) => {
    if (jumlah === 0) return "Lenggang";
    if (jumlah < 10) return "Lancar";
    if (jumlah < 30) return "Ramai";
    if (jumlah < 60) return "Padat";
    return "Macet";
  };

  const kepadatan = getKepadatan(total);

  // Warna kepadatan
  const getColor = (status) => {
    switch (status) {
      case "Macet":
        return "text-red-600";
      case "Padat":
        return "text-orange-500";
      case "Ramai":
        return "text-yellow-500";
      case "Lancar":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  // Mode Live Streaming
  if (isLivePage) {
    return (
      <div className="bg-white rounded-xl p-4 shadow">
        <h3 className="font-semibold text-lg">Deteksi Kendaraan</h3>
        <div className="mt-4">
          <div className="text-3xl font-bold">{total}</div>
          <div className="text-sm text-slate-500">Total Kendaraan</div>
          <div className="mt-3">
            <div>
              <strong>Kepadatan:</strong>{" "}
              <span className={getColor(kepadatan)}>{kepadatan}</span>
            </div>
            <div className="text-sm text-slate-500">
              Berdasarkan jumlah deteksi saat ini
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mode Dashboard
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-3">Deteksi Kendaraan</h3>

      <div className="text-4xl font-bold text-slate-800">{total}</div>
      <div className="text-slate-500 text-sm mb-3">Total Kendaraan</div>

      <div className="border-t border-slate-200 pt-3 space-y-1 text-sm">
        <div className="flex justify-between">
          <span>🚗 Mobil</span>
          <span className="font-medium text-slate-700">{counts.Mobil || counts.car || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>🏍️ Motor</span>
          <span className="font-medium text-slate-700">{counts.Motor || counts.motorcycle || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>🚌 Bus</span>
          <span className="font-medium text-slate-700">{counts.Bus || counts.bus || 0}</span>
        </div>
        <div className="flex justify-between">
          <span>🚚 Truk</span>
          <span className="font-medium text-slate-700">{counts.Truk || counts.truck || 0}</span>
        </div>
      </div>
    </div>
  );
}
