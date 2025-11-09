import React, { useEffect, useState } from "react";
import { VehicleLine } from "../components/TrafficChart";
import { VehiclePieByLocation } from "../components/TrafficChart"; // versi lokasi
import TrafficHeatmap from "../components/TrafficHeatmap";
import VehicleStats from "../components/VehicleStats";

export default function Dashboard() {
  const [chartData, setChartData] = useState([]);
  const [vehicleData, setVehicleData] = useState({
    Mobil: 0,
    Motor: 0,
    Bus: 0,
    Truk: 0,
  });
  const [pieByLocation, setPieByLocation] = useState([]);
  const [total, setTotal] = useState(0);
  const [locations, setLocations] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/data/all");
        const json = await res.json();
        const locs = json.locations || {};

        // Hitung total kendaraan per lokasi
        const pieData = Object.entries(locs).map(([name, loc]) => {
          const total =
            (loc.Mobil || 0) +
            (loc.Motor || 0) +
            (loc.Bus || 0) +
            (loc.Truk || 0);
          return { name, total };
        });

        // Hitung total keseluruhan kendaraan semua lokasi
        const totalAll = pieData.reduce((sum, item) => sum + item.total, 0);

        // Hitung total per jenis
        let sumMobil = 0,
          sumMotor = 0,
          sumBus = 0,
          sumTruk = 0;
        Object.values(locs).forEach((loc) => {
          sumMobil += loc.Mobil || 0;
          sumMotor += loc.Motor || 0;
          sumBus += loc.Bus || 0;
          sumTruk += loc.Truk || 0;
        });

        const totalVehicles = sumMobil + sumMotor + sumBus + sumTruk;

        setVehicleData({
          Mobil: sumMobil,
          Motor: sumMotor,
          Bus: sumBus,
          Truk: sumTruk,
        });
        setTotal(totalVehicles);
        setLocations(locs);
        setPieByLocation(pieData);

        // Update grafik waktu (line chart)
        setChartData((prev) => [
          ...prev.slice(-10),
          { time: new Date().toLocaleTimeString(), total: totalVehicles },
        ]);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-xl p-4 shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Live Overview</h2>
            <div className="text-sm text-slate-500">
              Realtime detections (semua lokasi)
            </div>
          </div>
          <div className="mt-4">
            <VehicleLine data={chartData} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VehiclePieByLocation data={pieByLocation} />
          <VehicleStats counts={vehicleData} total={total} />
        </div>
      </div>

      <div className="space-y-4">
        <TrafficHeatmap allData={locations} />
        <div className="bg-white rounded-xl p-4 shadow">
          <h3 className="font-semibold">Lokasi</h3>
          <div className="mt-2 text-sm text-slate-600">
            Pilih di halaman Live Streaming untuk melihat video per lokasi.
          </div>
        </div>
      </div>
    </div>
  );
}
