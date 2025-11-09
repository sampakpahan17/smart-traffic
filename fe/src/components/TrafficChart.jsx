// src/components/TrafficChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#facc15", "#f97316"]; 
// Mobil = biru, Motor = hijau, Bus = kuning, Truk = oranye

// =============================
// 1️⃣ Pie Chart Per Jenis Kendaraan
// =============================
export function VehiclePie({ data }) {
  const pieData = [
    { name: "Mobil", value: data.Mobil || data.car || 0 },
    { name: "Motor", value: data.Motor || data.motorcycle || 0 },
    { name: "Bus", value: data.Bus || data.bus || 0 },
    { name: "Truk", value: data.Truk || data.truck || 0 },
  ];

  const total = pieData.reduce((sum, d) => sum + d.value, 0);
  const filteredData = pieData.filter((d) => d.value > 0);

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2 text-slate-800">
        Proporsi Jenis Kendaraan (Total Keseluruhan)
      </h3>

      {total === 0 ? (
        <p className="text-sm text-gray-500 text-center mt-6">
          Belum ada kendaraan terdeteksi
        </p>
      ) : (
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={filteredData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={85}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {filteredData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v} kendaraan`} />
              <Legend
                verticalAlign="bottom"
                align="center"
                wrapperStyle={{
                  fontSize: "12px",
                  marginTop: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// =============================
// 2️⃣ Pie Chart Per Lokasi
// =============================
export function VehiclePieByLocation({ data }) {
  const shorten = (name) => {
    if (!name) return "";
    return name.length > 12 ? name.slice(0, 12) + "..." : name;
  };

  const formattedData = data.map((d) => ({
    ...d,
    shortName: shorten(d.name),
  }));

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2 text-slate-800">
        Proporsi Total Kendaraan per Lokasi
      </h3>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="total"
              nameKey="shortName"
              cx="50%"
              cy="50%"
              outerRadius={85}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {formattedData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => `${v} kendaraan`}
              labelFormatter={(label, payload) =>
                payload?.[0]?.payload?.name || label
              }
            />
            <Legend
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{
                fontSize: "12px",
                marginTop: "10px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// =============================
// 3️⃣ Line Chart Total Kendaraan
// =============================
export function VehicleLine({ data }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-semibold mb-2 text-slate-800">
        Tren Total Kendaraan
      </h3>
      <div style={{ width: "100%", height: 250 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
