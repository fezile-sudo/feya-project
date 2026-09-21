import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthLayout from "./components/Auth/AuthLayout";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ProjectDetails from "./pages/ProjectDetails";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import ProtectedRoute from "./components/Auth/ProtectedRoute";


function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* Public Authentication Routes */}

                <Route element={<AuthLayout />}>

                    <Route path="/login" element={<Login />}/>

                    <Route path="/register" element={<Register />}/>

                    <Route path="/forgot-password" element={<ForgotPassword />}/>

                    <Route path="/reset-password" element={<ResetPassword />}/>

                </Route>




                {/* Protected Application Routes */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<Layout />}>

                        <Route path="/" element={<Dashboard />}/>

                        <Route path="/projects" element={<Projects />}/>

                        <Route path="/tasks" element={<Tasks />}/>

                        <Route path="/tasks/:id" element={<TaskDetails />}/>


                        <Route path="/calendar" element={<Calendar />}/>

                        <Route path="/reports" element={<Reports />}/>

                        <Route path="/settings" element={<Settings />}/>

                        <Route path="/projects/:id" element={<ProjectDetails />}/>

                    </Route>

                </Route>



            </Routes>

        </BrowserRouter>

    );

}


export default App;
