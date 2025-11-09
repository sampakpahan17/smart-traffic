import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LiveStreaming from "./pages/LiveStreaming";
import AboutUs from "./pages/About";
import Navbar from "./components/Navbar";

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/live" element={<LiveStreaming />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
    </div>
  );
}
