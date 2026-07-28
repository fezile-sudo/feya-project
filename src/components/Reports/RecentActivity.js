function RecentActivity({ projects, tasks }) {

    const activities = [
        ...projects.map(project => ({
            id: `project-${project.id}`,
            type: "project",
            title: project.title,
            action: "Project created",
            date: project.createdAt
        })),

        ...tasks.map(task => ({
            id: `task-${task.id}`,
            type: "task",
            title: task.title,
            action:
                task.status === "Completed"
                    ? "Task completed"
                    : "Task created",
            date: task.createdAt
        }))
    ];


    const sortedActivities = activities.filter(activity => activity.date).sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

        if (sortedActivities.length === 0) {
            return (
                <div className="report-placeholder">No recent activity available.</div>
        );
    }


    return (
        <div className="activity-list">

            {sortedActivities.map(activity => (

                <div key={activity.id} className="activity-item">

                    <h3>{activity.action}</h3>

                    <p>{activity.type === "project"
                            ? "Project: "
                            : "Task: "
                        }<strong>{activity.title}</strong></p>

                    <small>
                        {new Date(activity.date).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        )}
                    </small>
                </div>
              ))}
        </div>
    );
}


export default RecentActivity;