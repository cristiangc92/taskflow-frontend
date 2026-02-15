import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const data = await loginUser(form)
      login(data.token)
      toast.success("Login exitoso");
      navigate("/dashboard")
    } catch (err) {
      // setError(err.message)
      toast.error(err.message || "Error al iniciar sesión");
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="mb-4 text-center">Iniciar Sesión</h3>

            {error && (
              <div className="alert alert-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
              </div>

              <button className="btn btn-dark w-100">Ingresar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
