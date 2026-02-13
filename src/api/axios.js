import axios from "axios";
import { logoutFromInterceptor } from "../context/authManager";

const API = axios.create({
  baseURL: "https://taskflow-api-pztk.onrender.com/api",
});

// Interceptor para enviar token automáticamente
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Interceptor de response (manejar 401)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      logoutFromInterceptor();
    }

    return Promise.reject(error);
  }
);

export default API;
