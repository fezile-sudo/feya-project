import { useProjects } from "../../context/ProjectContext";
import { useNavigate } from "react-router-dom";

import "./TaskCard.css";

function TaskCard({ task, onDelete, onEdit }) {

const { projects } = useProjects();

const navigate = useNavigate();

const project = projects.find(
    (project) =>
        Number(project.id) === Number(task.projectId)
);


const handleViewTask = () => {

    navigate(`/tasks/${task.id}`);

};


return (

    <div className="task-card">

        <div className="task-header">

            <h3>{task.title}</h3>

            <span className={`priority ${task.priority.toLowerCase()}`} >
                {task.priority}
            </span>

        </div>


        <p>{task.description}</p>


        <div className="task-details">

            <p>
                <strong>Project:</strong>{" "}
                {project
                    ? project.title
                    : "No Project"}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {task.status}
            </p>

            <p>
                <strong>Due:</strong>{" "}
                {task.dueDate || "No due date"}
            </p>

        </div>


        <div className="task-actions">

            <button className="view-btn" onClick={handleViewTask}>
                View Task
            </button>

            <button className="edit-btn" onClick={() => onEdit(task)}>
                Edit
            </button>

            <button className="delete-btn" onClick={() => onDelete(task.id)}>
                Delete
            </button>

        </div>

    </div>
);


}

export default TaskCard;