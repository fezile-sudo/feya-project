import Card from "../components/Card/Card";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";

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

    // Upcoming deadlines

    const upcomingTasks = tasks
        .filter(task => task.dueDate)
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate) )
        .slice(0, 5);



    return (
      <div>
          <h1>Dashboard</h1>
            <p>{today}</p>

          <h2>Projects Overview</h2>
            <div className="cards">
                <Card title="Projects" value={totalProjects} color="#2563eb"/>

                <Card title="Active" value={activeProjects} color="#10b981"/>

                <Card title="Completed" value={completedProjects} color="#f59e0b"/>

                <Card title="On Hold" value={onHoldProjects} color="#ef4444"/>

            </div>



            <h2 style={{ marginTop: "40px" }}>Tasks Overview</h2>
                <div className="cards">
                  <Card title="Total Tasks" value={totalTasks} color="#2563eb" />

                  <Card title="To Do" value={todoTasks} color="#ef4444" />

                  <Card title="In Progress" value={inProgressTasks} color="#f59e0b" />

                  <Card title="Completed" value={completedTasks} color="#10b981" />

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

                                <small>Status:{" "}<strong>{project.status}</strong></small>

                            </div>
                          ))
                      )}
                </div>
          </div>
      );
}


export default Dashboard;