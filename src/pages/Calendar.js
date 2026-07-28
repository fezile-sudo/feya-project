import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useTasks } from "../context/TaskContext";
import { statusColors } from "../utils/statusColors";
import TaskDetailsModal from "../components/Calendar/TaskDetailsModal";
import EditTaskModal from "../components/Calendar/EditTaskModal";
import "./Calendar.css";


function Calendar() {

    const { tasks, updateTask } = useTasks();

    // Task selected from calendar
    const [selectedTask, setSelectedTask] = useState(null);

    // Task being edited
    const [editingTask, setEditingTask] = useState(null);


    // Convert tasks into FullCalendar events
    const events = tasks
        .filter(task => task.dueDate)
        .map(task => ({id: task.id.toString(), title: task.title, date: task.dueDate, backgroundColor: statusColors[task.status], borderColor: statusColors[task.status] }));

    // When clicking a calendar event
    const handleEventClick = (info) => {

    const task = tasks.find(task => task.id.toString() === info.event.id );
                setSelectedTask(task);

    };

    // Save edited task
    const handleEditSubmit = (updatedTask) => { updateTask(updatedTask); setEditingTask(null);};

    const handleEventDrop = (info) => {

    const taskId = info.event.id;

    const updatedTask = tasks.find(task => task.id.toString() === taskId);


    if (!updatedTask) return;
        updateTask({...updatedTask, dueDate: info.event.startStr});

};

 return (

        <div className="calendar-page">
            <h1>Calendar</h1>

            <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}

            initialView="dayGridMonth"

            headerToolbar={{left: "prev,next today", center: "title", right: "dayGridMonth,timeGridWeek,timeGridDay" }}

            height="auto"

            events={events}

            eventClick={handleEventClick}

            editable={true}

            eventDrop={handleEventDrop}/> 
        {
            selectedTask && (
                <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} onEdit={(task) => {setSelectedTask(null); setEditingTask(task);}} />
              )
            }

        {
            editingTask && (
                <EditTaskModal task={editingTask} onSubmit={handleEditSubmit} onClose={() => setEditingTask(null)}/>

             )
        }

         </div>
    );
}


export default Calendar;