import { useProjects } from "../../context/ProjectContext";
import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit }) {

    const { projects } = useProjects();

    const project = projects.find( (project) => project.id === task.projectId);

    return (
        <div className="task-card">

            <div className="task-header">
                <h3>{task.title}</h3>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>

            <p>{task.description}</p>

            <div className="task-details">

                <p><strong>Project:</strong>{" "} {project ? project.title : "No Project"}</p>

                <p> <strong>Status:</strong> {task.status}</p>

                <p><strong>Due:</strong>{" "}{task.dueDate || "No due date"}</p>

            </div>

            <div className="task-actions">
                <button onClick={() => onEdit(task)}>Edit </button>

                <button onClick={() => onDelete(task.id)}> Delete</button>
            </div>

        </div>
    );
}

export default TaskCard;