import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";
import { SettingsProvider } from "./context/SettingsContext";
import { AuthProvider } from "./context/AuthContext";


import "./index.css";
import "./styles/variables.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <ProjectProvider>
    <TaskProvider>
        <SettingsProvider>

               <AuthProvider>

                    <App />

                </AuthProvider> 

            </SettingsProvider>
    </TaskProvider>
</ProjectProvider> 
);