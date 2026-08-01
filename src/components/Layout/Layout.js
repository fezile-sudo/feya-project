import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import { useSettings } from "../../context/SettingsContext";

import "./Layout.css";


function Layout({ children }) {

    const { settings } = useSettings();


    return (

        <div className={`layout ${settings.theme}`}
            style={{"--primary-color":
            settings.accentColor === "green"
            ? "#16a34a"
            : settings.accentColor === "purple"
            ? "#9333ea"
            : "#2563eb"
          }}>

            <Sidebar />

            <div className="content">

                <Header />

                <main>

                    <Outlet />

                </main>
            </div>
        </div>
    );
}

export default Layout;