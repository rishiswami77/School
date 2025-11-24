import { useEffect, useState } from "react";
import { IoExitOutline, IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const StudentPannel = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=studentcheck", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) navigate("/Dashboard");
                else setUsername(data.username);
            })
            // .catch(() => navigate());
    }, []);



    const handleLogout = async () => {
        await fetch("http://localhost/backend/api/?action=studentlogout", {
            credentials: "include"
        });
        navigate("/Dashboard");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/Student"}>Student</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link to={"/Principal/add-teacher"} className="nav-link">Add Teachers</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/Principal/add-student"} className="nav-link" >Add Students</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/Principal/attendancelist"} className="nav-link" >Attendance</Link>
                            </li> */}
                        </ul>
                        <Link to={"/Student/search"} className="btn btn-info rounded-5 mx-2">
                            <IoSearch className="mb-1" />
                        </Link>
                        <button className="btn mx-2 btn-info rounded-0" onClick={handleLogout}>{username} <IoExitOutline className="mb-1" /></button>
                    </div>
                </div >
            </nav >
        </>
    )
}
export default StudentPannel;