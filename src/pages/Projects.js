import { useState } from "react";
import { useProjects } from "../context/ProjectContext";

import ProjectForm from "../components/Project/ProjectForm";
import ProjectCard from "../components/Project/ProjectCard";
import ProjectStats from "../components/Project/ProjectStats";

import "./Projects.css";


function Projects() {

    const {projects, addProject, deleteProject, updateProject} = useProjects();

    const [editingProject, setEditingProject] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [filterStatus, setFilterStatus] = useState("All");

    const handleSubmit = (projectData) => {
        if (editingProject) {
            updateProject(projectData);
            setEditingProject(null);

        } else {

            addProject(projectData);

        }

    };


    const filteredProjects = projects.filter((project) => {

    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === "All" || project.status === filterStatus;


    return matchesSearch && matchesStatus;

});



    return (

        <div className="projects-page">
            <h1>Projects</h1>

             <ProjectStats />

        <div className="project-controls">
            <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>

            <option value="All">
                All Projects
            </option>

            <option value="Planning">
                Planning
            </option>

            <option value="Active">
                Active
            </option>

            <option value="Completed">
                Completed
            </option>

            <option value="On Hold">
                On Hold
            </option>

    </select>

</div>

        <ProjectForm onSubmit={handleSubmit} project={editingProject} onCancel={() => setEditingProject(null)}/>

        <div className="projects-grid">
                    {projects.length === 0 ? (

                    <div className="empty-state">
                        <h3>No projects yet</h3>
                        <p>Create your first project to get started.</p>
                    </div>

                ) : (

                    filteredProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onDelete={deleteProject} onEdit={setEditingProject}/>

                    ))

                )}
            </div>
        </div>
   );
}


export default Projects;
