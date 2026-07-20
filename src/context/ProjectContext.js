import { createContext, useContext, useEffect, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {

    const [projects, setProjects] = useState(() => {
        const saved = localStorage.getItem("projects");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("projects", JSON.stringify(projects));
    }, [projects]);

    const addProject = (project) => {
        setProjects(prev => [...prev, project]);
    };

    const deleteProject = (id) => {
        setProjects(prev => prev.filter(project => project.id !== id)
        );
    };

    return (
        <ProjectContext.Provider value={{projects, addProject, deleteProject }}>
            {children}
        </ProjectContext.Provider>
    );
}

export const useProjects = () => useContext(ProjectContext);