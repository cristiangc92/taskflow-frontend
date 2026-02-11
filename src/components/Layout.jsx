import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/layout.css"
import { useState } from "react";

function Layout() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token")
    )
        

    const handleLogout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        navigate("/")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        TaskFlow
                    </Link>

                    <div>
                        {!isAuthenticated ? (
                            <>
                                <Link className="nav-link d-inline" to="/">
                                    Login
                                </Link>
                                <Link className="nav-link d-inline" to="/register">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link d-inline" to="/dashboard">
                                    Dashboard
                                </Link>
                                <button className="btn btn-sm btn-outline-light ms-2" onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container main-container">
                <Outlet />
            </div>
        </>
    )
}

export default Layout;