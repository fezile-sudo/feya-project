import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";




function ProjectCard({
    project,
    onDelete,
    onEdit
}) {

const navigate = useNavigate();
    return (
        <div className="project-card">

            <div className="project-header">
                <h2>{project.title}</h2>

                <span className={`status ${project.status.toLowerCase()}`}>
                    {project.status}
                </span>
            </div>

            <p className="project-description">
                {project.description || "No description provided."}
            </p>

            <div className="project-info">

                <div>
                    <strong>Priority:</strong> {project.priority}
                </div>

                <div>
                    <strong>Progress:</strong> {project.progress}%
                </div>

                <div>
                    <strong>Due:</strong>{" "}
                    {project.dueDate || "Not set"}
                </div>

            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${project.progress}%` }} />
            </div>

            <div className="project-actions">

            <button className="view-btn" onClick={() => navigate(`/projects/${project.id}`)} >
                View
            </button>


            <button className="edit-btn" onClick={() => onEdit(project)}>
                Edit
            </button>


            <button className="delete-btn" onClick={() => onDelete(project.id)}>
                Delete
            </button>

</div>


        </div>
    );
}

export default ProjectCard;
