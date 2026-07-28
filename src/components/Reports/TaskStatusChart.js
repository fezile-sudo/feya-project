import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from "recharts";


function TaskStatusChart({ tasks }) {

    const data = [
        {
            name: "To Do",
            value: tasks.filter(task => task.status === "To Do").length
        },
        {
            name: "In Progress",
            value: tasks.filter(task => task.status === "In Progress").length
        },
        {
            name: "Completed",
            value: tasks.filter(task => task.status === "Completed").length
        }
    ];

    const COLORS = [
        "#ef4444",
        "#f59e0b",
        "#10b981"
    ];

    if (tasks.length === 0) {
        return (
            <p>No task data available.</p>
        );
    }


    return (
        <ResponsiveContainer width="100%" height={300}>

            <PieChart>

                <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} label>

                    {data.map((entry, index) => (<Cell key={entry.name} fill={COLORS[index]}/>))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>
    );
}


export default TaskStatusChart;