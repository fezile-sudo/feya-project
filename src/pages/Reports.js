import Card from "../components/Card/Card";
import { useProjects } from "../context/ProjectContext";
import { useTasks } from "../context/TaskContext";
import TaskStatusChart from "../components/Reports/TaskStatusChart";
import ProjectWorkloadChart from "../components/Reports/ProjectWorkloadChart";
import ProjectProgressChart from "../components/Reports/ProjectProgressChart";
import TaskCompletionTrendChart from "../components/Reports/TaskCompletionTrendChart";
import RecentActivity from "../components/Reports/RecentActivity";
import PerformanceInsights from "../components/Reports/PerformanceInsights";

import "./Reports.css";


function Reports() {

    const { projects } = useProjects();

    const { tasks } = useTasks();

    const totalProjects = projects.length;

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(task => task.status === "Completed").length;

    const completionRate =
        totalTasks === 0
            ? 0
            : Math.round((completedTasks / totalTasks) * 100);



    return (

        <div className="reports-page">

            <h1>Reports</h1>

            <p>View insights and statistics for your projects and tasks.</p>

            <section className="cards">

                <Card title="Projects" value={totalProjects} color="#2563eb"/>

                <Card title="Tasks" value={totalTasks} color="#8b5cf6"/>

                <Card title="Completed" value={completedTasks} color="#10b981"/>

                <Card title="Completion" value={`${completionRate}%`} color="#f59e0b"/>

            </section>

            <section className="report-card">

                 <h2>Performance Insights</h2>

                 <PerformanceInsights projects={projects} tasks={tasks}/>

            </section>

            <section className="report-grid">


                <div className="report-card">

                    <h2>Task Status Distribution</h2>

                    <TaskStatusChart tasks={tasks}/>

                </div>

                <div className="report-card">

                    <h2>Tasks By Project</h2>

                    <ProjectWorkloadChart projects={projects} tasks={tasks}/>

                </div>

            </section>

            <section className="report-card">

                <h2>Project Progress</h2>

                <ProjectProgressChart projects={projects}tasks={tasks}/>

            </section>

            <section className="report-card">

                <h2>Task Completion Trend</h2>

                <TaskCompletionTrendChart tasks={tasks} />

            </section>

            <section className="report-card">

                <h2>Recent Activity</h2>

                <RecentActivity projects={projects} tasks={tasks}/>

            </section>
        </div>
    );
}


export default Reports;