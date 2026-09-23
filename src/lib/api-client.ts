import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Normalize base URL to ensure clean path resolution without trailing slash
const RAW_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://swayambhu-crm-backend.onrender.com/api/v1";

const SANITIZED_BASE_URL = RAW_BASE_URL.replace(/\/+$/, "");

export const apiClient = axios.create({
  baseURL: SANITIZED_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30s accommodates Render free instance wake-up
});

// Inject Bearer JWT from localStorage into outgoing requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Preserve custom Content-Type (e.g. multipart/form-data or urlencoded form)
    if (config.data instanceof FormData || config.data instanceof URLSearchParams) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Graceful session handling on 401 Unauthorized
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_data");

      // Prevent recursive redirects if the user is already on the login screen
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith("/admin/login") && !currentPath.startsWith("/login")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);