import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    // Check session
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=check", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) navigate("/principal-login");
                else setUsername(data.username);
            })
            .catch(() => navigate("/principal-login"));
    }, [navigate]);

    const handleLogout = async () => {
        await fetch("http://localhost/backend/api/?action=logout", {
            credentials: "include"
        });
        navigate("/principal-login");
    };

    return (
        <div className="container mt-5">
            <h2>Welcome, {username}</h2>
            <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
