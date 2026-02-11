import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Layout from "../components/Layout";

function AppRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path="/" element={<Login/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/dashboard" element={<Dashboard/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter;