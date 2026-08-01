function PerformanceInsights({ projects, tasks }) {


    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(task => task.status === "Completed").length;

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    const projectTaskCounts = projects.map(project => {

    const count = tasks.filter(task => String(task.projectId) === String(project.id)).length;

         return {title: project.title, count };

    });


    const mostActiveProject = projectTaskCounts.sort((a, b) => b.count - a.count)[0];

    const overdueTasks = tasks.filter(task => {if (!task.dueDate) return false;

        return (new Date(task.dueDate) < new Date() && task.status !== "Completed"); }).length;

    const highPriorityTasks = tasks.filter(task => task.priority === "High" && task.status !== "Completed").length;


    return (

        <div className="insights-list">

            <div className="insight-item"> ✓ {completionRate}% of tasks are completed </div>

            <div className="insight-item"> ✓ Most active project:{" "}<strong> {mostActiveProject?.title || "None"}</strong></div>

            <div className="insight-item"> ✓ Overdue tasks: {overdueTasks}</div>

            <div className="insight-item"> ✓ High priority tasks remaining: {highPriorityTasks}</div>
        </div>
    );
}


export default PerformanceInsights;