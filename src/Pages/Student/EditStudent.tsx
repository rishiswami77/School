import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchTeacherList } from "../../store/slice/teacher";

const EditStudent: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const ID = Number(id);

    const dispatch = useDispatch<AppDispatch>();
    const teacherState = useSelector((state: RootState) => state.teacher);

    const [teachers, setTeachers] = useState<any[]>([]);

    const [students, setStudents] = useState<any>({});
    const [message, setMessage] = useState("");

    // ---------------------------
    // LOAD TEACHERS + STUDENT DATA
    // ---------------------------
    useEffect(() => {
        dispatch(fetchTeacherList());

        if (!ID) return;

        const getStudent = async () => {
            try {
                const basicRes = await fetch(`http://localhost/backend/api/?action=singlestudent&id=${ID}`);
                const basic = await basicRes.json();

                const detailRes = await fetch(`http://localhost/backend/api/?action=studentdetails&id=${ID}`);
                const detail = await detailRes.json();

                // merge both API results
                setStudents({
                    ...basic,
                    ...detail,
                });
            } catch (err) {
                console.error("Error loading student:", err);
            }
        };

        getStudent();
    }, [id]);

    // ---------------------------
    // UPDATE TEACHER LIST
    // ---------------------------
    useEffect(() => {
        setTeachers(teacherState.data || []);
    }, [teacherState]);


    // ---------------------------
    // HANDLE FORM CHANGE
    // ---------------------------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setStudents((prev: any) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    // ---------------------------
    // SUBMIT FORM
    // ---------------------------
    const HandleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            // Update student basic info
            const response = await fetch(
                `http://localhost/backend/api/?action=editstudent&id=${ID}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: students.name,
                        username: students.username,
                        password: students.password,
                        father_name: students.father_name,
                        mother_name: students.mother_name,
                        class: students.class,
                        year: students.year,
                        teacher_name: students.teacher_name,
                    })
                }
            );

            const result = await response.json();

            if (result.status !== "success") {
                setMessage("Error editing student.");
                return;
            }

            // Update details
            await fetch(`http://localhost/backend/api/?action=editstudentdetails`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    student_id: ID,
                    rollNumber: students.rollNumber,
                    age: students.age,
                    course: students.course,
                    section: students.section,
                    attendance: students.attendance,
                    feesStatus: students.feesStatus,
                    grade: students.grade,
                    email: students.email,
                    phone: students.phone,
                    address: students.address,
                    pastYearMarks: students.pastYearMarks,
                    passingYear: students.passingYear
                })
            });

            setMessage("Student updated successfully!");
        } catch (error: any) {
            setMessage("Error: " + error.message);
        }
    };
    return (
        <div className="m-4">
            {!students ? (
                <div>Loading...</div>
            ) : (
                <form onSubmit={HandleSubmit} className="form-control p-4">

                    <h2 className="text-center">Edit Student</h2>
                    <h4>Basic Details</h4>

                    <input className="form-control m-2" name="name" value={students.name || ""} onChange={handleChange} placeholder="Name" />
                    <input className="form-control m-2" name="username" value={students.username || ""} onChange={handleChange} placeholder="User Name" />
                    <input className="form-control m-2" name="password" value={students.password || ""} onChange={handleChange} placeholder="password" />
                    <input className="form-control m-2" name="father_name" value={students.father_name || ""} onChange={handleChange} placeholder="Father Name" />
                    <input className="form-control m-2" name="mother_name" value={students.mother_name || ""} onChange={handleChange} placeholder="Mother Name" />
                    <input className="form-control m-2" name="class" value={students.class || ""} onChange={handleChange} placeholder="Class" />
                    <input className="form-control m-2" name="year" value={students.year || ""} onChange={handleChange} placeholder="Started Year" />

                    <div className="row ms-0">
                        <div className="col-10">
                            <input className="form-control" name="teacher_name" value={students.teacher_name || ""} onChange={handleChange} placeholder="Teacher Name" />
                        </div>
                        <div className="col-2">
                            <select name="teacher_name" className="form-control" onChange={handleChange} value={students.teacher_name || ""}>
                                <option>Select Teacher</option>
                                {teachers.map((t: any, i: number) => (
                                    <option value={`${t.name} ${t.surname}`} key={i}>
                                        {t.name} {t.surname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h4 className="mt-4">Student Details</h4>

                    <input className="form-control m-2" name="rollNumber" value={students.rollNumber || ""} onChange={handleChange} placeholder="Roll Number" />
                    <input className="form-control m-2" name="age" value={students.age || ""} onChange={handleChange} placeholder="Age" />
                    <input className="form-control m-2" name="course" value={students.course || ""} onChange={handleChange} placeholder="Course" />
                    <input className="form-control m-2" name="section" value={students.section || ""} onChange={handleChange} placeholder="Section" />
                    <input className="form-control m-2" name="attendance" value={students.attendance || ""} onChange={handleChange} placeholder="Attendance %" />

                    <select name="feesStatus" className="form-control m-2" onChange={handleChange} value={students.feesStatus || ""}>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <input className="form-control m-2" name="grade" value={students.grade || ""} onChange={handleChange} placeholder="Grade" />
                    <input className="form-control m-2" name="email" value={students.email || ""} onChange={handleChange} placeholder="Email" />
                    <input className="form-control m-2" name="phone" value={students.phone || ""} onChange={handleChange} placeholder="Phone" />
                    <input className="form-control m-2" name="address" value={students.address || ""} onChange={handleChange} placeholder="Details Address" />
                    <input className="form-control m-2" name="pastYearMarks" value={students.pastYearMarks || ""} onChange={handleChange} placeholder="Last Year Marks" />
                    <input className="form-control m-2" name="passingYear" value={students.passingYear || ""} onChange={handleChange} placeholder="Passing Year" />

                    {message && <p>{message}</p>}

                    <div className="text-center">
                        <button className="btn btn-primary m-3 w-25">Save</button>
                        <Link to="/Principal" className="btn btn-secondary m-3 w-25">Back</Link>
                    </div>

                </form>
            )}
        </div>
    );
};

export default EditStudent;
