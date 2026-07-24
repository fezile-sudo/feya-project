import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {localStorage.setItem("tasks", JSON.stringify(tasks));}, [tasks]);

    const addTask = (task) => {setTasks(prev => [...prev, task]);
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const updateTask = (updatedTask) => {
        setTasks(prev => prev.map(task => task.id === updatedTask.id ? updatedTask : task ));
    };

    return (
        <TaskContext.Provider
            value={{tasks, addTask, deleteTask, updateTask}} >
            {children}
        </TaskContext.Provider>
    );
}

export const useTasks = () => useContext(TaskContext);