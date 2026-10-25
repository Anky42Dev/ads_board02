import { useCallback, useEffect, useState } from "react";
import { fetchAds, type Ad } from "./api";
import AdCard from "./AdCard";
import AdForm from "./AdForm";

export default function App() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setAds(await fetchAds());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="layout">
      <AdForm onCreated={load} />
      <main className="board">
        <h1>Доска объявлений</h1>
        {loading && <p className="hint">Загрузка…</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && ads.length === 0 && (
          <p className="hint">Пока объявлений нет</p>
        )}
        <div className="grid">
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </main>
    </div>
  );
}
