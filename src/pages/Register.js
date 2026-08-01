import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Register.css";


function Register() {

    const { register } = useAuth();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const passwordStrength = () => {
        if (formData.password.length < 4) {
            return "Weak";
        }
        if (formData.password.length < 8) {
            return "Medium";
        }
        return "Strong";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        navigate("/");
    };

    return (

        <div className="register-page">
            <h2>Create Account</h2>

            <p className="register-subtitle">Join feyaPlan today</p>

            {error && (<p className="register-error">{error}</p>)}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" required />
                </div>

                <div className="form-group">
                    <label>Password</label>

                    <div className="password-wrapper">
                        <input type={showPassword ? "text" : "password"}

                            name="password" value={formData.password} onChange={handleChange} placeholder="Password" required/>

                        <button type="button" onClick={() =>setShowPassword(!showPassword)}>
                            {showPassword ? "Hide": "Show"}
                        </button>
                    </div>

                    <small>Strength: {passwordStrength()}</small>

                </div>

                <div className="form-group">
                    <label>Confirm Password</label>

                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required/>
                </div>

                <button className="register-btn" type="submit">
                    Create Account
                </button>
            </form>

            <p className="login-link">Already have an account?{" "}<Link to="/login">Login</Link></p>
        </div>
    );
}

export default Register;