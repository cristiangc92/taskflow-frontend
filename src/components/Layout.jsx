import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles/layout.css";
import { useAuth } from "../context/AuthContext";

function Layout() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
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
                                <button
                                    className="btn btn-sm btn-outline-light ms-2"
                                    onClick={handleLogout}
                                >
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
    );
}

export default Layout;
