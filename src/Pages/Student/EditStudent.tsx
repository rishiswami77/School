import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const EditStudent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [students, setStudents] = useState({
        id: "",
        name: "",
        father_name: "",
        mother_name: "",
        class: "",
        year: "",
        teacher_name: "",


        rollNumber: "",
        age: "",
        course: "",
        section: "",
        attendance: "",
        feesStatus: "",
        grade: "",
        email: "",
        phone: "",
        detail_address: "",
        pastYearMarks: "",
        passingYear: ""

    });
    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost/backend/api/?action=singlestudent&id=${ID}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.error) {
                    console.warn("Backend returned an error:", data.error);
                } else {
                    setStudents(data);
                }
            })
            .catch((err) => {
                console.error("Fetch failed:", err);
            });

        fetch(`http://localhost/backend/api/?action=studentdetails&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((err) => console.error(err));

    }, []);

    const HandleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const addStudentResponse = await fetch(
                `http://localhost/backend/api/?action=editstudent&id=${ID}`,
                {
                    method: "POST",
                    body: JSON.stringify({
                        name: students.name,
                        father_name: students.father_name,
                        mother_name: students.mother_name,
                        class: students.class,
                        year: students.year,
                        teacher_name: students.teacher_name,
                    }),
                }
            );

            const studentData = await addStudentResponse.json();

            if (studentData.status !== "success") {
                setMessage("Error adding student.");
                return;
            }
            console.log(studentData)

            const student_id = ID; // NEW STUDENT ID

            await fetch(`http://localhost/backend/api/?action=editstudentdetails&id=${ID}`, {
                method: "POST",
                body: JSON.stringify({
                    student_id,
                    rollNumber: students.rollNumber,
                    age: students.age,
                    course: students.course,
                    section: students.section,
                    attendance: students.attendance,
                    feesStatus: students.feesStatus,
                    grade: students.grade,
                    email: students.email,
                    phone: students.phone,
                    address: students.detail_address,
                    pastYearMarks: students.pastYearMarks,
                    passingYear: students.passingYear
                })
            });

            setMessage(`Student & Details added successfully! ID: ${student_id}`);
        } catch (error: any) {
            setMessage(`Error: ${error.message}`);
        }
    };
    const handleChange = (e: any) => {
        setStudents({ ...students, [e.target.name]: e.target.value });
    }

    return (
        <>
            <div className="m-4">

                <form onSubmit={HandleSubmit} className="form-control p-4">

                    <h2 className="text-center">Edit Student</h2>


                    <h4>Basic Details</h4>

                    <input className="form-control m-2" name="name" value={students.name} onChange={handleChange} placeholder="Name" />

                    <input className="form-control m-2" name="father_name" value={students.father_name} onChange={handleChange} placeholder="Father Name" />

                    <input className="form-control m-2" name="mother_name" value={students.mother_name} onChange={handleChange} placeholder="Mother Name" />

                    <input className="form-control m-2" name="class" value={students.class} onChange={handleChange} placeholder="Class" />

                    <input className="form-control m-2" name="year" value={students.year} onChange={handleChange} placeholder="Started Year" />

                    <input className="form-control m-2" name="teacher_name" value={students.teacher_name} onChange={handleChange} placeholder="Teacher" />

                    <h4 className="mt-4">Student Details</h4>

                    <input className="form-control m-2" name="rollNumber" value={students.rollNumber} onChange={handleChange} placeholder="Roll Number" />

                    <input className="form-control m-2" name="age" value={students.age} onChange={handleChange} placeholder="Age" />

                    <input className="form-control m-2" name="course" value={students.course} onChange={handleChange} placeholder="Course" />

                    <input className="form-control m-2" name="section" value={students.section} onChange={handleChange} placeholder="Section" />

                    <input className="form-control m-2" name="attendance" value={students.attendance} onChange={handleChange} placeholder="Attendance %" />

                    <select name="feesStatus" className="form-control m-2" id="fees" onChange={handleChange} value={students.feesStatus} >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <input className="form-control m-2" name="grade" value={students.grade} onChange={handleChange} placeholder="Grade" />

                    <input className="form-control m-2" name="email" value={students.email} onChange={handleChange} placeholder="Email" />

                    <input className="form-control m-2" name="phone" value={students.phone} onChange={handleChange} placeholder="Phone" />

                    <input className="form-control m-2" name="details_address" value={students?.detail_address} onChange={handleChange} placeholder="Details Address" />

                    <input className="form-control m-2" name="pastYearMarks" value={students.pastYearMarks} onChange={handleChange} placeholder="Last Year Marks" />

                    <input className="form-control m-2" name="passingYear" value={students.passingYear} onChange={handleChange} placeholder="Passing Year" />
                    {message && <p>{message}</p>}

                    <div className="text-center">
                        <button className="btn btn-primary m-3 w-25">Save</button>
                        <Link to={"/Principal"} className="btn btn-secondary m-3 w-25">Back</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditStudent;