export function getProjectProgress(projectId, tasks) {

    const projectTasks = tasks.filter(
        task => Number(task.projectId) === Number(projectId)
    );


    if (projectTasks.length === 0) {

        return 0;

    }


    const completedTasks = projectTasks.filter(
        task => task.status === "Completed"
    ).length;


    return Math.round(
        (completedTasks / projectTasks.length) * 100
    );

}