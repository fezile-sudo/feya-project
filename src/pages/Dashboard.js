import Card from "../components/Card/Card";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import { getProjectProgress } from "../utils/projectHelpers";

import "./Dashboard.css";

function Dashboard() {

    const { projects } = useProjects();
    const { tasks } = useTasks();


    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Project stats
    const totalProjects = projects.length;

    const activeProjects = projects.filter(project => project.status === "Active").length;

    const completedProjects = projects.filter(project => project.status === "Completed").length;

    const onHoldProjects = projects.filter(project => project.status === "On Hold").length;


    // Task stats
    const totalTasks = tasks.length;

    const todoTasks = tasks.filter(task => task.status === "To Do").length;

    const inProgressTasks = tasks.filter(task => task.status === "In Progress").length;

    const completedTasks = tasks.filter(task => task.status === "Completed").length;

    const overallProgress = tasks.length === 0
    ? 0
    : Math.round(
        (completedTasks / tasks.length) * 100
    );

    // Upcoming deadlines

    const upcomingTasks = tasks
        .filter(task => task.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate) )
        .slice(0, 5);



    return (
        <div className="dashboard-page">
          <h1>Dashboard</h1>
            <p>{today}</p>

          <h2>Projects Overview</h2>
            <div className="cards">
                        <Card title="Projects" value={totalProjects} color="var(--primary)"/>

                        <Card title="Active" value={activeProjects} color="var(--success)"/>

                        <Card title="Completed" value={completedProjects} color="var(--secondary)"/>

                        <Card title="On Hold" value={onHoldProjects} color="var(--danger)"/> 

            </div>



            <h2 style={{ marginTop: "40px" }}>Tasks Overview</h2>
                <div className="cards">
                        <Card title="Total Tasks" value={totalTasks} color="var(--primary)"/>

                        <Card title="To Do" value={todoTasks} color="var(--danger)"/>

                        <Card title="In Progress" value={inProgressTasks} color="var(--warning)"/>

                        <Card title="Completed" value={completedTasks} color="var(--success)"/>

            </div>

            <div style={{ marginTop: "40px" }}>
               <h2>Upcoming Deadlines</h2>
                  {upcomingTasks.length === 0 ? (

                  <div className="project-card">
                    <p>No upcoming deadlines.</p>
                  </div>
               ) : (
               upcomingTasks.map(task => (
                  <div key={task.id} className="project-card" style={{ marginTop: "20px" }}>
                      <h3>{task.title}</h3>
                       <p> Status:{" "} <strong>{task.status}</strong> </p>
                       <p> Due: {task.dueDate}</p>
                  </div>

                    ))

                )}

            </div>


        <div style={{ marginTop: "40px" }}>
            <h2>Recent Projects</h2>

                {projects.length === 0 ? (

              <div className="project-card">
                  <p>No projects yet.</p>
                     <p>Create your first project from the Projects page.</p>
              </div>

                ) : (

                    projects
                        .slice(-5)
                        .reverse()
                        .map(project => (

                            <div key={project.id} className="project-card" style={{marginTop: "20px"}}>

                                <h3>{project.title}</h3>

                                <p>{project.description}</p>

                                <small>Status: <strong>{project.status}</strong></small>

                                <p>Progress:{" "}<strong>{getProjectProgress(project.id, tasks)}%</strong></p>

                            </div>
                          ))
                      )}
                </div>
          </div>
      );
}


export default Dashboard;