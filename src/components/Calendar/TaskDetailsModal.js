import { useProjects } from "../../context/ProjectContext";
import { useTasks } from "../../context/TaskContext";
import "./TaskDetailsModal.css";


function TaskDetailsModal({ task, onClose, onEdit }) {

    const { projects } = useProjects();

    const { deleteTask } = useTasks();

    const project = projects.find( project => project.id === task.projectId);

    const handleDelete = () => {

    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

        if (confirmDelete) {
        deleteTask(task.id);
         onClose();
     }

    };


    return (

        <div className="modal-overlay" onClick={onClose}>

        <div className="task-modal" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose}> ×</button>

        <h2>{task.title}</h2>

        <div className="modal-details">

                    <p><strong>Project:</strong>{" "}{project ? project.title : "No Project"}</p>

                    <p><strong>Status:</strong>{" "}{task.status}</p>

                    <p><strong>Priority:</strong>{" "}{task.priority}</p>

                    <p><strong>Due Date:</strong>{" "}{task.dueDate || "No due date"}</p>

                    <p><strong>Description:</strong></p>

                    <p>{task.description || "No description"}</p>

                </div>

                <div className="modal-actions">

                    <button className="edit-button" onClick={() => onEdit(task)}>Edit</button>

                    <button className="delete-button" onClick={handleDelete}>Delete</button>

                </div>
            </div>
        </div>
    );
}


export default TaskDetailsModal;