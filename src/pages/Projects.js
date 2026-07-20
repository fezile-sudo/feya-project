import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

function Projects() {

    const { projects, addProject, deleteProject } = useProjects();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        addProject({
            id: Date.now(),
            title,
            description,
            status: "Active",
            createdAt: new Date().toISOString()
        });

        setTitle("");
        setDescription("");
    };

    return (
        <div>

            <h1>Projects</h1>

            <form onSubmit={handleSubmit} className="project-form">

                <input placeholder="Project name" value={title} onChange={(e) => setTitle(e.target.value)}/>

                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

                <button>Add Project</button>

            </form>

            <div className="projects-grid">

                {projects.map(project => (

                    <div className="project-card" key={project.id}>

                        <h2>{project.title}</h2>

                        <p>{project.description}</p>

                        <small>{project.status}</small>

                        <button onClick={() => deleteProject(project.id)} className="delete-btn">
                            Delete
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Projects;