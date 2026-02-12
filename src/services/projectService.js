import API from "../api/axios";

export const getProjects = async () => {
    try {
        const response = await API.get("/projects")
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.error || "Error al obtener proyectos")        
    }
}

export const createProject = async (data) =>{
    try {
        const response = await API.post("/projects", data)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.error || "Error al crear proyecto"
        )
    }
}

export const deleteProject = async (id) => {
    try {
        const response = await API.delete(`/projects/${id}`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.error || "Error al eliminar proyecto"
        )
    }
}