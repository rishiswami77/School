import React, { useEffect, useState } from "react";
import { fetchAddStudent } from "../../store/slice/student";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchTeacherList } from "../../store/slice/teacher";

const AddStudent: React.FC = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [teachers, setTeachers] = useState<any>();
    const data = useSelector((state: RootState) => state.teacher);
    const [formdata, setFormdata] = useState({
        name: "",
        username: "",
        password: "",
        father_name: "",
        mother_name: "",
        class: "",
        year: "",
        teacher_name: "",

        // student_details table fields
        rollNumber: "",
        age: "",
        course: "",
        section: "",
        attendance: "",
        feesStatus: "",
        grade: "",
        email: "",
        phone: "",
        details_address: "",
        pastYearMarks: "",
        passingYear: ""
    });
    const [message, setMessage] = useState<string>("");
    useEffect(() => {
        dispatch(fetchTeacherList());
    }, []);
    useEffect(() => {
        setTeachers(data.data);
    }, [data])

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(fetchAddStudent(formdata))
            .unwrap()
            .then(() => {
                setMessage("Student added successfully!");

                // Reset form
                setFormdata({
                    name: "",
                    username: "",
                    password: "",
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
                    details_address: "",
                    pastYearMarks: "",
                    passingYear: ""
                });
            })
            .catch((err: any) => setMessage(err));
    };


    const handleChange = (e: any) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className="m-4">

                <form onSubmit={HandleSubmit} className="form-control p-4">

                    <h2 className="text-center">Add Student</h2>


                    <h4>Basic Details</h4>
                    <label htmlFor="name" className="ms-2">Name:</label>
                    <input className="form-control m-2" name="name" id="name" value={formdata.name} onChange={handleChange} placeholder="Name" />

                    <label htmlFor="username" className="ms-2">Username:</label>
                    <input className="form-control m-2" id="username" name="username" value={formdata.username} onChange={handleChange} placeholder="User Name" />

                    <label htmlFor="password" className="ms-2">Password:</label>
                    <input className="form-control m-2" id="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password" />

                    <label htmlFor="fname" className="ms-2">Father Name:</label>
                    <input className="form-control m-2" id="fname" name="father_name" value={formdata.father_name} onChange={handleChange} placeholder="Father Name" />

                    <label htmlFor="mname" className="ms-2">Mother Name:</label>
                    <input className="form-control m-2" id="mname" name="mother_name" value={formdata.mother_name} onChange={handleChange} placeholder="Mother Name" />

                    <label htmlFor="class" className="ms-2">Class:</label>
                    <input className="form-control m-2" name="class" id="class" value={formdata.class} onChange={handleChange} placeholder="Class" />

                    <label htmlFor="year" className="ms-2">Year:</label>
                    <input className="form-control m-2" name="year" id="Year" value={formdata.year} onChange={handleChange} placeholder="Started Year" />

                    <label htmlFor="tname" className="ms-2">Teacher Name:</label>
                    <div className="row ms-0">
                        <div className="col-10">
                            <input className="form-control" id="tname" name="teacher_name" value={formdata.teacher_name} onChange={handleChange} placeholder="Teacher" />
                        </div>
                        <div className="col-2">
                            <select name="teacher_name" className="form-control" onChange={handleChange} value={formdata.teacher_name} id="teachername">
                                <option value="">Select Subject</option>
                                {Array.isArray(teachers) && teachers.map((data: any, index: any) => (
                                    <option value={data.name + " " + data.surname} key={index} > {data.subject}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <h4 className="mt-4">Student Details</h4>

                    <input className="form-control m-2" name="rollNumber" value={formdata.rollNumber} onChange={handleChange} placeholder="Roll Number" />

                    <input className="form-control m-2" name="age" value={formdata.age} onChange={handleChange} placeholder="Age" />

                    <input className="form-control m-2" name="course" value={formdata.course} onChange={handleChange} placeholder="Course" />

                    <input className="form-control m-2" name="section" value={formdata.section} onChange={handleChange} placeholder="Section" />

                    <input className="form-control m-2" name="attendance" value={formdata.attendance} onChange={handleChange} placeholder="Attendance %" />

                    <select name="feesStatus" className="form-control m-2" id="fees" onChange={handleChange} value={formdata.feesStatus} >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>

                    <input className="form-control m-2" name="grade" value={formdata.grade} onChange={handleChange} placeholder="Grade" />

                    <input className="form-control m-2" name="email" value={formdata.email} onChange={handleChange} placeholder="Email" />

                    <input className="form-control m-2" name="phone" value={formdata.phone} onChange={handleChange} placeholder="Phone" />

                    <input className="form-control m-2" name="details_address" value={formdata.details_address} onChange={handleChange} placeholder="Details Address" />

                    <input className="form-control m-2" name="pastYearMarks" value={formdata.pastYearMarks} onChange={handleChange} placeholder="Last Year Marks" />

                    <input className="form-control m-2" name="passingYear" value={formdata.passingYear} onChange={handleChange} placeholder="Passing Year" />
                    {message && <p>{message}</p>}

                    <div className="text-center">
                        <button className="btn btn-primary mt-3 w-50">Add Student</button>
                    </div>
                </form >
            </div >
        </>
    );
};

export default AddStudent;
