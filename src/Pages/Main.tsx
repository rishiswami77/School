import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine, RiShareBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { AppDispatch, RootState } from "../store/store";
import { fetchDeleteTeacher, fetchTeacherList } from "../store/slice/teacher";
import { fetchDeleteStudent, fetchStudentList } from "../store/slice/student";

const Main = () => {

    const [teachers, setTeachers] = useState<any>();
    const [students, setStudents] = useState<any>();
    const [admin, setAdmin] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const teacherdata = useSelector((state: RootState) => state.teacher);
    const studentdata = useSelector((state: RootState) => state.student);

    const DeleteTeacher = async (id: number) => {
        await dispatch(fetchDeleteTeacher(id));
        dispatch(fetchTeacherList()); // Re-fetch the list after delete
    };

    const DeleteStudent = async (id: any) => {
        await dispatch(fetchDeleteStudent(id));
        dispatch(fetchStudentList()); // Re-fetch the list after delete
    };

    useEffect(() => {
        dispatch(fetchTeacherList());
        dispatch(fetchStudentList());
    }, []);

    useEffect(() => {
        if (Array.isArray(teacherdata.data)) {
            setTeachers(teacherdata.data)
        }
        if (Array.isArray(studentdata.data)) {
            setStudents(studentdata.data)
        }
    }, [teacherdata, studentdata])

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

    return (
        <>
            <div className="m-3 row">
                <div className="col-8">

                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Father Name</th>
                                <th>Mother Name</th>
                                <th>Class</th>
                                <th>Year</th>
                                <th>Teacher Name</th>
                                {admin && (
                                    <>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        <th>Details</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(students) && students.map((details: any, index: any) => (
                                <tr key={index}>
                                    <td>{details.id}</td>
                                    <td>{details.name}</td>
                                    <td>{details.father_name}</td>
                                    <td>{details.mother_name}</td>
                                    <td>{details.class}</td>
                                    <td>{details.year}</td>
                                    <td>{details.teacher_name}</td>
                                    {admin && (
                                        <>
                                            <td className="text-center"><Link to={`/Principal/student-edit/id=${details.id}`} className="text-dark"><FaRegEdit /></Link></td>
                                            <td className="text-center"><button className="border-0 bg-transparent" onClick={() => DeleteStudent(details.id)}><RiDeleteBinLine /></button></td>
                                            <td className="text-center"><Link to={`/Principal/student-details/id=${details.id}`}><RiShareBoxLine className="text-dark" /></Link></td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-4">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Subject</th>
                                {admin && (
                                    <>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                        <th>Details</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(teachers) && teachers.map((details: any, index: any) => (
                                <tr key={index}>
                                    <td>{details.id}</td>
                                    <td>{details.name} {details.surname}</td>
                                    <td>{details.subject}</td>
                                    {admin && (
                                        <>
                                            <td className="text-center"><Link to={`/Principal/teacher-edit/id=${details.id}`} className="text-dark"><FaRegEdit /></Link></td>
                                            <td className="text-center"><button className="border-0 bg-transparent" onClick={() => DeleteTeacher(details.id)}><RiDeleteBinLine /></button></td>
                                            <td className="text-center"><Link to={`/Principal/teacher-details/id=${details.id}`}><RiShareBoxLine className="text-dark" /></Link></td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </>
    )
}

export default Main;