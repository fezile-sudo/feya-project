import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

import "./AccountSettings.css";


function AccountSettings() {

    const { user, updateUser } = useAuth();

    const [account, setAccount] = useState({
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setAccount({...account, [e.target.name]: e.target.value});
        setMessage("");

    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();

        if (account.currentPassword !== user.password) {
            setMessage("Current password is incorrect.");

            return;

        }

        if (account.newPassword !== account.confirmPassword) {

            setMessage("New passwords do not match.");

            return;

        }

        if (account.newPassword.length < 6) {

            setMessage("Password must be at least 6 characters.");

            return;
        }

        updateUser({password: account.newPassword});

        setMessage("Password updated successfully.");

        setAccount({
            ...account,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });};

    const handleDelete = () => {

    const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (confirmDelete) {

            setMessage("Account deletion requested.");
        }
    };

    return (

        <div className="account-settings">
            <h2>Account Settings</h2>

            <p className="settings-description">Manage your account credentials and security.</p>

            <form onSubmit={handlePasswordUpdate}>
                <div className="form-group">
                    <label>Email Address</label>

                    <input type="email" value={account.email} disabled/>
                </div>

                <h3>Change Password</h3>

                <div className="form-group">

                    <label>Current Password</label>

                    <input type={showPassword ? "text" : "password"} name="currentPassword" value={account.currentPassword} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input type={showPassword ? "text" : "password"} name="newPassword" value={account.newPassword} onChange={handleChange}/>
                </div>

                <div className="form-group">
                    <label>
                        Confirm New Password
                    </label>
                    <input type={showPassword ? "text" : "password"} name="confirmPassword" value={account.confirmPassword} onChange={handleChange}/>
                </div>

                <label className="password-toggle">
                    <input type="checkbox" checked={showPassword} onChange={() =>setShowPassword(!showPassword)}/>
                    Show passwords
                </label>

                <button className="save-btn" type="submit" >
                    Update Password
                </button>
            </form>

            <div className="danger-zone">
                <h3>Danger Zone</h3>

                <p>Permanently remove your account and all associated data.</p>

                <button className="delete-btn" onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
            {message && (

                <p className="account-message">{message}</p>
            )}
        </div>
    );
}


export default AccountSettings;