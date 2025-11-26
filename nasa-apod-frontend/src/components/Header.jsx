// src/components/Header.jsx
import React from "react";
import { Image } from "lucide-react";

export default function Header({ view, setView }) {
  return (
    <header className="glass sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
               style={{
                 background: "radial-gradient(circle at 30% 20%, #7c5cff, #4ea8ff)",
                 boxShadow: "0 6px 26px rgba(92,129,255,0.12)"
               }}>
            <Image className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white leading-tight">NASA APOD Explorer</h1>
            <p className="text-sm text-gray-300">Astronomy Picture of the Day</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setView("today")}
            className={`px-4 py-2 rounded-lg transition ${
              view === "today"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-border"
                : "bg-white/6 text-gray-300 hover:bg-white/10"
            }`}
          >
            Today
          </button>

          <button
            onClick={() => setView("gallery")}
            className={`px-4 py-2 rounded-lg transition ${
              view === "gallery"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white glow-border"
                : "bg-white/6 text-gray-300 hover:bg-white/10"
            }`}
          >
            Gallery
          </button>
        </div>
      </div>
    </header>
  );
}
