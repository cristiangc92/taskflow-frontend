import { useEffect, useState } from "react"
import { getProjects } from "../services/projectService"

function Dashboard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

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

  if(loading) return <p>Cargando proyectos...</p>
  if(error) return <p className="text-danger">{error}</p>

  return(
    <div>
      <h2 className="mb-4">Mis Proyectos</h2>

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
