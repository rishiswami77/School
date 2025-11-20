import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const EditTeachers: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [teacher, setTeacher] = useState<any>()
    const [message, setMessage] = useState<string>("");

    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost/backend/api/?action=singleteacher&id=${ID}`)
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
                    setTeacher(data);
                }
            })
            .catch((err) => {
                console.error("Fetch failed:", err);
            });
        console.log(teacher)
    }, []);

    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (!teacher.id) {
                setMessage("Missing student ID.");
                return;
            }
            const response = await fetch(`http://localhost/backend/api/?action=editteacher&id=${ID}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacher),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage("Teacher updated successfully!");
            } else {
                setMessage(`Update failed: ${data.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${(error as Error).message}`);
        }
    }
    const handleChange = (e: any) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    }
    return (
        <>
            {message && <p>{message}</p>}
            <div className="m-4">
                <form onSubmit={HandleSubmit} className='form-control'>
                    <h2 className="text-center">Edit Teacher</h2>
                    <div className="input-group">
                        <label htmlFor="name" className="align-self-center me-4">Name:</label>&nbsp;
                        <input type="text" name='name' id="name" value={teacher?.name} onChange={handleChange} placeholder='Enter your name' className='form-control m-2' />
                    </div><div className="input-group">
                        <label htmlFor="surname" className="align-self-center me-2">Surname:</label>
                        <input type="text" name='surname' id="surname" value={teacher?.surname} onChange={handleChange} placeholder='Enter your surname' className='form-control m-2' />
                    </div><div className="input-group">
                        <label htmlFor="username" className="align-self-center">Username:</label>
                        <input type="text" name='username' id="username" value={teacher?.username} onChange={handleChange} placeholder='Enter your username' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="align-self-center me-4">Email:</label>&nbsp;&nbsp;
                        <input type="email" name='email' id="email" value={teacher?.email} onChange={handleChange} placeholder='Enter your email' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="align-self-center">Password:</label>&nbsp;
                        <input type="password" name='password' id="password" value={teacher?.password} onChange={handleChange} placeholder='Enter your password' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="subject" className="align-self-center me-2">Subject:</label>&nbsp;&nbsp;
                        <input type="subject" name='subject' id="subject" value={teacher?.subject} onChange={handleChange} placeholder='Enter your subject' className='form-control m-2' />
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary m-2 w-50' name='addteacher'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditTeachers;