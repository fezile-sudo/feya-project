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

const {
    tasks,
    updateTask
} = useTasks();


const [selectedTask, setSelectedTask] = useState(null);

const [editingTask, setEditingTask] = useState(null);


// Convert a database timestamp into a calendar date.
const getCalendarDate = (date) => {

    if (!date) {
        return null;
    }

    return date.split("T")[0];

};


// Convert tasks into FullCalendar events.
const events = tasks
    .filter(task => task.dueDate)
    .map(task => ({

        id: task.id.toString(),

        title: task.title,

        date: getCalendarDate(task.dueDate),

        backgroundColor:
            statusColors[task.status] || "#64748b",

        borderColor:
            statusColors[task.status] || "#64748b"

    }));


// When a calendar event is clicked.
const handleEventClick = (info) => {

    const task = tasks.find(
        task =>
            task.id.toString() === info.event.id
    );


    if (!task) {
        return;
    }


    setSelectedTask(task);

};


// Save edited task.
const handleEditSubmit = async (updatedTask) => {

    await updateTask(updatedTask);

    setEditingTask(null);

};


// When a task is dragged to another date.
const handleEventDrop = async (info) => {

    const taskId = info.event.id;


    const task = tasks.find(
        task =>
            task.id.toString() === taskId
    );


    if (!task) {
        info.revert();
        return;
    }


    const newDueDate = info.event.startStr;


    try {

        await updateTask({
            ...task,
            dueDate: newDueDate
        });

    } catch (error) {

        console.error(
            "Error updating task date:",
            error
        );

        info.revert();

    }

};


return (

    <div className="calendar-page">

        <h1>Calendar</h1>


        <FullCalendar

            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin
            ]}

            initialView="dayGridMonth"

            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right:
                    "dayGridMonth,timeGridWeek,timeGridDay"
            }}

            height="auto"

            events={events}

            eventClick={handleEventClick}

            editable={true}

            eventDrop={handleEventDrop}

        />


        {selectedTask && (

            <TaskDetailsModal

                task={selectedTask}

                onClose={() =>
                    setSelectedTask(null)
                }

                onEdit={(task) => {

                    setSelectedTask(null);

                    setEditingTask(task);

                }}

            />

        )}


        {editingTask && (

            <EditTaskModal

                task={editingTask}

                onSubmit={handleEditSubmit}

                onClose={() =>
                    setEditingTask(null)
                }

            />

        )}

    </div>

);


}

export default Calendar;