import { createContext, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const ProjectContext = createContext();


export function ProjectProvider({ children }) {

const [projects, setProjects] = useState([]);
const [loading, setLoading] = useState(true);

const getToken = () => {
    return localStorage.getItem("feyaPlanToken");
};

useEffect(() => {

    const fetchProjects = async () => {

        try {

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/projects`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch projects");
            }

            const data = await response.json();

            const formattedProjects = data.map(project => ({
                ...project,
                title: project.name,
                dueDate: project.due_date
            }));

            setProjects(formattedProjects);

        } catch (error) {

            console.error("Error fetching projects:", error);

        } finally {

            setLoading(false);

        }
    };

    fetchProjects();

}, []);


const addProject = async (project) => {

    try {

        const token = getToken();

        const response = await fetch(
            `${API_URL}/api/projects`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: project.title,
                    description: project.description,
                    status: project.status,
                    priority: project.priority,
                    due_date: project.dueDate || null
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to create project");
        }

        const savedProject = await response.json();

        const formattedProject = {
            ...savedProject,
            title: savedProject.name,
            dueDate: savedProject.due_date
        };

        setProjects(prev => [
            ...prev,
            formattedProject
        ]);

    } catch (error) {

        console.error("Error creating project:", error);

    }

};


const deleteProject = async (id) => {

    try {

        const token = getToken();

        const response = await fetch(
            `${API_URL}/api/projects/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete project");
        }

        await response.json();

        setProjects(prev =>
            prev.filter(project => project.id !== id)
        );

    } catch (error) {

        console.error("Error deleting project:", error);

    }

};


const updateProject = async (updatedProject) => {

    try {

        const token = getToken();

        const response = await fetch(
            `${API_URL}/api/projects/${updatedProject.id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    name: updatedProject.title,
                    description: updatedProject.description,
                    status: updatedProject.status,
                    priority: updatedProject.priority,
                    due_date: updatedProject.dueDate || null
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update project");
        }

        const savedProject = await response.json();

        const formattedProject = {
            ...savedProject,
            title: savedProject.name,
            dueDate: savedProject.due_date
        };

        setProjects(prev =>
            prev.map(project =>
                project.id === formattedProject.id
                    ? formattedProject
                    : project
            )
        );

    } catch (error) {

        console.error("Error updating project:", error);

    }

};


return (

    <ProjectContext.Provider
        value={{
            projects,
            addProject,
            deleteProject,
            updateProject,
            loading
        }}
    >

        {children}

    </ProjectContext.Provider>

);


}

export const useProjects = () => useContext(ProjectContext);
