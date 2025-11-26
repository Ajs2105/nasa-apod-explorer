// src/App.jsx
import React, { useState } from "react";
import StarsBackground from "./components/StarsBackground";
import Header from "./components/Header";
import Today from "./pages/Today";
import Gallery from "./pages/Gallery";
import Detail from "./pages/Detail";

function App() {
  const [view, setView] = useState("today");
  const [detailItem, setDetailItem] = useState(null);

  const openDetail = (item) => {
    setDetailItem(item);
    setView("detail");
  };

  const onBack = () => setView("gallery");

  return (
    <div className="app-shell">
      <StarsBackground />

      <div className="app-shell" style={{ position: "relative", zIndex: 10 }}>
        <Header view={view} setView={setView} />

        <main className="max-w-7xl mx-auto px-6 py-8">
          {view === "today" && <Today onOpenDetail={openDetail} />}
          {view === "gallery" && <Gallery onOpenDetail={openDetail} />}
          {view === "detail" && <Detail item={detailItem} onBack={onBack} />}
        </main>
      </div>
    </div>
  );
}

export default App;
