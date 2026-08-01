import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";

import "./NotificationSettings.css";


function NotificationSettings() {

    const { settings, updateNestedSettings } = useSettings();

    const [saved, setSaved] = useState(false);

    const notifications = settings.notifications;

    const handleChange = (e) => {updateNestedSettings("notifications", e.target.name, e.target.checked);
        setSaved(false);
    };

    const handleSave = () => {setSaved(true);
        };

    return (

        <div className="notification-settings">
            <h2>Notification Settings</h2>

            <p className="settings-description">Manage how and when you receive notifications.</p>

            <section>
                <h3>Email Notifications</h3>
                <label className="notification-option">
                    <input type="checkbox" name="projectUpdates" checked={notifications.projectUpdates} onChange={handleChange}/>
                    Project updates
                </label>

                <label className="notification-option">
                    <input type="checkbox" name="taskAssignments" checked={notifications.taskAssignments} onChange={handleChange}/>
                    New task assignments
                </label>

                <label className="notification-option">
                    <input type="checkbox" name="deadlineReminders" checked={notifications.deadlineReminders} onChange={handleChange}/>
                    Deadline reminders
                </label>

                <label className="notification-option">
                     <input type="checkbox" name="weeklyReports" checked={notifications.weeklyReports} onChange={handleChange}/>
                    Weekly project reports
                </label>
            </section>

            <section>
                <h3> Activity Notifications</h3>
                <label className="notification-option">
                    <input type="checkbox" name="comments" checked={notifications.comments} onChange={handleChange}/>
                    New comments on tasks
                </label>

                <label className="notification-option">
                    <input type="checkbox" name="mentions" checked={notifications.mentions} onChange={handleChange}/>
                    Team mentions
                </label>
            </section>

            <section>
                <h3>Reports & Summaries</h3>
                <label className="notification-option">
                    <input type="checkbox" name="weeklySummary" checked={notifications.weeklySummary} onChange={handleChange}/>
                    Receive weekly activity summary
                </label>
            </section>

            <button className="save-btn" onClick={handleSave}>
                Save Changes
            </button>
            {saved && (
                <p className="success-message">Notification settings saved.</p>
            )}
        </div>
    );
}

export default NotificationSettings;