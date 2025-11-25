import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("/Dashboard");
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=principalcheck", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) setActive("/Dashboard");
                else setActive("/Principal");
            })
            .catch(() => setActive("/Dashboard"));

        fetch("http://localhost/backend/api/?action=studentcheck", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) setActive("/Dashboard");
                else setActive("/Student");
            })
            .catch(() => setActive("/Dashboard"));

        fetch("http://localhost/backend/api/?action=teachercheck", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) setActive("/Dashboard");
                else setActive("/Teacher");
            })
            .catch(() => setActive("/Dashboard"));

        navigate(active);
    }, [active]);

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/Dashboard">Dashboard</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/Dashboard"} className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">

                                <Link to={"/Dashboard/about"} className="nav-link">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/Dashboard/contact-us"} className="nav-link">Contact Us</Link>
                            </li>

                        </ul>
                        <Link to={"/Dashboard/search"} className="btn btn-info rounded-5 mx-2">
                            <IoSearch className="mb-1" />
                        </Link>

                        <Dropdown>
                            <Dropdown.Toggle variant="success" className="btn mx-1 rounded-0" id="dropdown-basic">
                                Login Options
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/Dashboard/principal-login" className="text-dark">Admin</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Dashboard/teacher-login" className="text-dark">Teacher</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Dashboard/student-login" className="text-dark">Student</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <Dropdown>
                            <Dropdown.Toggle variant="primary" className="btn mx-1 rounded-0" id="dropdown-basic">
                                Signup Options
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/Dashboard/teacher-signup" className="text-dark">Teacher</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/Dashboard/student-login" className="text-dark">Student</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div >
            </nav >

        </>
    )
}

export default Header;