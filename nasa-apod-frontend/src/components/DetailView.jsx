// src/components/DetailView.jsx
import React from "react";
import { ChevronLeft } from "lucide-react";
import ApodCard from "./ApodCard";

export default function DetailView({ item, onBack }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center space-x-2 text-blue-300 hover:text-blue-200">
        <ChevronLeft className="w-5 h-5" /> <span>Back</span>
      </button>

      <ApodCard item={item} />
    </div>
  );
}
