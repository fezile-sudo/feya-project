import Card from "../Card/Card";
import { useTasks } from "../../context/TaskContext";

function TaskStats() {

    const { tasks } = useTasks();

    const totalTasks = tasks.length;

    const todoTasks = tasks.filter(task => task.status === "To Do").length;

    const inProgressTasks = tasks.filter(task => task.status === "In Progress").length;

    const completedTasks = tasks.filter(task => task.status === "Completed").length;

    return (
        <div className="cards">

            <Card title="Total Tasks" value={totalTasks} color="#2563eb" />

            <Card title="To Do" value={todoTasks} color="#ef4444" />

            <Card title="In Progress" value={inProgressTasks} color="#f59e0b"/>

            <Card title="Completed" value={completedTasks} color="#10b981"/>

        </div>
    );
}

export default TaskStats;