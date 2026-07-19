import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaProjectDiagram,
    FaTasks,
    FaCalendarAlt,
    FaChartBar,
    FaCog
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
    return (
        <aside className="sidebar">

            <h2 className="logo">
                ProjectPro
            </h2>

            <nav>

                <NavLink to="/">
                    <FaHome />
                    Dashboard
                </NavLink>

                <NavLink to="/projects">
                    <FaProjectDiagram />
                    Projects
                </NavLink>

                <NavLink to="/tasks">
                    <FaTasks />
                    Tasks
                </NavLink>

                <NavLink to="/calendar">
                    <FaCalendarAlt />
                    Calendar
                </NavLink>

                <NavLink to="/reports">
                    <FaChartBar />
                    Reports
                </NavLink>

                <NavLink to="/settings">
                    <FaCog />
                    Settings
                </NavLink>

            </nav>

        </aside>
    );
}

export default Sidebar;