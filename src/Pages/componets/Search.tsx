import { useState } from "react";

function Search() {

    interface Student {
        id: number;
        name: string;
        father_name: string;
        mother_name: string;
        class: string;
        address: string;
        year: string;
        teacher_name: string;
    }

    interface Teacher {
        id: number;
        name: string;
        email: string;
        subject: string;
    }

    const [search, setSearch] = useState("");
    const [type, setType] = useState<"student" | "teacher">("student");
    const [studentResults, setStudentResults] = useState<Student[]>([]);
    const [teacherResults, setTeacherResults] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (type === "student") {
            setStudentResults([]);
        } else {
            setTeacherResults([]);
        }
        try {
            const res = await fetch(
                `http://localhost/backend/api/?type=${type}&search=${encodeURIComponent(search)}`
            );

            const text = await res.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                alert("Server did not return valid JSON");
                return;
            }
            if (Array.isArray(data)) {
                if (type === "student") {
                    setStudentResults(data as Student[]);
                } else {
                    setTeacherResults(data as Teacher[]);
                }
            }
            else if (data.error) {
                alert("Server error: " + data.error);
            } else {
                alert("Unexpected response from server");
                console.log(data);
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Failed to fetch from backend. Check your PHP server.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="container mt-3">
            <form className="d-flex mb-3" onSubmit={handleSearch}>
                <div className="input-group">
                    <input
                        className="form-control w-75 rounded-0"
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder={`Search ${type === "student" ? "Students" : "Teachers"}`}
                    />
                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value as "student" | "teacher")}
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                    </select>
                    <button className="btn btn-success border-0 rounded-0" type="submit" disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>
            {type === "student" && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Mother's Name</th>
                            <th>Class</th>
                            <th>Started Year</th>
                            <th>Teacher</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(studentResults as Student[]).map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.father_name}</td>
                                <td>{student.mother_name}</td>
                                <td>{student.class}</td>
                                <td>{student.year}</td>
                                <td>{student.teacher_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {type === "teacher" && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(teacherResults as Teacher[]).map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.id}</td>
                                <td>{teacher.name}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.subject}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Search;
