import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./Login.css";

function Login() {

const { login } = useAuth();

const navigate = useNavigate();

const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false
});

const [showPassword, setShowPassword] = useState(false);

const [error, setError] = useState("");

const [loading, setLoading] = useState(false);

const handleChange = (e) => {

    const { name, value, checked, type } = e.target;

    setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value
    });
};

const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    const result = await login(
        formData.email,
        formData.password,
        formData.remember
    );

    setLoading(false);

    if (result.success) {
        navigate("/");
    } else {
        setError(result.error || "Invalid email or password.");
    }
};

return (
    <div className="login-page">

        <h2>Welcome Back</h2>

        <p className="login-subtitle">
            Sign in to continue to feyaPlan
        </p>

        {error && (
            <p className="login-error">
                {error}
            </p>
        )}

        <form onSubmit={handleSubmit}>

            <div className="form-group">

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

            </div>

            <div className="form-group">

                <label>Password</label>

                <div className="password-wrapper">

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <button type="button" onClick={() => setShowPassword(!showPassword) }>
                        {showPassword ? "Hide" : "Show"}
                    </button>

                </div>

            </div>

            <div className="remember-row">

                <label>

                    <input type="checkbox" name="remember" checked={formData.remember} onChange={handleChange}/>

                    Remember me

                </label>

                <Link to="/forgot-password">
                    Forgot password?
                </Link>

            </div>

            <button className="login-btn" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>

        </form>

        <p className="register-link">

            Don't have an account?
            {" "}

            <Link to="/register">
                Create account
            </Link>

        </p>

    </div>
);


}

export default Login;