import { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import SettingsMenu from "../components/Settings/SettingsMenu";
import ProfileSettings from "../components/Settings/ProfileSettings";
import AccountSettings from "../components/Settings/AccountSettings";
import AppearanceSettings from "../components/Settings/AppearanceSettings";
import NotificationSettings from "../components/Settings/NotificationSettings";
import SecuritySettings from "../components/Settings/SecuritySettings";
import PreferencesSettings from "../components/Settings/PreferencesSettings";
import AboutSettings from "../components/Settings/AboutSettings";

import "./Settings.css";

function Settings() {

    const [section, setSection] = useState("profile");

    const { resetSettings } = useSettings();

    const renderSection = () => {

        switch (section) {

            case "profile":
                return <ProfileSettings />;

            case "account":
                return <AccountSettings />;

            case "appearance":
                return <AppearanceSettings />;

            case "notifications":
                return <NotificationSettings />;

            case "security":
                return <SecuritySettings />;

            case "preferences":
                return <PreferencesSettings />;

            case "about":
                return <AboutSettings />;

            default:
                return <ProfileSettings />;
        }
    };

    

    return (

<div className="settings-page">
    <div className="settings-header">
        <h1>Settings</h1>

        <button className="reset-settings-btn" onClick={resetSettings}> Reset Settings</button>

    </div>

            <div className="settings-container">
                <SettingsMenu section={section} setSection={setSection}/>
                <div className="settings-content">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
}
export default Settings;