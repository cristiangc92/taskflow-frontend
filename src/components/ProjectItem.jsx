import { useEffect, useState } from "react";
import {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    deleteTask
} from "../services/taskService";

function ProjectItem({ project, onDelete, deletingId }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [updatingTaskId, setUpdatingTaskId] = useState(null)
    const [creatingTask, setCreatingTask] = useState(false)

    // Obtener tareas
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasksByProject(project.id);
                setTasks(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTasks();
    }, [project.id]);

    // Crear tarea
    const handleCreateTask = async (e) => {
        e.preventDefault()

        if (!title.trim()) return

        try {
            setCreatingTask(true)

            const newTask = await createTask(project.id, {
                title,
                description
            })

            setTasks([newTask, ...tasks])
            setTitle("")
            setDescription("")
        } catch (error) {
            alert(error.message)
        } finally {
            setCreatingTask(false)
        }
    }


    // Cambiar estado
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            setUpdatingTaskId(taskId)

            const updated = await updateTaskStatus(taskId, newStatus);

            setTasks(tasks.map(t =>
                t.id === taskId ? updated : t
            ));
        } catch (error) {
            alert(error.message);
        } finally {
            setUpdatingTaskId(null)
        }
    };

    // Eliminar tarea
    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(t => t.id !== taskId));
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5>{project.name}</h5>
                        <p>{project.description}</p>
                    </div>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(project.id)}
                        disabled={deletingId === project.id}
                    >
                        {deletingId === project.id ? "Eliminando..." : "Eliminar proyecto"}
                    </button>
                </div>

                {/* Formulario crear tarea */}
                <form onSubmit={handleCreateTask} className="mb-3">
                    <input
                        className="form-control mb-2"
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="form-control mb-2"
                        placeholder="Descripción"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        className="btn btn-sm btn-dark"
                        disabled={creatingTask}
                    >
                        {creatingTask ? "Agregando..." : "Agregar tarea"}
                    </button>

                </form>

                {/* Lista tareas */}
                <ul className="list-group">
                    {tasks.map(task => (
                        <li
                            key={task.id}
                            className={`list-group-item ${task.status === "done"
                                ? "list-group-item-success"
                                : task.status === "doing"
                                    ? "list-group-item-warning"
                                    : ""
                                }`}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{task.title}</strong>
                                    <p className="mb-1">{task.description}</p>
                                </div>

                                <span
                                    className={`badge ${task.status === "todo"
                                        ? "bg-secondary"
                                        : task.status === "doing"
                                            ? "bg-warning text-dark"
                                            : "bg-success"
                                        }`}
                                >
                                    {task.status.toUpperCase()}
                                </span>
                            </div>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-secondary"
                                    disabled={task.status === "todo" || updatingTaskId === task.id}
                                    onClick={() => handleStatusChange(task.id, "todo")}
                                >
                                    {updatingTaskId === task.id ? "..." : "ToDo"}
                                </button>

                                <button
                                    className="btn btn-sm btn-warning"
                                    disabled={task.status === "doing" || updatingTaskId === task.id}
                                    onClick={() => handleStatusChange(task.id, "doing")}
                                >
                                    {updatingTaskId === task.id ? "..." : "Doing"}
                                </button>

                                <button
                                    className="btn btn-sm btn-success"
                                    disabled={task.status === "done" || updatingTaskId === task.id}
                                    onClick={() => handleStatusChange(task.id, "done")}
                                >
                                    {updatingTaskId === task.id ? "..." : "Done"}
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default ProjectItem;
