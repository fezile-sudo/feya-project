import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";

import "./AppearanceSettings.css";


function AppearanceSettings() {

    const { settings, updateSettings } = useSettings();

    const [saved, setSaved] = useState(false);

    const handleThemeChange = (e) => {
        updateSettings("theme", e.target.value);
        setSaved(false);
    };

    const handleColorChange = (color) => {
        updateSettings("accentColor", color);
        setSaved(false);
    };

    const handleCompactChange = () => {
        updateSettings("compactMode", !settings.compactMode);
        setSaved(false);
    };

    const handleSave = () => {setSaved(true);};

    return (
        <div className="appearance-settings">
            <p>Current theme: {settings.theme}</p>

            <h2>Appearance Settings</h2>

            <p className="settings-description">Customize how the application looks and feels.</p>

            <section>
                <h3>Theme</h3>

                <label className="radio-option">
                    <input type="radio" value="light" checked={settings.theme === "light"} onChange={handleThemeChange}/>
                    Light
                </label>

                <label className="radio-option">
                    <input type="radio" value="dark" checked={settings.theme === "dark"} onChange={handleThemeChange}/>
                    Dark
                </label>

                <label className="radio-option">
                    <input type="radio" value="system" checked={settings.theme === "system"} onChange={handleThemeChange}/>
                    System Default
                </label>
            </section>

            <section>
                <h3>Accent Color</h3>

                <div className="color-options">

                    <button className={settings.accentColor === "blue" ? "color active blue" : "color blue"} onClick={() => handleColorChange("blue")}>
                        Blue
                    </button>

                    <button className={settings.accentColor === "green" ? "color active green" : "color green"} onClick={() => handleColorChange("green")}>
                        Green
                    </button>

                    <button className={settings.accentColor === "purple" ? "color active purple" : "color purple"} onClick={() => handleColorChange("purple")}>
                        Purple
                    </button>
                </div>
            </section>

            <section>
                <h3>Layout</h3>
                <label className="toggle-option">

                    <input type="checkbox" checked={settings.compactMode} onChange={handleCompactChange}/>

                    Compact Mode

                </label>
            </section>

            <button className="save-btn" onClick={handleSave}>Save Changes</button>

            {saved && (
                <p className="success-message">Appearance settings saved.</p>
            )}
        </div>
    );
}

export default AppearanceSettings;