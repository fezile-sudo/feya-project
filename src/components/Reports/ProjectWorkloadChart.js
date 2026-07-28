import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";


function ProjectWorkloadChart({ projects, tasks }) {

    const data = projects.map(project => {

    const projectTasks = tasks.filter(task => String(task.projectId) === String(project.id));
         return {name: project.title, tasks: projectTasks.length};

    });


    const noProjectTasks = tasks.filter(task => !task.projectId).length;


    if (noProjectTasks > 0) {data.push({name: "No Project", tasks: noProjectTasks});}


    if (tasks.length === 0) { return <p>No task data available.</p>;}


    return (

        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="tasks" fill="#2563eb"/>

            </BarChart>

        </ResponsiveContainer>
     );
}


export default ProjectWorkloadChart;