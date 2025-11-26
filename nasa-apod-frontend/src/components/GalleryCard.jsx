// src/components/GalleryCard.jsx
import React from "react";
import { Info } from "lucide-react";

export default function GalleryCard({ item, onClick }) {
  return (
    <div
      onClick={() => onClick && onClick(item)}
      className="bg-white/6 rounded-xl overflow-hidden border border-white/6 cursor-pointer transform transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="aspect-video center-media bg-black">
        {item.media_type === "image" ? (
          <img src={item.url} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
            <Info className="w-12 h-12 text-white/40" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold mb-1 line-clamp-2">{item.title}</h3>
        <p className="text-gray-400 text-sm">{item.date}</p>
      </div>
    </div>
  );
}
