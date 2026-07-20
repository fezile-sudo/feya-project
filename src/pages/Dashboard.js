import Card from "../components/Card/Card";
import { useProjects } from "../context/ProjectContext";

function Dashboard() {
  const { projects } = useProjects();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Dashboard statistics
  const totalProjects = projects.length;
  const activeProjects = projects.filter((project) => project.status === "Active" ).length;
  const completedProjects = projects.filter((project) => project.status === "Completed").length;
  const onHoldProjects = projects.filter( (project) => project.status === "On Hold").length;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{today}</p>

      <div className="cards">
        <Card title="Projects" value={totalProjects} color="#2563eb" />

        <Card title="Active" value={activeProjects} color="#10b981" />

        <Card title="Completed" value={completedProjects} color="#f59e0b"/>

        <Card title="On Hold" value={onHoldProjects} color="#ef4444"/>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Recent Projects</h2>

        {projects.length === 0 ? (
          <div className="project-card" style={{ marginTop: "20px" }}>
            <p>No projects yet.</p>
            <p>Create your first project from the Projects page.</p>
          </div>
        ) : (
          projects
            .slice(-5)
            .reverse()
            .map((project) => (
              <div key={project.id} className="project-card" style={{ marginTop: "20px" }}>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <small>
                  Status: <strong>{project.status}</strong>
                </small>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;