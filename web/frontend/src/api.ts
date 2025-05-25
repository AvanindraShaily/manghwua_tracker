// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export const fetchManga = () => api.get("/manga/");

export const createManga = (data: {
  title: string;
  author?: string;
  cover_url?: string;
  description?: string;
}) => api.post("/manga/", data);