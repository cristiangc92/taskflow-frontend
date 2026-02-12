import { useEffect, useState } from "react"
import { getProjects, createProject } from "../services/projectService"

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const [newProject, setNewProject] = useState({
    name: "",
    description: ""
  })

  const [creating, setCreating] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects()
        setProjects(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setCreating(true)
    setError("")

    try {
      const created = await createProject(newProject)

      // Agregamos el nuevo proyecto al estado sin recargar
      setProjects([created, ...projects])

      // Limpiar formulario
      setNewProject({ name: "", description: "" })

    } catch (err) {
      setError(err.message)
    } finally {
      setCreating(false)
    }
  }

  if (loading) return <p>Cargando proyectos...</p>
  if (error && projects.length === 0)
    return <p className="text-danger">{error}</p>

  return (
    <div>
      <h2 className="mb-4">Mis Proyectos</h2>

      {/* FORMULARIO */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="mb-3">Crear nuevo proyecto</h5>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleCreate}>
            <div className="mb-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Nombre del proyecto"
                value={newProject.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <textarea
                name="description"
                className="form-control"
                placeholder="Descripción"
                value={newProject.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              className="btn btn-dark"
              disabled={creating}
            >
              {creating ? "Creando..." : "Crear Proyecto"}
            </button>
          </form>
        </div>
      </div>

      {/* LISTA */}
      {projects.length === 0 ? (
        <p>No tienes proyectos aún.</p>
      ) : (
        <ul className="list-group">
          {projects.map((project) => (
            <li key={project.id} className="list-group-item">
              <strong>{project.name}</strong>
              <p className="mb-0">{project.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard
