import { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export function AuthProvider({ children }) {

        const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem("feyaPlanUser");
        return savedUser
            ? JSON.parse(savedUser)
            : null;
        });

        const register = (userData) => {

        const newUser = {...userData, avatar: userData.avatar || null};
        localStorage.setItem("feyaPlanUser", JSON.stringify(newUser));
        setUser(newUser);
        };

        const login = (email, password, remember) => {

        const savedUser = localStorage.getItem("feyaPlanUser");
        if (!savedUser) {
            return false;
        }

        const storedUser = JSON.parse(savedUser);
        if (storedUser.email === email && storedUser.password === password) {

            if (remember) {
                localStorage.setItem(
                    "feyaPlanRemember",
                    "true"
                );
            }
            setUser(storedUser);
            return true;
        }
        return false;
    };

    const logout = () => {localStorage.removeItem("feyaPlanRemember"); setUser(null);};

    const updateUser = (changes) => {

    const currentUser = JSON.parse(localStorage.getItem("feyaPlanUser"));

    const updatedUser = {...currentUser, ...changes};

    localStorage.setItem("feyaPlanUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
};

    return (
        <AuthContext.Provider
            value={{user, register, login, logout, updateUser}} >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {return useContext(AuthContext);}