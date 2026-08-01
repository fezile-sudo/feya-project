import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./ForgotPassword.css";


function ForgotPassword() {


    const navigate = useNavigate();


    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        const savedUser = localStorage.getItem("feyaPlanUser");

        if (!savedUser) {
            setError("No account found.");
            return;
        }

        const user = JSON.parse(savedUser);

        if (user.email !== email) {
            setError("Email address not found.");
            return;
        }

        const resetToken = Date.now().toString();

        localStorage.setItem("feyaPlanResetToken",resetToken);

        setMessage( "Reset link generated successfully.");

        setTimeout(() => { navigate("/reset-password");}, 1500);
    };


    return (
        <div className="forgot-page">
            <h2>Forgot Password</h2>

            <p>Enter your email to reset your password.</p>

            {error && (
                <div className="forgot-error">{error}</div>
                )}

            {message && (<div className="forgot-success">{message}</div>)}

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Email</label>

                    <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Enter your email" required/>
                </div>

                <button className="forgot-btn" type="submit">Send Reset Link</button>
            </form>

            <p className="back-login"><Link to="/login">Back to Login</Link></p>
        </div>
    );
}

export default ForgotPassword;