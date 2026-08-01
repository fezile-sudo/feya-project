import { useParams } from "react-router-dom";
import { useProjects } from "../context/ProjectContext";
import { useNavigate } from "react-router-dom";
import ProjectTasks from "../components/Project/ProjectTasks";
import { useTasks } from "../context/TaskContext";
import { getProjectProgress } from "../utils/projectHelpers";


function ProjectDetails() {

    const { id } = useParams();

    const { projects } = useProjects();

    const { tasks } = useTasks();

    const navigate = useNavigate();

    const project = projects.find( project => project.id === Number(id));


    if (!project) {

        return (
            <div>
                <h2>Project not found</h2>
            </div>
        );
    }

    

    const progress = getProjectProgress(
        project.id,
        tasks
    );


return (
    <div>

        <button className="view-btn" onClick={() => navigate("/projects")}> ← Back to Projects</button>

        <h1>{project.title}</h1>

        <p>{project.description}</p>

    <div className="project-card">

        <p><strong>Status:</strong> {project.status}</p>

        <p><strong>Priority:</strong> {project.priority}</p>

        <p><strong>Progress:</strong> {progress}%</p>

        <p><strong>Due Date:</strong> {project.dueDate || "Not set"}</p>

    </div>
        <ProjectTasks projectId={project.id} />
    </div>
);

}


export default ProjectDetails;
