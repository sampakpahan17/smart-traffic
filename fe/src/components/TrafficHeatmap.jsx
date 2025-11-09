import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LOC_COORDS = {
  "PENGADILAN": [3.594, 98.675],
  "SUPRAPTO": [3.583, 98.658],
  "SUDIRMAN": [3.577, 98.659],
  "PELANGI": [3.590, 98.667],
  "PANGLIMA-DENAI": [3.591, 98.664],
  "HARYONO": [3.580, 98.667],
  "ALFALAH": [3.589, 98.665],
  "YOSUDARSO": [3.587, 98.670],
  "JUANDA": [3.593, 98.679],
  "GAHARU": [3.596, 98.676],
};

export default function TrafficHeatmap({ allData }) {
  useEffect(() => {
    // defensive: ambil locations dari kedua kemungkinan shape
    const locations =
      allData && allData.locations ? allData.locations : allData || {};

    // debug (hapus kalau sudah oke)
    // console.log("TrafficHeatmap locations:", locations);

    const map = L.map("map", {
      center: [3.587, 98.67],
      zoom: 13,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    Object.keys(LOC_COORDS).forEach((name) => {
      const coords = LOC_COORDS[name];
      const entry = locations[name];

      const total = entry
        ? (entry.Mobil || 0) +
          (entry.Motor || 0) +
          (entry.Bus || 0) +
          (entry.Truk || 0)
        : 0;

      // warna berdasarkan total (atur sesuai preferensi)
      let color = "green"; // 0-19
      if (total >= 6 && total < 12) color = "yellow";
      else if (total >= 14 && total < 20) color = "orange";
      else if (total >= 25) color = "red";

      const radius = Math.min(40 + total * 2, 200);

      const circle = L.circle(coords, {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.6,
      }).addTo(map);

      circle.bindPopup(
        `<b>${name}</b><br/>Total kendaraan: ${total}<br/><b>Status:</b> ${
          total < 6 ? "Lancar" : total < 12 ? "Ramai" : total < 20 ? "Padat" : "Macet"
        }`
      );
    });

    // legend kecil
    const legend = L.control({ position: "bottomleft" });
    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      div.style.background = "white";
      div.style.padding = "6px 8px";
      div.style.borderRadius = "8px";
      div.style.fontSize = "12px";
      div.innerHTML =
        '<div style="display:flex;gap:8px;align-items:center;"><span style="width:12px;height:12px;background:green;display:inline-block;border-radius:3px;"></span>Lancar</div>' +
        '<div style="display:flex;gap:8px;align-items:center;"><span style="width:12px;height:12px;background:yellow;display:inline-block;border-radius:3px;"></span>Ramai</div>' +
        '<div style="display:flex;gap:8px;align-items:center;"><span style="width:12px;height:12px;background:orange;display:inline-block;border-radius:3px;"></span>Padat</div>' +
        '<div style="display:flex;gap:8px;align-items:center;"><span style="width:12px;height:12px;background:red;display:inline-block;border-radius:3px;"></span>Macet</div>';
      return div;
    };
    legend.addTo(map);

    return () => map.remove();
  }, [allData]);

  return (
    <div className="bg-white rounded-xl p-2 shadow">
      <h3 className="font-semibold mb-2">Traffic Heatmap</h3>
      <div id="map" style={{ height: 320 }} />
    </div>
  );
}
