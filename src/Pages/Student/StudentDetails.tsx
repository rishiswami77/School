import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDeleteStudent } from "../../store/slice/student";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";

const StudentDetails: React.FC = () => {

    const [student, setStudent] = useState<any>();
    const [totalAbsents, setTotalAbsents] = useState(0);
    const [totalPresents, setTotalPresents] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [admin, setAdmin] = useState(false);
    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=principalcheck", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (!data.logged_in) setAdmin(false);
                else setAdmin(true);
            })
            .catch(() => { setAdmin(false) });
    }, [admin]);

    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=studentdetails&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .catch((err) => console.error(err));

        fetch(`http://localhost/backend/api/?action=getattendance&user_id=${ID}&user_type=student`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const presentCount = data.filter(
                        (item: any) => item.status === "present"
                    ).length;
                    setTotalPresents(presentCount);
                }
                if (Array.isArray(data)) {
                    const absentCount = data.filter(
                        (item: any) => item.status === "absent"
                    ).length;
                    setTotalAbsents(absentCount)
                } else {
                    console.warn("status is not an array");
                    setTotalPresents(0);
                    setTotalAbsents(0);
                }
            })
            .catch((err) => console.log(err));

    }, [id]);
    const DeleteStudent = async (id: any) => {
        dispatch(fetchDeleteStudent(id));
        navigate('/admin')
    };
    console.log(student)
    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-header bg-dark text-white text-center">
                    <h3 className="m-0">Student Profile</h3>
                </div>

                <div className="card-body">
                    <h4 className="text-center mb-3">{student?.name}</h4>

                    <div className="row">
                        {/* Students table info */}
                        <div className="col-md-6 mb-3">
                            <strong>Father Name:</strong> {student?.father_name}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Mother Name:</strong> {student?.mother_name}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Class:</strong> {student?.class}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Teacher Name:</strong> {student?.teacher_name}
                        </div>

                        {/* Student_details table info */}
                        <div className="col-md-6 mb-3">
                            <strong>ID:</strong> {student?.student_id}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Roll Number:</strong> {student?.rollNumber}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>username:</strong> {student?.username}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>password:</strong> {student?.password}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Age:</strong> {student?.age}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Course:</strong> {student?.course}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Section:</strong> {student?.section}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Attendance:</strong>{" "}
                            <span className="badge bg-success">{student?.attendance}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Fees Status:</strong>{" "}
                            <span
                                className={`badge ${student?.feesStatus === "Paid" ? "bg-success" : "bg-danger"}`}
                            >
                                {student?.feesStatus}
                            </span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Grade:</strong>{" "}
                            <span className="badge bg-primary">{student?.grade}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Email:</strong> <br />
                            {student?.email}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Phone:</strong> {student?.phone}
                        </div>
                        <div className="col-6 mb-3">
                            <strong>Address:</strong> <br />
                            {student?.detail_address}
                        </div>
                        <div className="col-6 mb-3">
                            <strong>Total Pargents: </strong>
                            <span className="badge bg-success">{totalPresents}</span>

                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Past Year Marks:</strong> {student?.pastYearMarks}
                        </div>
                        <div className="col-6 mb-3">
                            <strong>Total Absents: </strong>
                            <span className="badge bg-danger">{totalAbsents}</span>
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Passing Year:</strong> {student?.passingYear}
                        </div>
                    </div>
                </div>

                <div className="card-footer text-center">
                    {admin && (
                        <>
                            <Link to={`/Principal/student-edit/id=${student?.student_id}`} className="btn btn-primary mx-2">Edit</Link>
                            <button className="btn btn-danger mx-2" onClick={() => DeleteStudent(ID)}>Delete</button>
                        </>
                    )
                    }
                    <Link className="btn btn-secondary" to={"/Principal"}>Back</Link>
                </div>
            </div>
        </div>

    );
};

export default StudentDetails;
