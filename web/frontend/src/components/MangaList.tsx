// src/components/MangaList.tsx
import React, { useEffect, useState , useCallback} from "react";
import { fetchManga } from "../api";
import { MangaForm } from "./MangaForm";


interface Manga {
  id: number;
  title: string;
  cover_url: string;
  description: string;
}

export function MangaList() {
  const [list, setList] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);


  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchManga();
      setList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Library</h1>

      {/* New Form */}
      <MangaForm onCreated={load} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {list.map(m => (
            <div
              key={m.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                padding: 12,
              }}
            >
              {m.cover_url && (
                <img
                  src={m.cover_url}
                  alt={m.title}
                  style={{
                    width: "100%",
                    height: 250,
                    objectFit: "cover",
                    borderRadius: 4,
                  }}
                />
              )}
              <h2>{m.title}</h2>
              <p>{m.description?.slice(0, 100)}…</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}