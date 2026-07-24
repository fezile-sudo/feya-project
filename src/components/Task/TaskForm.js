import { useEffect, useState } from "react";
import { useProjects } from "../../context/ProjectContext";
import "./TaskForm.css";

function TaskForm({ onSubmit, task, onCancel }) {
    const { projects } = useProjects();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [projectId, setProjectId] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("To Do");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setProjectId(task.projectId);
            setPriority(task.priority);
            setStatus(task.status);
            setDueDate(task.dueDate);
        }
    }, [task]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onSubmit({
            ...task,
            id: task?.id || Date.now(),
            title,
            description,
            projectId,
            priority,
            status,
            dueDate,
            createdAt: task?.createdAt || new Date().toISOString()
        });

        if (!task) {
            setTitle("");
            setDescription("");
            setProjectId("");
            setPriority("Medium");
            setStatus("To Do");
            setDueDate("");
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>

            <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
                <option value="">Select Project</option>

                {projects.map(project => (
                    <option key={project.id} value={project.id}>
                        {project.title}
                    </option> 
                ))}
            </select>

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)} >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>

            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>

            <div className="form-buttons">

                <button type="submit">
                    {task ? "Update Task" : "Add Task"}
                </button>

                {task && (
                    <button type="button" onClick={onCancel} >
                        Cancel
                    </button>
                )}

            </div>

        </form>
    );
}

export default TaskForm;