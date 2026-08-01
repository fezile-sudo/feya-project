import "./SettingsMenu.css";

function SettingsMenu({ section, setSection }) {

    const items = [
        { id: "profile", label: "Profile" },
        { id: "account", label: "Account" },
        { id: "appearance", label: "Appearance" },
        { id: "notifications", label: "Notifications" },
        { id: "security", label: "Security" },
        { id: "preferences", label: "Preferences" },
        { id: "about", label: "About" }
    ];

    return (
        <div className="settings-menu">
            {items.map(item => (
                <button key={item.id} className={section === item.id ? "active" : ""} onClick={() => setSection(item.id)}>
                    {item.label}
                </button>
            ))}
        </div>
    );
}

export default SettingsMenu;