import { useState } from "react";

const AddTeacher = () => {

    const [formdata, setFormdata] = useState({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        subject: "",
    })
    const [message, setMessage] = useState<string>("");
    const HandleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost/backend/api/?action=addteacher", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage(`User added successfully with ID: ${data.id}`);
                setFormdata({
                    name: "",
                    surname: "",
                    username: "",
                    email: "",
                    password: "",
                    subject: "",
                });
            }
        } catch (error) {
            setMessage(`Error: ${(error as Error).message}`);
        }
    }
    const handleChange = (e: any) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value });
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={HandleSubmit} className='form-control'>
                    <h2 className="text-center">Signup</h2>
                    <div className="input-group">
                        <label htmlFor="name" className="align-self-center me-4">Name:</label>&nbsp;
                        <input type="text" name='name' id="name" value={formdata.name} onChange={handleChange} placeholder='Enter your name' className='form-control m-2' />
                    </div><div className="input-group">
                        <label htmlFor="surname" className="align-self-center me-2">Surname:</label>
                        <input type="text" name='surname' id="surname" value={formdata.surname} onChange={handleChange} placeholder='Enter your surname' className='form-control m-2' />
                    </div><div className="input-group">
                        <label htmlFor="username" className="align-self-center">Username:</label>
                        <input type="text" name='username' id="username" value={formdata.username} onChange={handleChange} placeholder='Enter your username' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email" className="align-self-center me-4">Email:</label>&nbsp;&nbsp;
                        <input type="email" name='email' id="email" value={formdata.email} onChange={handleChange} placeholder='Enter your email' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password" className="align-self-center">Password:</label>&nbsp;
                        <input type="password" name='password' id="password" value={formdata.password} onChange={handleChange} placeholder='Enter your password' className='form-control m-2' />
                    </div>
                    <div className="input-group">
                        <label htmlFor="subject" className="align-self-center me-3">Subject:</label>
                        <input type="text" name='subject' id="subject" value={formdata.subject} onChange={handleChange} placeholder='Enter your subject' className='form-control m-2' />
                    </div>
                    <div className='text-center'>
                        <button className='btn btn-primary m-2 w-50' name='singup'>Singup</button>
                    </div>
                </form>
                {message && <p>{message}</p>}
            </div>

        </>
    )
}

export default AddTeacher;