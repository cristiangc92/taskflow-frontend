import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Layout() {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();


    const handleLogout = () => {
        logout();
        toast.info("Sesión cerrada");
        navigate("/");
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        TaskFlow
                    </Link>

                    <div>
                        {!isAuthenticated ? (
                            <div className="d-flex align-items-center gap-3 text-white">
                                <Link className="nav-link d-inline" to="/">
                                    Login
                                </Link>
                                <Link className="nav-link d-inline" to="/register">
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center gap-3 text-white">
                                <span>
                                    Bienvenido, {user?.email}
                                </span>

                                <Link className="nav-link d-inline text-white" to="/dashboard">
                                    Dashboard
                                </Link>

                                <button
                                    className="btn btn-sm btn-outline-light"
                                    onClick={handleLogout}
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="container main-container">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
