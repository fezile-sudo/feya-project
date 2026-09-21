import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useProjects } from "../context/ProjectContext";

function TaskDetails() {

const { id } = useParams();

const { tasks } = useTasks();

const { projects } = useProjects();

const navigate = useNavigate();


const task = tasks.find(task => task.id === Number(id));


if (!task) {

    return (
        <div>
            <h2>Task not found</h2>
        </div>
    );

}


const project = projects.find(
    project => project.id === Number(task.projectId)
);


return (

    <div>

        <button className="view-btn" onClick={() => navigate("/tasks")}>
            ← Back to Tasks
        </button>


        <h1>{task.title}</h1>

        <p>{task.description}</p>


        <div className="task-card">

            <p>
                <strong>Project:</strong>{" "}
                {project ? project.title : "No Project"}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                {task.status}
            </p>

            <p>
                <strong>Priority:</strong>{" "}
                {task.priority}
            </p>

            <p>
                <strong>Progress:</strong>{" "}
                {task.progress ?? 0}%
            </p>

            <p>
                <strong>Due Date:</strong>{" "}
                {task.dueDate || "Not set"}
            </p>

        </div>

    </div>
);


}

export default TaskDetails;