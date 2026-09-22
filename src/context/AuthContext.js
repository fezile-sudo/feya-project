import { createContext, useContext, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();


export function AuthProvider({ children }) {

const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("feyaPlanUser");

    return savedUser
        ? JSON.parse(savedUser)
        : null;
});

const register = async (userData) => {
    try {
        const response = await fetch(
            `${API_URL}/api/auth/register`,

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Registration failed"
            };
        }

        localStorage.setItem("feyaPlanUser", JSON.stringify(data));

        setUser(data);

        return {
            success: true,
            user: data
        };

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        return {
            success: false,
            error: "Unable to connect to server"
        };
    }
};

const login = async (email, password, remember) => {
    try {
        const response = await fetch(
            `${API_URL}/api/auth/login`,

            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.error || "Invalid email or password"
            };
        }

        localStorage.setItem("feyaPlanUser", JSON.stringify(data.user));

        localStorage.setItem("feyaPlanToken", data.token);

        if (remember) {
            localStorage.setItem(
                "feyaPlanRemember",
                "true"
            );
        } else {
            localStorage.removeItem("feyaPlanRemember");
        }

        setUser(data.user);

        return {
            success: true,
            user: data.user,
            token: data.token
        };

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return {
            success: false,
            error: "Unable to connect to server"
        };
    }
};

const logout = () => {
    localStorage.removeItem("feyaPlanRemember");
    localStorage.removeItem("feyaPlanUser");
    localStorage.removeItem("feyaPlanToken");

    setUser(null);
};

const updateUser = (changes) => {

    const currentUser = JSON.parse(
        localStorage.getItem("feyaPlanUser")
    );

    const updatedUser = {
        ...currentUser,
        ...changes
    };

    localStorage.setItem(
        "feyaPlanUser",
        JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
};

return (
    <AuthContext.Provider
        value={{
            user,
            register,
            login,
            logout,
            updateUser
        }}
    >
        {children}
    </AuthContext.Provider>
);


}

export function useAuth() {
return useContext(AuthContext);
}