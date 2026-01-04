import axios from "axios";

// Create the Axios Instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Points to /api
  withCredentials: true,
});

// Helper for Image URLs (removes /api from the end of VITE_API_URL)
export const imageUrl = import.meta.env.VITE_API_URL.replace('/api', '');

export default api;