import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";

import "./PreferencesSettings.css";


function PreferencesSettings() {

    const { settings, updateNestedSettings } = useSettings();

    const [saved, setSaved] = useState(false);

    const preferences = settings.preferences;

    const handleChange = (e) => {
        updateNestedSettings( "preferences", e.target.name, e.target.value);
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
    };

    return (

        <div className="preferences-settings">
            <h2>Preferences Settings</h2>

            <p className="settings-description">Customize regional and display preferences.</p>

            <div className="form-group">
                <label>Language</label>

                <select name="language" value={preferences.language} onChange={handleChange}>

                   <option> English</option>

                    <option>Spanish</option>

                    <option>French</option>

                    <option>German</option>

                </select>
            </div>

            <div className="form-group">
                <label> Timezone</label>

                <select name="timezone" value={preferences.timezone} onChange={handleChange}>

                    <option> UTC</option>

                    <option>GMT</option>

                    <option>EST</option>

                    <option>PST</option>

                </select>
            </div>

            <div className="form-group">
                <label> Date Format</label>

                <select name="dateFormat" value={preferences.dateFormat} onChange={handleChange}>

                    <option>DD/MM/YYYY</option>

                    <option>MM/DD/YYYY</option>

                    <option>YYYY-MM-DD</option>

                </select>
            </div>

            <div className="form-group">
                <label> First Day of Week</label>

                <select name="weekStart" value={preferences.weekStart} onChange={handleChange}>
                    <option>Monday</option>

                    <option>Sunday</option>

                </select>
            </div>

            <button className="save-btn" onClick={handleSave}>
                Save Changes
            </button>
            {saved && (
                <p className="success-message">Preferences saved successfully.</p>
            )}
        </div>
    );
}

export default PreferencesSettings;