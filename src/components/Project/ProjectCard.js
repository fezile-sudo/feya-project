import { useTasks } from "../../context/TaskContext";
import { getProjectProgress } from "../../utils/projectHelpers";
import "./ProjectCard.css";
import { useNavigate } from "react-router-dom";


function ProjectCard({project, onDelete, onEdit}) {

    const navigate = useNavigate();

    const { tasks } = useTasks();

    const progress = getProjectProgress(project.id, tasks);


    return (
        <div className="project-card">

            <div className="project-header">
                <h2>{project.title}</h2>

                <span className={`status ${(project.status || "Planning").toLowerCase()}`}>
                    {project.status}
                </span>
            </div>

            <p className="project-description">{project.description || "No description provided."}</p>

            <div className="project-info">

                <div><strong>Priority:</strong> {project.priority}</div>

                <div>width: {project.progress}%</div>

                <div><strong>Due:</strong>{" "}{project.dueDate || "Not set"}</div>

            </div>

            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}/>
            </div>

            <div className="project-actions">

            <button className="view-btn" onClick={() => navigate(`/projects/${project.id}`)}>
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
