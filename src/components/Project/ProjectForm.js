import { useEffect, useState } from "react";
import "./ProjectForm.css";

function ProjectForm({ onSubmit, project, onCancel }) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [status, setStatus] = useState("Planning");
     const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        if (project) {
            setTitle(project.title);
            setDescription(project.description);
            setPriority(project.priority);
            setStatus(project.status);
            setDueDate(project.dueDate);
        }
    }, [project]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        onSubmit({
            ...project,
            id: project?.id || Date.now(),
            title,
            description,
            priority,
            status,
            dueDate,
            createdAt: project?.createdAt || new Date().toISOString()
        });

        if (!project) {
            setTitle("");
            setDescription("");
            setPriority("Medium");
            setStatus("Planning");
            setDueDate("");
        }
    };

    return (
        <form className="project-form" onSubmit={handleSubmit}>

            <input placeholder="Project name" value={title} onChange={(e) => setTitle(e.target.value)}/>

            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <select value={priority} onChange={(e) => setPriority(e.target.value)} >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            <select value={status} onChange={(e) => setStatus(e.target.value)} >
                <option>Planning</option>
                <option>Active</option>
                <option>Completed</option>
                <option>On Hold</option>
            </select>

            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>

            <div className="form-buttons">

                <button type="submit">
                    {project ? "Update Project" : "Add Project"}
                </button>

                {project && (
                    <button type="button" onClick={onCancel}>
                        Cancel
                    </button>
                )}

            </div>

        </form>
    );
}

export default ProjectForm;
