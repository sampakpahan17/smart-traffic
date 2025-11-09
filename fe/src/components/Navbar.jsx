import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar(){
  const loc = useLocation();
  return (
    <header className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">🚦</div>
          <div>
            <div className="font-semibold">Smart Traffic Vision</div>
            <div className="text-xs text-slate-300">YOLOv8 | FastAPI</div>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link to="/" className={`hover:underline ${loc.pathname === "/" ? "font-semibold" : ""}`}>Dashboard</Link>
          <Link to="/live" className={`hover:underline ${loc.pathname === "/live" ? "font-semibold" : ""}`}>Live Streaming</Link>
          <Link to="/about" className={`hover:underline ${loc.pathname === "/about" ? "font-semibold" : ""}`}>About Us</Link>
        </nav>
      </div>
    </header>
  );
}
