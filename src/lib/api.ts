// src/lib/api.ts
import axios from "axios";
//LocalHost URL
//http://localhost:8080
//Live URL
//http://13.126.236.113:5000

const api = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout - helpful in dev
});

// ======================
// Request Interceptor - Token add karne ke liye
// ======================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // Optional: Debug ke liye (production mein comment kar dena)
    // console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url} - Token: ${token ? 'YES' : 'NO'}`);

    if (token) {
      // Important: Bearer ke baad space zaroori hai
      config.headers.Authorization = `Bearer ${token.trim()}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ======================
// Response Interceptor - 401/403 pe auto logout
// ======================
api.interceptors.response.use(
  (response) => response, // successful response pass kar do
  (error) => {
    // Agar 401 ya 403 aaya → token invalid/expired → logout
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn("Unauthorized - clearing token and redirecting to login");

      localStorage.removeItem("token");
      // Agar tumhare paas auth context hai to usse bhi clear kar sakte ho

      // Redirect - window.location use karna safe hai yahan
      window.location.href = "/login?session_expired=true"; // optional query param
    }

    // Baaki errors (500, network error etc) ko normal reject kar do
    return Promise.reject(error);
  }
);

export default api;
