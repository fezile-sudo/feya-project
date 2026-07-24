import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaTasks, FaCog, FaChartBar, FaCalendarAlt, FaProjectDiagram} from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {

    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

            <button className="menu-btn" onClick={() => setCollapsed(!collapsed)}>
                <FaBars />
            </button>

            <h2>{collapsed ? "FP" : "feyaPlan"}</h2>

            <nav>

                <NavLink to="/"><FaHome />{!collapsed && "Dashboard"}</NavLink>

                <NavLink to="/projects"><FaProjectDiagram />{!collapsed && "Projects"}</NavLink>

                <NavLink to="/tasks"><FaTasks />{!collapsed && "Tasks"}</NavLink>

                <NavLink to="/calendar"><FaCalendarAlt />{!collapsed && "Calendar"}</NavLink>

                <NavLink to="/reports"><FaChartBar />{!collapsed && "Reports"}</NavLink>

                <NavLink to="/settings"><FaCog />{!collapsed && "Settings"}</NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;