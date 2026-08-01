import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./ResetPassword.css";


function ResetPassword() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const savedUser = localStorage.getItem("feyaPlanUser");

        if (!savedUser) {
            setError("No user found.");
            return;}

        const user = JSON.parse(savedUser);

        const updatedUser = {...user, password: password};

        localStorage.setItem("feyaPlanUser", JSON.stringify(updatedUser));

        setMessage("Password updated successfully.");

        setTimeout(() => {
            navigate("/login");
        }, 1500);
    };

    return (
        <div className="reset-page">
            <h2>Reset Password</h2>

            <p>Create your new password.</p>

            {error && (<div className="reset-error">{error}</div>)}

            {message && (<div className="reset-success">{message}</div>)}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>New Password</label>

                    <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}required/>
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>

                    <input type="password" value={confirmPassword} onChange={(e) =>setConfirmPassword(e.target.value)} required/>
                </div>

                <button className="reset-btn" type="submit">Update Password</button>
            </form>
            <p className="back-login"><Link to="/login">Back to Login</Link></p>
        </div>
    );
}

export default ResetPassword;