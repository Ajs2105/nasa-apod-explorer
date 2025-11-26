// src/services/api.js
const BASE = "http://localhost:8080/api/apod";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return res.json();
}

export async function fetchTodayApod() {
  return fetchJson(`${BASE}/today`);
}

export async function fetchApodByDate(date) {
  return fetchJson(`${BASE}/date?date=${encodeURIComponent(date)}`);
}

/**
 * Try backend /recent endpoint first.
 * If backend doesn't support it (404 or 5xx), fall back to multiple /date calls.
 * count = number of APODs to fetch (most recent)
 */
export async function fetchRecentApods(count = 8) {
  // try optimized endpoint
  try {
    return await fetchJson(`${BASE}/recent?count=${count}`);
  } catch (err) {
    // fallback: sequentially fetch recent dates from today backwards
    const results = [];
    const today = new Date();
    for (let i = 0; i < count; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      try {
        const apod = await fetchApodByDate(iso);
        results.push(apod);
      } catch (e) {
        // skip failures (e.g., future date or missing day)
      }
    }
    return results;
  }
}
