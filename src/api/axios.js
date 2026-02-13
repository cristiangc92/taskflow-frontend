import axios from "axios";

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
      // Limpiar token
      localStorage.removeItem("token");

      // Redirigir al login
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;
