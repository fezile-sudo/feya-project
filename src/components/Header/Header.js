import { useSettings } from "../../context/SettingsContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import "./Header.css";

function Header() {

    const { settings } = useSettings();

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {logout();  navigate("/login");};

    return (

        <header className={`header ${settings.theme}`}>
            <div>
                <h2> Hello, {user?.name || "Developer"} 👋</h2>
                <p> Welcome back.</p>
            </div>

            <div className="header-actions">
               <div className="avatar">
                {
                    user?.name
                        ? user.name
                            .split(" ")
                            .map(word => word[0])
                            .join("")
                            .substring(0, 2)
                            .toUpperCase()
                        : "FG"
                }

            </div>

                {user && (
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                )}

            </div>
        </header>
    );
}

export default Header;