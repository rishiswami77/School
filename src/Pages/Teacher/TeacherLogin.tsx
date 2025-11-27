import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin: React.FC = () => {


    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    // Check session
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=teachercheck", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    navigate("/Teacher");
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
            const res = await fetch("http://localhost/backend/api/?action=teacherlogin", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: form.username, password: form.password })
            });
            const data = await res.json();
            if (data.success) navigate("/Teacher");
            else alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
        setLoading(false);
    };

    return (
        <div className="teacher-login-page d-flex justify-content-center align-items-center">
            <div className="login-wrapper d-flex rounded-4 shadow-lg overflow-hidden">
                {/* LEFT: Illustration */}
                <div className="left-illustration d-flex justify-content-center align-items-center p-4">
                    {/* SVG grouping of computer, backpack, books, magnifier, clock */}
                    <svg
                        className="scene-svg"
                        viewBox="0 0 900 600"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="bgGrad" x1="0" x2="1">
                                <stop offset="0" stopColor="#ffffff" />
                                <stop offset="1" stopColor="#f1f4ff" />
                            </linearGradient>

                            <linearGradient id="monitorGrad" x1="0" x2="1">
                                <stop offset="0" stopColor="#2d3a83" />
                                <stop offset="1" stopColor="#5468ff" />
                            </linearGradient>

                            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="0" dy="14" stdDeviation="24" floodOpacity="0.12" />
                            </filter>
                        </defs>

                        {/* soft rounded white card behind */}
                        <rect x="0" y="0" width="900" height="600" rx="18" fill="url(#bgGrad)" />

                        {/* Large monitor */}
                        <g transform="translate(80,120)" filter="url(#softShadow)">
                            <rect x="0" y="0" rx="18" width="320" height="200" fill="#1f2937" />
                            {/* screen */}
                            <rect x="18" y="14" width="284" height="160" rx="10" fill="#0f1724" />
                            <path d="M40 60 C80 30, 220 30, 260 60" stroke="#8aa1ff" strokeWidth="3" fill="none" strokeLinecap="round" />
                            {/* monitor stand */}
                            <rect x="125" y="204" width="70" height="12" rx="6" fill="#0f1724" />
                            <rect x="100" y="216" width="120" height="10" rx="5" fill="#cfd8ff" />
                        </g>

                        {/* Books stack */}
                        <g transform="translate(320,250)" >
                            <g transform="rotate(-8)">
                                <rect x="0" y="0" width="220" height="34" rx="6" fill="#ffb347" />
                                <rect x="8" y="-10" width="204" height="34" rx="6" fill="#ffd27f" />
                                <rect x="16" y="-20" width="188" height="34" rx="6" fill="#ffdede" />
                                <rect x="20" y="-33" width="164" height="34" rx="6" fill="#cfe8ff" />
                                {/* bookmarks */}
                                <rect x="180" y="-14" width="8" height="20" rx="2" fill="#ff6b6b" />
                            </g>
                        </g>

                        {/* Backpack (rounded) */}
                        <g transform="translate(520,130)" >
                            <ellipse cx="0" cy="120" rx="70" ry="85" fill="#5b2dbd" />
                            <rect x="-60" y="10" rx="30" width="120" height="120" fill="#7b46ff" />
                            <path d="M-35 35 q35 -45 70 0" fill="#ffd25f" opacity="0.95" />
                            <rect x="-25" y="70" width="50" height="35" rx="8" fill="#3a1f8e" />
                        </g>

                        {/* Magnifier (front) */}
                        <g transform="translate(400,170)">
                            <circle cx="0" cy="0" r="34" fill="#ffffff" stroke="#cfd8ff" strokeWidth="10" />
                            <circle cx="-6" cy="-2" r="18" fill="#e8f0ff" />
                            <rect x="30" y="30" width="80" height="12" rx="6" transform="rotate(30)" fill="#c0c9ff" />
                        </g>

                        {/* Alarm clock */}
                        <g transform="translate(610,310)">
                            <ellipse cx="0" cy="0" rx="36" ry="36" fill="#ff6b6b" />
                            <circle cx="0" cy="-6" r="20" fill="#fff" />
                            <rect x="-38" y="-38" width="18" height="18" rx="4" fill="#ff6b6b" transform="rotate(-30 -29 -29)" />
                            <rect x="20" y="-38" width="18" height="18" rx="4" fill="#ff6b6b" transform="rotate(30 29 -29)" />
                            <path d="M0 -6 L0 -13" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round" />
                            <path d="M0 -6 L9 0" stroke="#ff6b6b" strokeWidth="4" strokeLinecap="round" />
                        </g>

                        {/* decorative sparkles left */}
                        <g transform="translate(60,60)" opacity="0.9" fill="#fff">
                            <circle cx="0" cy="0" r="3" />
                            <rect x="20" y="-6" width="6" height="18" rx="3" transform="rotate(20)" />
                            <rect x="-12" y="18" width="10" height="10" rx="2" transform="rotate(-30)" />
                        </g>
                    </svg>
                </div>

                {/* RIGHT: Login card */}
                <div className="right-login p-4 position-relative">
                    <div className="toggle d-flex justify-content-center mb-3">
                        <div className="btn-group" role="group" aria-label="Student or Teacher">
                        </div>
                    </div>

                    <div className="card login-card p-4 mx-auto">
                        <h5 className="text-center title mb-4">TEACHER LOG IN</h5>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label small fw-semibold">Username</label>
                                <input
                                    type="text"
                                    className="form-control input-field"
                                    value={form.username}
                                    name="username"
                                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label small fw-semibold">Password</label>
                                <input
                                    type="password"
                                    className="form-control input-field"
                                    value={form.password}
                                    name="password"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-3 text-end">
                                <a className="forgot-link" href="#">Forgot Password?</a>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100 fw-semibold mb-3 login-btn"
                                name="login"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>
                        </form>
                    </div>

                    {/* Teacher SVG (overlapping, pointing) */}
                    <svg className="teacher-svg" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" >
                        {/* body */}
                        <g transform="translate(20,10)">
                            <ellipse cx="110" cy="220" rx="58" ry="40" fill="#ffd9b6" />
                            {/* torso */}
                            <rect x="60" y="80" rx="18" width="100" height="120" fill="#ffd54a" />
                            {/* head */}
                            <circle cx="110" cy="40" r="36" fill="#ffd9b6" />
                            {/* hair */}
                            <path d="M84 28 q26 -40 50 0 q-18 -8 -46 6" fill="#6b3f1a" />
                            {/* eyes */}
                            <circle cx="98" cy="36" r="4" fill="#222" />
                            <circle cx="122" cy="36" r="4" fill="#222" />
                            {/* smile */}
                            <path d="M98 48 q12 10 24 0" stroke="#742a0a" strokeWidth="2" fill="none" strokeLinecap="round" />
                            {/* arm pointing */}
                            <g transform="translate(160,100) rotate(6)">
                                <rect x="0" y="-6" width="70" height="14" rx="10" fill="#ffd9b6" />
                                <path d="M66 -6 q14 6 6 20 q-6 8 -18 6 q-6 -1 -10 -9" fill="#ffd9b6" />
                            </g>
                            {/* jacket detail */}
                            <rect x="98" y="118" width="18" height="6" rx="3" fill="#f9a825" />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default TeacherLogin;
