import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch } from "../../store/store";
import { fetchDeleteTeacher } from "../../store/slice/teacher";

const TeacherDetails: React.FC = () => {

    const [teachers, setTeachers] = useState<any>();
    const [totalAbsents, setTotalAbsents] = useState(0);
    const [totalPresents, setTotalPresents] = useState(0);
    const dispatch = useDispatch<AppDispatch>();

    const { id } = useParams<{ id: string }>();

    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=getattendance&user_id=${ID}&user_type=teacher`)
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

        fetch(`http://localhost/backend/api/?action=singleteacher&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setTeachers(data))
            .catch((err) => console.log(err));
    }, [id]);


    const Deleteteachers = async (id: any) => {
        dispatch(fetchDeleteTeacher(id));
    };
    return (
        <div className="container mt-4">
            <div className="card shadow-lg">
                <div className="card-header bg-dark text-white text-center">
                    <h3 className="m-0">Teacher Profile</h3>
                </div>

                <div className="card-body">
                    <h4 className="text-center mb-3">{teachers?.name} {teachers?.surname}</h4>

                    <div className="row">
                        {/* teacherss table info */}
                        <div className="col-md-6 mb-3">
                            <strong>ID:</strong> {teachers?.id}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>User Name:</strong> {teachers?.username}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Email:</strong> <br />
                            {teachers?.email}
                        </div>
                        <div className="col-md-6 mb-3">
                            <strong>Password:</strong> {teachers?.password}
                        </div>
                        <div className="col-6 mb-3">
                            <strong>Total Pargents: </strong>
                            <span className="badge bg-success">{totalPresents}</span>
                        </div>
                        <div className="col-6 mb-3">
                            <strong>Total Absents: </strong>
                            <span className="badge bg-danger">{totalAbsents}</span>
                        </div>
                    </div>
                </div>

                <div className="card-footer text-center">
                    <Link to={`/Principal/teacher-edit/id=${teachers?.id}`} className="btn btn-primary mx-2">Edit</Link>
                    <button className="btn btn-danger mx-2" onClick={() => Deleteteachers(ID)}>Delete</button>
                    <Link className="btn btn-secondary" to={"/Principal"}>Back</Link>
                </div>
            </div>
        </div>

    );
};

export default TeacherDetails;
