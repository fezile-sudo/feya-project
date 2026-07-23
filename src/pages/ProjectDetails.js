import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";


function ProjectDetails() {

    const { id } = useParams();

    const { projects } = useProjects();

    const navigate = useNavigate();


    const project = projects.find( project => project.id === Number(id));


    if (!project) {

        return (
            <div>
                <h2>Project not found</h2>
            </div>
        );

    }


    return (
        <div>
            <button
                className="view-btn" onClick={() => navigate("/projects")}>
                ← Back to Projects
            </button>
            <h1>{project.title}</h1>
            <p>
                {project.description}
            </p>
            <div className="project-card">
            <p>
                <strong>Status:</strong> {project.status}
            </p>
            <p>
                <strong>Priority:</strong> {project.priority}
            </p>
            <p>
                <strong>Progress:</strong> {project.progress}%
            </p>
            <p>
                <strong>Due Date:</strong> {project.dueDate || "Not set"}
            </p>

    </div>
</div>

    );

}


export default ProjectDetails;
