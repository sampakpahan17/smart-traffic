// src/components/StatsCard.jsx
import React from "react";

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-5 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-yellow-500 text-3xl">{icon}</div>
    </div>
  );
};

export default StatsCard;
