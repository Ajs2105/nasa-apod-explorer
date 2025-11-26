// src/pages/Gallery.jsx
import React, { useEffect, useState } from "react";
import { fetchRecentApods } from "../services/api";
import GalleryCard from "../components/GalleryCard";

export default function Gallery({ onOpenDetail }) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRecentApods(12);
      setList(data || []);
    } catch (err) {
      setError(err.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-200">Loading gallery…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/20 rounded border border-red-500/40 text-red-100">
        {error}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-6">Recent APODs</h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((item) => (
          <GalleryCard key={item.date} item={item} onClick={onOpenDetail} />
        ))}
      </div>
    </div>
  );
}

