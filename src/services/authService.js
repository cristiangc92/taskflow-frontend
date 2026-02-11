import API from "../api/axios";

export const loginUser = async (data) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al iniciar sesión"
    );
  }
};