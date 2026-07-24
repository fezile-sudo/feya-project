import { useTasks } from "../../context/TaskContext";
import TaskCard from "../Task/TaskCard";
import { useNavigate } from "react-router-dom";

function ProjectTasks({ projectId }) {

    const { tasks, deleteTask } = useTasks();

    const navigate = useNavigate();

    const projectTasks = tasks.filter(
        task => Number(task.projectId) === Number(projectId)
    );


    return (
        <div className="project-tasks">

            <div className="project-tasks-header">

                <h2>Tasks</h2>

                <button
                    className="view-btn"
                    onClick={() => navigate("/tasks")}
                >
                    Add Task
                </button>

            </div>


            {projectTasks.length === 0 ? (

                <div className="empty-state">

                    <p>
                        No tasks assigned to this project yet.
                    </p>

                </div>

            ) : (

                <div className="tasks-grid">

                    {projectTasks.map(task => (

                        <TaskCard
                            key={task.id}
                            task={task}
                            onDelete={deleteTask}
                            onEdit={() => navigate("/tasks")}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default ProjectTasks;