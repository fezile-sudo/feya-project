import TaskForm from "../Task/TaskForm";
import "./EditTaskModal.css";


function EditTaskModal({ task, onSubmit, onClose }) {

    return (

        <div className="modal-overlay" onClick={onClose}>

            <div className="edit-task-modal" onClick={(e) => e.stopPropagation()}>

                <button className="modal-close" onClick={onClose}>×</button>

                <h2>Edit Task</h2>

                    <TaskForm task={task} onSubmit={onSubmit} onCancel={onClose}/>

            </div>
        </div>
    );
}


export default EditTaskModal;