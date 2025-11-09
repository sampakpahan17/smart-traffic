import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000
});

// ambil daftar lokasi dari root endpoint backend
export const getStreams = async () => {
  const res = await api.get("/");
  return { available_streams: res.data.locations || [] };
};

export const getDataAll = () => api.get("/data/all").then(r => r.data);
export const getDataLocation = (loc) =>
  api.get(`/data/${encodeURIComponent(loc)}`).then(r => r.data);
export const streamUrl = (loc) =>
  `${API_BASE}/stream/${encodeURIComponent(loc)}`;
