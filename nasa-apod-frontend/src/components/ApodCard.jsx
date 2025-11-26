// src/components/ApodCard.jsx
import React from "react";

export default function ApodCard({ item, className = "" }) {
  if (!item) return null;

  return (
    <article className={`glass floating ${className}`}>
      <div className="aspect-video bg-black center-media" style={{ overflow: "hidden" }}>
        {item.media_type === "image" ? (
          <img
            src={item.url}
            alt={item.title}
            className="max-w-full max-h-full object-contain"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.6))" }}
            loading="lazy"
          />
        ) : (
          <iframe src={item.url} title={item.title} className="w-full h-full" allowFullScreen />
        )}
      </div>

      <div className="p-6 space-y-3">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">{item.title}</h2>
          <p className="text-gray-300 text-sm">
            {item.date} {item.copyright && `• © ${item.copyright}`}
          </p>
        </div>

        <p className="text-gray-200 leading-relaxed">{item.explanation}</p>

        {item.hdurl && (
          <a
            href={item.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-colors"
          >
            View HD Image
          </a>
        )}
      </div>
    </article>
  );
}
