import Card from "../Card/Card";
import { useProjects } from "../../context/ProjectContext";

function ProjectStats() {

    const { projects } = useProjects();

    const totalProjects = projects.length;

    const activeProjects = projects.filter( project => project.status === "Active").length;

    const completedProjects = projects.filter(project => project.status === "Completed" ).length;

    const averageProgress = projects.length
        ? Math.round(
            projects.reduce(
                (total, project) => total + Number(project.progress),
                0
            ) / projects.length
        )
        : 0;


    return (
        <div className="cards">

            <Card title="Total Projects" value={totalProjects} color="#2563eb" />

            <Card title="Active" value={activeProjects} color="#10b981" />

            <Card title="Completed" value={completedProjects} color="#f59e0b" />

            <Card title="Avg Progress" value={`${averageProgress}%`} color="#8b5cf6"/>

        </div>
    );
}

export default ProjectStats;
