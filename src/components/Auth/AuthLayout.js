import { Outlet } from "react-router-dom";
import "./AuthLayout.css";


function AuthLayout() {

    return (
        <div className="auth-layout">
            <div className="auth-brand">
                <h1>feyaPlan</h1>
                <p>Manage projects, tasks, and team progress in one place.</p>
            </div>

            <div className="auth-container">

                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;