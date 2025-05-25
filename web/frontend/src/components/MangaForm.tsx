// src/components/MangaForm.tsx
import React, { useState } from "react";
import type { FormEvent } from "react";
import { createManga } from "../api";

interface Props {
  onCreated: () => void;
}

export function MangaForm({ onCreated }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string| null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await createManga({
        title,
        author: author || undefined,
        cover_url: coverUrl || undefined,
        description: description || undefined,
      });
      // Reset form
      setTitle("");
      setAuthor("");
      setCoverUrl("");
      setDescription("");
      onCreated();  // tell parent to refresh
    } catch (e: any) {
      setError(e.response?.data?.detail || "Failed to create manga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>Add New Manga</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div>
        <label>Title*</label><br />
        <input value={title} onChange={e => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author</label><br />
        <input value={author} onChange={e => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Cover URL</label><br />
        <input value={coverUrl} onChange={e => setCoverUrl(e.target.value)} />
      </div>
      <div>
        <label>Description</label><br />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Manga"}
      </button>
    </form>
  );
}
