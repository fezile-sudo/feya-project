import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";


function ProjectProgressChart({ projects, tasks }) {


    const data = projects.map(project => {

        const projectTasks = tasks.filter(task => String(task.projectId) === String(project.id));

        const completedTasks = projectTasks.filter(task => task.status === "Completed").length;

        const progress = projectTasks.length === 0
                ? 0
                : Math.round((completedTasks / projectTasks.length) * 100);
            return {
            name: project.title, progress
        };

    });

    if (projects.length === 0) {
        return <p>No project data available.</p>;
    }


    return (

        <ResponsiveContainer width="100%" height={350}>
            <BarChart
                data={data} layout="vertical">

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis type="number" domain={[0, 100]}/>

                <YAxis type="category" dataKey="name" width={120}/>

                <Tooltip formatter={(value) => `${value}%`}/>

                <Bar dataKey="progress" fill="#10b981"/>

            </BarChart>

        </ResponsiveContainer>
     );
}


export default ProjectProgressChart;