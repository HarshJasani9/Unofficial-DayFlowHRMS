import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const imageUrl = import.meta.env.VITE_API_URL.replace("/api", "");

export default api;
