// src/pages/Today.jsx
import React, { useEffect, useState } from "react";
import DatePicker from "../components/DatePicker";
import ApodCard from "../components/ApodCard";
import { fetchTodayApod, fetchApodByDate } from "../services/api";

export default function Today({ onOpenDetail }) {
  const [apod, setApod] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadToday = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodayApod();
      setApod(data);
      setDate(data?.date ?? new Date().toISOString().slice(0, 10));
    } catch (err) {
      setError(err.message || "Failed to load today's APOD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadToday();
  }, []);

  const handleDateChange = async (e) => {
    const value = e.target.value;
    setDate(value);
    try {
      setLoading(true);
      const d = await fetchApodByDate(value);
      setApod(d);
    } catch (err) {
      setError(err.message || "Failed to load APOD for selected date");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !apod) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <div className="animate-spin mb-4 w-12 h-12 rounded-full border-4 border-t-blue-400 border-white/10"></div>
          <p className="text-gray-200">Loading today's APOD…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 rounded border border-red-500/40 text-red-100">
          {error}
        </div>
      )}

      <DatePicker value={date} onChange={handleDateChange} />

      {apod && (
        <div onClick={() => onOpenDetail(apod)}>
          <ApodCard item={apod} />
        </div>
      )}
    </div>
  );
}
