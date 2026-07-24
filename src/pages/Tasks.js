import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskForm from "../components/Task/TaskForm";
import TaskCard from "../components/Task/TaskCard";
import TaskStats from "../components/Task/TaskStats";

import "./Tasks.css";

function Tasks() {

    const {tasks, addTask, deleteTask, updateTask} = useTasks();

    const [editingTask, setEditingTask] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [filterStatus, setFilterStatus] = useState("All");

    const handleSubmit = (taskData) => {

        if (editingTask) {

            updateTask(taskData);
            setEditingTask(null);

        } else {

            addTask(taskData);

        }

    };

    const filteredTasks = tasks.filter((task) => {

    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
            filterStatus === "All" ||
            task.status === filterStatus;

        return matchesSearch && matchesStatus;

    });

    return (

        <div className="tasks-page">

            <h1>Tasks</h1>

            <TaskStats />

            <div className="task-controls">
                <input type="text" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>

                    <option value="All">All Tasks</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>

                </select>

            </div>

            <TaskForm onSubmit={handleSubmit} task={editingTask} onCancel={() => setEditingTask(null)} />

            <div className="tasks-grid">

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <h3>No tasks yet</h3>
                        <p>Create your first task to get started. </p>

                    </div>

                ) : (
                filteredTasks.map(task => (
                    <TaskCard key={task.id} task={task} onDelete={deleteTask} onEdit={setEditingTask}/>

                    ))

                )}

            </div>
         </div>
    );
}

export default Tasks;