import API from "../api/axios";

//Obtener tareas por proyecto
export const getTasksByProject = async (projectId) => {
    try {
        const response = await API.get(`/tasks/project/${projectId}`)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.error || "Error al obtener tareas"
        )
    }
}

//Crear tarea
export const createTask = async (projectId, data) => {
    try {
        const response = await API.post(`/tasks/project/${projectId}`, data)
        return response.data
    } catch (error) {
        throw new Error(
            error.response?.data?.error || "Error al crear tarea"
        );
    }
}

//Cambiar estado
export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await API.put(`/tasks/${taskId}/status`, { status }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al actualizar estado"
    );
  }
};

//Eliminar tarea
export const deleteTask = async (taskId) => {
  try {
    await API.delete(`/tasks/${taskId}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Error al eliminar tarea"
    );
  }
};