// src/pages/Detail.jsx
import React from "react";
import DetailView from "../components/DetailView";

export default function Detail({ item, onBack }) {
  if (!item) {
    return (
      <div className="p-6">
        <p className="text-gray-300">No APOD selected.</p>
      </div>
    );
  }
  return <DetailView item={item} onBack={onBack} />;
}

