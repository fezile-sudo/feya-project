import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>

            <Layout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/projects" element={<Projects />} />

                    <Route path="/tasks" element={<Tasks />} />

                    <Route path="/calendar" element={<Calendar />} />

                    <Route path="/reports" element={<Reports />} />

                    <Route path="/settings" element={<Settings />} />

                </Routes>

            </Layout>

        </BrowserRouter>
    );
}

export default App;
