import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";


function TaskCompletionTrendChart({ tasks }) {


    const completedTasks = tasks.filter(task => task.status === "Completed" );

    const monthlyData = {};

    completedTasks.forEach(task => {

        if (!task.createdAt) return;

    const date = new Date(task.createdAt);

    const month = date.toLocaleString("en-US", {month: "short"});

    if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }

         monthlyData[month]++;

    });


    const data = Object.keys(monthlyData).map(month => ({month, completed: monthlyData[month]}));

    if (data.length === 0) {return <p>No completion history available.</p>;}


    return (

        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3"/>

                <XAxis dataKey="month"/>

                <YAxis allowDecimals={false}/>

                <Tooltip />

                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3}/>

            </LineChart>

        </ResponsiveContainer>

    );
}


export default TaskCompletionTrendChart;