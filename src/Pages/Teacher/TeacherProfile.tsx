import { useEffect, useState } from "react";
import { useLocation, useNavigate,  } from "react-router-dom";

const TeacherProfile = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState<any>();
    const [user, setUser] = useState<number>();
    const [currentP, setCurrentP] = useState(false);
    const [current, setCurrent] = useState<any>();
    const [newP, setNewP] = useState<any>();
    const [confirmP, setConfirmP] = useState<any>();
    const [match, setMatch] = useState(false)
    const [message, setMessage] = useState<any>();
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=teachercheck", { credentials: "include" })
            .then(res => res.json())
            .then((data) => {
                if (`/Teacher/TeacherProfile/${data.id}` === location.pathname) {
                    setUser(data.id);
                } else {
                    navigate("/Teacher");
                }
                setLoading(false);
            })
            .catch(() => {
                navigate("/Teacher");
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=singleteacher&id=${user}`)
            .then((res) => res.json())
            .then((data) => setTeacher(data))
            .catch((err) => console.log(err));
    }, [user])
    console.log(teacher)
    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=teacherpasswordcheck&pass=${current}&id=${user}}`)
            .then((res) => res.json())
            .then((data) => setCurrentP(data.password))
            .catch((err) => console.error(err));
    }, [current])
    useEffect(() => {
        if (confirmP === newP) {
            setMatch(true);
        }
        else {
            setMatch(false);
        }
    }, [confirmP])


    if (loading) {
        return <div className="text-center mt-5">
            <div className="spinner-border text-primary"></div>
        </div>;
    }
    const personalInfoCard = (title: string, value: string) => (
        <div className="info-box p-4 rounded-3 shadow-sm mb-3">
            <h5 className="fw-bold">{title}</h5>
            <p className="text-secondary m-0">{value}</p>
        </div>
    );
    const handlsumit = async () => {
        if (match && currentP) {
            await fetch("http://localhost/backend/api/?action=changeteacherpass", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user,
                    password: confirmP,
                }),
            })
                .then((res) => res.json())
                .then((data) => setMessage(data.message))
                .catch((err) => console.error(err));
            setCurrentP(false);
            setCurrent("");
            setNewP("");
            setConfirmP("");
            setMatch(false);
        }
    }
    return (
        <div className="container py-5">

            {/* MAIN PROFILE CARD */}
            <div className="p-5 rounded-4 shadow-lg mx-auto profile-card">
                {message}
                <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">Change Password</button>

                {/* Avatar + Name */}
                <div className="text-center m-5">
                    <img
                        src="https://i.pravatar.cc/250"
                        className="rounded-circle shadow-lg profile-img"
                        alt="Avatar"
                    />
                    <h1 className="fw-bold text-primary mt-4">Dr. {teacher?.name} {teacher?.surname}</h1>
                </div>

                <div className="row g-4">

                    {/* LEFT SECTION */}
                    <div className="col-md-12">
                        <h3 className="fw-bold mb-3 text-dark">Information</h3>
                        {personalInfoCard("🆔 ID", teacher?.id)}
                        {personalInfoCard("👨‍🏫 Username", teacher?.username)}
                        {personalInfoCard("📧 Email", teacher?.email)}
                        {personalInfoCard("Subject", teacher?.subject)}
                    </div>

                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Change Password</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="form-floating mb-2">
                                {/* is-invalid */}
                                <input type="password" className={`form-control ${currentP ? 'is-valid' : 'is-invalid'}`} name="current" id="password1" value={current} onChange={(e: any) => setCurrent(e.target.value)} placeholder="Current Password" required />
                                <label htmlFor="password1">Current Password</label>
                            </form>
                            <form className="form-floating mb-2">
                                <input type="password" value={newP} className='form-control' onChange={(e: any) => setNewP(e.target.value)} id="password2" placeholder="New Password" required />
                                <label htmlFor="password2">New Password</label>
                            </form>
                            <form className="form-floating mb-2 has-validation">
                                <input type="password" value={confirmP} className={`form-control ${match ? 'is-valid' : 'is-invalid'}`} onChange={(e: any) => setConfirmP(e.target.value)} id="password3" placeholder="Confirm Password" required />
                                <label htmlFor="password3">Confirm Password</label>
                                <span className="valid-feedback">
                                    Password is Match!
                                </span>
                                <span className="invalid-feedback">
                                    Password Doesn't Match!
                                </span>
                            </form>
                        </div>
                        <form className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handlsumit}>Change Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
