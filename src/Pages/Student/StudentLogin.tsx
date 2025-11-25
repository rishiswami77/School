import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StudentLogin: React.FC = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    // Check session
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=studentcheck", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    navigate("/Student");
                }
            })
            .catch(err => console.error("Check failed:", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            alert("Both username and password are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch("http://localhost/backend/api/?action=studentlogin", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: form.username, password: form.password })
            });
            const data = await res.json();
            if (data.success) navigate("/Student");
            else alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
        setLoading(false);
    };


    return (
        <div className="student-login d-flex align-items-center justify-content-center vh-100">
            <div className="login-wrapper bg-white shadow-lg rounded-4 overflow-hidden">
                <div className="row g-0">
                    {/* === LEFT SIDE IMAGE === */}
                    <div className="col-md-6 left-section d-flex align-items-center justify-content-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/706/706164.png"
                            alt="Student Illustration"
                            className="img-fluid illustration"
                        />
                    </div>

                    {/* === RIGHT SIDE LOGIN FORM === */}
                    <div className="col-md-6 right-section p-5 d-flex flex-column justify-content-center">
                        <h3 className="fw-bold text-primary mb-2">Student Login</h3>
                        <p className="text-muted mb-4">
                            Welcome back! Please enter your details below 👋
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Email Input */}
                            <div className="mb-3 position-relative">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    className="form-control input-field ps-5"
                                    value={form.username}
                                    name="username"
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                />
                            </div>

                            {/* Password Input */}
                            <div className="mb-3 position-relative">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    className="form-control input-field ps-5"
                                    value={form.password}
                                    name="password"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 fw-semibold mb-3 login-btn"
                                name="login"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                            {/* OR Divider */}
                            <div className="text-center text-muted small mb-3">
                                — Or login with —
                            </div>

                            {/* Social Buttons */}
                            <div className="d-flex justify-content-center gap-3 mb-3">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 social-btn"
                                >
                                    <FaGoogle /> Google
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-primary d-flex align-items-center gap-2 px-4 social-btn"
                                >
                                    <FaFacebook /> Facebook
                                </button>
                            </div>

                            {/* Register Link */}
                            <div className="text-center small">
                                Don’t have an account?{" "}
                                <a href="#" className="text-primary fw-semibold text-decoration-none">
                                    Register here
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentLogin;
