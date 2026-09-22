import { createContext, useContext, useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;


const TaskContext = createContext();


export function TaskProvider({ children }) {

const [tasks, setTasks] = useState([]);
const [loading, setLoading] = useState(true);

const formatTask = (task) => ({
    ...task,

    projectId: task.project_id,
    dueDate: task.due_date,
    createdAt: task.created_at
});


useEffect(() => {

    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("feyaPlanToken");

            if (!token) {
                setLoading(false);
                return;
            }

            const response = await fetch(
               `${API_URL}/api/tasks`,
                 {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const data = await response.json();

            const formattedTasks = data.map(formatTask);

            setTasks(formattedTasks);

        } catch (error) {

            console.error("Error fetching tasks:", error);
            throw error;
        } finally {

            setLoading(false);

        }
    };

    fetchTasks();

}, []);


const addTask = async (task) => {

    try {

        const token = localStorage.getItem("feyaPlanToken");

        const response = await fetch(
            `${API_URL}/api/tasks`,

            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority,
                    progress: task.progress ?? 0,
                    due_date: task.dueDate || null,
                    project_id: task.projectId
                })
            }
        );

        if (!response.ok) {
            const data = await response.json();

            throw new Error(
                data.error || "Failed to create task"
            );
        }

        const savedTask = await response.json();

        const formattedTask = formatTask(savedTask);

        setTasks(prev => [
            ...prev,
            formattedTask
        ]);

    } catch (error) {

        console.error("Error creating task:", error);

    }
};


const deleteTask = async (id) => {

    try {

        const token = localStorage.getItem("feyaPlanToken");

        const response = await fetch(
            `${API_URL}/api/tasks/${id}`,

            {
                method: "DELETE",

                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response.ok) {

            const data = await response.json();

            throw new Error(
                data.error || "Failed to delete task"
            );
        }

        setTasks(prev =>
            prev.filter(task => task.id !== id)
        );

    } catch (error) {

        console.error("Error deleting task:", error);
        throw error;
    }
};


const updateTask = async (updatedTask) => {

    try {

        const token = localStorage.getItem("feyaPlanToken");

        const response = await fetch(
            `${API_URL}/api/tasks/${updatedTask.id}`,

            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    title: updatedTask.title,
                    description: updatedTask.description,
                    status: updatedTask.status,
                    priority: updatedTask.priority,
                    progress: updatedTask.progress ?? 0,
                    due_date: updatedTask.dueDate || null,
                    project_id: updatedTask.projectId
                })
            }
        );

        if (!response.ok) {

            const data = await response.json();

            throw new Error(
                data.error || "Failed to update task"
            );
        }

        const savedTask = await response.json();

        const formattedTask = formatTask(savedTask);

        setTasks(prev =>
            prev.map(task =>
                task.id === formattedTask.id
                    ? formattedTask
                    : task
            )
        );

    } catch (error) {

        console.error("Error updating task:", error);
        throw error;
    }
};


return (

    <TaskContext.Provider
        value={{
            tasks,
            addTask,
            deleteTask,
            updateTask,
            loading
        }}
    >
        {children}
    </TaskContext.Provider>

);


}

export const useTasks = () => useContext(TaskContext);