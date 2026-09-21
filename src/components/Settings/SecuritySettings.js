import { useState } from "react";
import { useSettings } from "../../context/SettingsContext";

import "./SecuritySettings.css";


function SecuritySettings() {

    const { settings, updateNestedSettings } = useSettings();

    const [saved, setSaved] = useState(false);

    const security = settings.security;

    const handleToggle = (e) => {
        updateNestedSettings("security", e.target.name, e.target.checked);
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
    };

    return (
        <div className="security-settings">
            <h2>Security Settings</h2>

            <p className="settings-description">Manage your account security and login activity.</p>

            <section>
                <h3>Two-Factor Authentication</h3>

                <label className="security-toggle">
                    <input type="checkbox" name="twoFactor" checked={security.twoFactor} onChange={handleToggle}/>
                    Enable two-factor authentication
                </label>

                <p className="security-note">Add an extra layer of protection when signing in.</p>
            </section>

            <section>
                <h3>Active Sessions</h3>

                <div className="session-card">
                    <div>
                        <strong>Chrome - Windows</strong>
                        <p>Current session</p>
                    </div>

                    <span className="status active"> Active </span>
                </div>

                <div className="session-card">
                    <div>
                        <strong> Mobile Device</strong>
                        <p> Last active 2 hours ago</p>
                    </div>

                    <span className="status">Expired</span>
                </div>
            </section>

            <section>
                <h3>Security Alerts</h3>

                <label className="security-toggle">
                    <input type="checkbox" name="securityAlerts" checked={security.securityAlerts} onChange={handleToggle}/>
                    Receive security notifications
                </label>
            </section>

            <section>
                <h3> Recent Activity</h3>

                <ul className="activity-list">

                    <li>Successful login - Today</li>

                    <li>Password updated - Yesterday</li>

                    <li>Profile information changed - 3 days ago</li>

                </ul>
            </section>

            <button className="save-btn" onClick={handleSave}>
                Save Changes
            </button>
            {saved && (
                <p className="success-message">Security settings saved.</p>
            )}
        </div>
    );
}

export default SecuritySettings;