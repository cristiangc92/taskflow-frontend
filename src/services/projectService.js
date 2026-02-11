import API from "../api/axios";

export const getProjects = async () => {
    try {
        const response = await API.get("/projects")
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener proyectos")        
    }
}