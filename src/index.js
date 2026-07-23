import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ProjectProvider } from "./context/ProjectContext";
import { TaskProvider } from "./context/TaskContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <ProjectProvider>
    <TaskProvider>
        <App />
    </TaskProvider>
</ProjectProvider> 
);