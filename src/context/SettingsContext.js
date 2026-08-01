import { createContext, useContext, useState, useEffect } from "react";


const SettingsContext = createContext();

const defaultSettings = {
    theme: "light",
    accentColor: "blue",
    compactMode: false,

    notifications: {
        projectUpdates: true,
        taskAssignments: true,
        deadlineReminders: true,
        weeklyReports: false,
        comments: true,
        mentions: true,
        weeklySummary: true
    },

    security: {
        twoFactor: false,
        securityAlerts: true
    },

    preferences: {
        language: "English",
        timezone: "UTC",
        dateFormat: "DD/MM/YYYY",
        weekStart: "Monday"
    }
};

const accentColors = {
    blue: "#2563eb",
    green: "#10b981",
    purple: "#8b5cf6"
};

function applyAccentColor(color) {

    const selectedColor = accentColors[color] || accentColors.blue;

    document.documentElement.style.setProperty("--primary", selectedColor);

    document.documentElement.style.setProperty("--accent", selectedColor);
}

export function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(() => {

    const savedSettings = localStorage.getItem("feyaPlanSettings");

        if(savedSettings) {
            return {...defaultSettings, ...JSON.parse(savedSettings)};
        }

        return defaultSettings;
    });

    useEffect(() => {localStorage.setItem("feyaPlanSettings", JSON.stringify(settings));}, [settings]);

    useEffect(() => {applyAccentColor(settings.accentColor);}, [settings.accentColor]);

    const updateSettings = (key, value) => {
        setSettings(prev => ({...prev, [key]: value}));
    };

    const resetSettings = () => {setSettings(defaultSettings);};

    const updateNestedSettings = (section, key, value) => {
        setSettings(prev => ({...prev, [section]: {...prev[section], [key]: value}}));
    };

    return (

        <SettingsContext.Provider
           value={{settings, updateSettings, updateNestedSettings, resetSettings}}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {return useContext(SettingsContext);}