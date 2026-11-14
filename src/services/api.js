import axios from "axios";
import { auth } from "../firebase";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let authInitialized = false;
const authReady = new Promise((resolve) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    authInitialized = true;
    unsubscribe();
    resolve(user);
  });
});

api.interceptors.request.use(async (config) => {
  if (!authInitialized) {
    await authReady;
  }

  config.headers ??= {};

  const current = auth.currentUser;

  if (current && !config.headers.Authorization) {
    const token = await current.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";

    if (error.response?.status === 401) {
      window.dispatchEvent(new Event("auth:expired"));
    }

    return Promise.reject(Object.assign(error, { userMessage: message }));
  },
);

export default api;