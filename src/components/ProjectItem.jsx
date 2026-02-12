import { useEffect, useState } from "react";
import {
    getTasksByProject,
    createTask,
    updateTaskStatus,
    deleteTask
} from "../services/taskService";

function ProjectItem({ project, onDelete }) {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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
        e.preventDefault();

        if (!title.trim()) {
            alert("El título es obligatorio");
            return;
        }

        try {
            const newTask = await createTask(project.id, {
                title,
                description
            });

            setTasks([newTask, ...tasks]);
            setTitle("");
            setDescription("");
        } catch (error) {
            alert(error.message);
        }
    };

    // Cambiar estado
    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const updated = await updateTaskStatus(taskId, newStatus);

            setTasks(tasks.map(t =>
                t.id === taskId ? updated : t
            ));
        } catch (error) {
            alert(error.message);
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
                <h5>{project.name}</h5>
                <p>{project.description}</p>

                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5>{project.name}</h5>
                        <p>{project.description}</p>
                    </div>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(project.id)}
                    >
                        Eliminar proyecto
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
                    <button className="btn btn-sm btn-dark">
                        Agregar tarea
                    </button>
                </form>

                {/* Lista tareas */}
                <ul className="list-group">
                    {tasks.map(task => (
                        <li key={task.id} className="list-group-item">
                            <strong>{task.title}</strong>
                            <p className="mb-1">{task.description}</p>

                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => handleStatusChange(task.id, "todo")}
                                >
                                    ToDo
                                </button>

                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() => handleStatusChange(task.id, "doing")}
                                >
                                    Doing
                                </button>

                                <button
                                    className="btn btn-sm btn-success"
                                    onClick={() => handleStatusChange(task.id, "done")}
                                >
                                    Done
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
