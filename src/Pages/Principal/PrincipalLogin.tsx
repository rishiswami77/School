import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PrincipalLogin: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    // Check session
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=principalcheck", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    navigate("/Principal");
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
            const res = await fetch("http://localhost/backend/api/?action=principallogin", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: form.username, password: form.password })
            });
            const data = await res.json();
            if (data.success) navigate("/Principal");
            else alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
        setLoading(false);
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="w-50 p-5 shadow rounded bg-white">
                <h3 className="mb-3 text-center">Login</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PrincipalLogin;
