// src/components/DatePicker.jsx
import React from "react";
import { Calendar } from "lucide-react";

export default function DatePicker({ value, onChange, min = "1995-06-16" }) {
  const max = new Date().toISOString().slice(0, 10);
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
      <label className="flex items-center space-x-3">
        <Calendar className="w-5 h-5 text-blue-400" />
        <span className="text-white font-medium">Select Date:</span>
        <input
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className="bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
    </div>
  );
}
