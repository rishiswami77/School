import React, { useEffect, useState } from "react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchTeacherList } from "../../store/slice/teacher";
import { fetchAddStudent } from "../../store/slice/student";

const StudentSignup: React.FC = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
    useEffect(() => {
        dispatch(fetchTeacherList());
    }, []);
    useEffect(() => {
        setTeachers(data.data);
    }, [data])

    // Check session
    useEffect(() => {
        fetch("http://localhost/backend/api/?action=studentcheck", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.logged_in) {
                    navigate("/Student");
                }
            })
            .catch(err => console.error("Check failed:", err));
    }, []);

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await dispatch(fetchAddStudent(formdata))
            .unwrap()
            .then(() => {

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
        setLoading(false)
        logincheck();
    };
    const logincheck = async () => {
        try {
            const res = await fetch("http://localhost/backend/api/?action=studentlogin", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ username: formdata.username, password: formdata.password })
            });
            const data = await res.json();
            if (data.success) navigate("/Student");
            else alert(data.message);
        } catch (err) {
            console.error(err);
            alert("Server error");
        }
    }
    const handleChange = (e: any) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };


    return (
        <div className="right-section p-5 col-12 d-flex flex-column align-items-center">
            <h3 className="fw-bold text-primary mb-2">Student Sign Up</h3>
            <p className="text-muted mb-4">
                Welcome! Please enter your details below 👋
            </p>

            <form onSubmit={HandleSubmit} className="col-5">

                <label htmlFor="name" className="ms-2">Name:</label>
                <input className="form-control m-2" name="name" id="name" value={formdata.name} onChange={handleChange} placeholder="Name" />

                <label htmlFor="username" className="ms-2">Username:</label>
                <input className="form-control m-2" id="username" name="username" value={formdata.username} onChange={handleChange} placeholder="User Name" />

                <label htmlFor="password" className="ms-2">Password:</label>
                <input className="form-control m-2" type="password" id="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Password" />

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
                    <div className="col-8">
                        <input className="form-control" id="tname" name="teacher_name" value={formdata.teacher_name} onChange={handleChange} placeholder="Teacher" />
                    </div>
                    <div className="col-4">
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
                {/* Login Button */}
                <button
                    type="submit"
                    className="btn btn-primary w-100 fw-semibold mb-3 login-btn"
                    name="login"
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>

                {/* OR Divider */}
                <div className="text-center text-muted small mb-3">
                    — Or login with —
                </div>

                {/* Social Buttons */}
                <div className="d-flex justify-content-center gap-3 mb-3">
                    <button
                        type="button"
                        className="btn btn-outline-danger d-flex align-items-center gap-2 px-4 social-btn"
                    >
                        <FaGoogle /> Google
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-primary d-flex align-items-center gap-2 px-4 social-btn"
                    >
                        <FaFacebook /> Facebook
                    </button>
                </div>

                {/* Register Link */}
                <div className="text-center small">
                    Don’t have an account?{" "}
                    <a href="#" className="text-primary fw-semibold text-decoration-none">
                        Register here
                    </a>
                </div>
            </form>
        </div>
    );
};

export default StudentSignup;
