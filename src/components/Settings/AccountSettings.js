import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./AccountSettings.css";

const API_URL = process.env.REACT_APP_API_URL;



function AccountSettings() {

const { user } = useAuth();

const [account, setAccount] = useState({
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
});

const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const handleChange = (e) => {

    setAccount({
        ...account,
        [e.target.name]: e.target.value
    });

    setMessage("");
    setError("");
};


const handlePasswordUpdate = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");

    if (account.newPassword !== account.confirmPassword) {
        setError("New passwords do not match.");
        return;
    }

    if (account.newPassword.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    setLoading(true);

    try {

        const token = localStorage.getItem("feyaPlanToken");

        const response = await fetch(
            `${API_URL}/api/users/password`,

            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },

                body: JSON.stringify({
                    currentPassword: account.currentPassword,
                    newPassword: account.newPassword
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Password update failed"
            );
        }

        setMessage("Password updated successfully.");

        setAccount({
            ...account,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });

    } catch (error) {

        console.error("PASSWORD UPDATE ERROR:", error);

        setError(
            error.message || "Password update failed"
        );

    } finally {

        setLoading(false);
    }
};


const handleDelete = () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
    );

    if (confirmDelete) {
        setMessage("Account deletion requested.");
    }
};


return (

    <div className="account-settings">

        <h2>Account Settings</h2>

        <p className="settings-description">
            Manage your account credentials and security.
        </p>


        <form onSubmit={handlePasswordUpdate}>

            <div className="form-group">

                <label>Email Address</label>

                <input type="email" value={account.email} disabled/>

            </div>


            <h3>Change Password</h3>


            <div className="form-group">

                <label>Current Password</label>

                <input type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    name="currentPassword"
                    value={account.currentPassword}
                    onChange={handleChange}
                    required/>

            </div>


            <div className="form-group">

                <label>New Password</label>

                <input type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    name="newPassword"
                    value={account.newPassword}
                    onChange={handleChange}
                    required/>

            </div>


            <div className="form-group">

                <label>Confirm New Password</label>

                <input type={
                        showPassword
                            ? "text"
                            : "password"
                    }
                    name="confirmPassword"
                    value={account.confirmPassword}
                    onChange={handleChange}
                    required/>

            </div>


            <label className="password-toggle">

                <input type="checkbox"
                    checked={showPassword}
                    onChange={() =>
                        setShowPassword(!showPassword)
                    }/>

                Show passwords

            </label>


            <button className="save-btn" type="submit" disabled={loading}>
                {loading
                    ? "Updating..."
                    : "Update Password"
                }
            </button>

        </form>


        <div className="danger-zone">

            <h3>Danger Zone</h3>

            <p>
                Permanently remove your account and all
                associated data.
            </p>

            <button className="delete-btn" onClick={handleDelete}>
                Delete Account
            </button>

        </div>


        {message && (
            <p className="account-message">
                {message}
            </p>
        )}


        {error && (
            <p className="account-message">
                {error}
            </p>
        )}

    </div>
);


}

export default AccountSettings;