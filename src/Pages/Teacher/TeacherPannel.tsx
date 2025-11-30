import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoExitOutline, IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const TeacherPannel = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState();
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=teachercheck", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) navigate("/Dashboard");
                else setUsername(data.username); setUserId(data.id);
            })
            .catch(() => console.log("error"));
    }, []);


    const handleLogout = async () => {
        await fetch("http://localhost/backend/api/?action=teacherlogout", {
            credentials: "include"
        });
        navigate("/Dashboard");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">

                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/Teacher"}>Teacher</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="me-auto"></div>
                        <Link to={"/Teacher/search"} className="btn btn-info rounded-5 ms-5 w-25 mx-2 me-auto">
                            <IoSearch className="mb-1" />
                        </Link>
                        <Link to={`/Teacher/TeacherProfile/${userId}`} className="nav-link active me-3"><CgProfile className="fs-3" /></Link>

                        <button className="btn mx-2 btn-info rounded-0" onClick={handleLogout}>{username} <IoExitOutline className="mb-1" /></button>
                    </div>
                </div >
            </nav >
        </>
    )
}
export default TeacherPannel;