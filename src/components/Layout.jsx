import { Outlet, Link } from "react-router-dom";
import "../styles/layout.css"

function Layout() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div className="container">
                    <Link className="navbar-brand fw-bold" to="/">
                        TaskFlow
                    </Link>

                    <div>
                        <Link className="nav-link d-inline" to="/">
                            Login
                        </Link>
                        <Link className="nav-link d-inline" to="/register">
                            Register
                        </Link>
                        <Link className="nav-link d-inline" to="/dashboard">
                            Dashboard
                        </Link>
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