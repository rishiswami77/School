import React, { useState, useEffect } from "react";
import { Table, Button, Form, Spinner } from "react-bootstrap";
import { RiShareBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";

interface Person {
    id: number;
    name: string;
}

interface AttendanceItem extends Person {
    status: "present" | "absent" | "Not Set";
}

const AttendanceList: React.FC = () => {
    const today = new Date().toISOString().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(today);
    const [teachers, setTeachers] = useState<AttendanceItem[]>([]);
    const [students, setStudents] = useState<AttendanceItem[]>([]);
    const [loading, setLoading] = useState(true);

    // -------------------- Fetch Data --------------------
    const fetchData = async () => {
        setLoading(true);
        try {
            const teacherRes = await fetch(
                `http://localhost/backend/api/?action=teacherlist`
            );
            const studentRes = await fetch(
                `http://localhost/backend/api/?action=studentlist`
            );

            const teacherData: Person[] = await teacherRes.json();
            const studentData: Person[] = await studentRes.json();

            const fetchAttendance = async (users: Person[], type: "teacher" | "student") => {
                const promises = users.map(async (u) => {
                    const res = await fetch(
                        `http://localhost/backend/api/?action=getattendance&user_id=${u.id}&user_type=${type}`
                    );
                    const data: { date: string; status: "present" | "absent" | "Not Set" }[] = await res.json();
                    const todayRecord = data.find((d) => d.date === selectedDate);
                    return {
                        ...u,
                        status: todayRecord ? todayRecord.status : "Not Set",
                    };
                });
                return Promise.all(promises);
            };

            const teacherAttendance = await fetchAttendance(teacherData, "teacher");
            const studentAttendance = await fetchAttendance(studentData, "student");

            setTeachers(teacherAttendance);
            setStudents(studentAttendance);
        } catch (err) {
            console.error("API Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedDate]);

    // -------------------- Toggle Attendance --------------------
    const toggleAttendance = async (listType: "teachers" | "students", index: number) => {
        const list = listType === "teachers" ? [...teachers] : [...students];
        const item = list[index];
        const newStatus: "present" | "absent" = item.status === "present" ? "absent" : "present";

        try {
            await fetch("http://localhost/backend/api/?action=saveattendance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: item.id,
                    user_type: listType === "teachers" ? "teacher" : "student",
                    date: selectedDate,
                    status: newStatus,
                }),
            });

            // Update local state
            item.status = newStatus;
            listType === "teachers" ? setTeachers(list) : setStudents(list);
        } catch (err) {
            console.error("Save Error:", err);
        }
    };

    const renderRows = (listType: "teachers" | "students", data: AttendanceItem[]) =>
        data.map((item, index) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                    <Button
                        variant={item.status === "present" ? "success" : item.status === "absent" ? "danger" : "secondary"}
                        onClick={() => toggleAttendance(listType, index)}
                    >
                        {item.status === "present" ? "Present" : item.status === "absent" ? "Absent" : "Not Set"}
                    </Button>
                </td>
                <td>
                    {listType === "students" ? <Link to={`/Principal/attendance-student/id=${item.id}`}><RiShareBoxLine /></Link>
                        : <Link to={`/Principal/attendance-teacher/id=${item.id}`}><RiShareBoxLine /></Link>}
                </td>
            </tr>
        ));

    const changeDate = (direction: "next" | "previous") => {
        const currentDate = new Date(selectedDate);
        if (direction === "next") {
            currentDate.setDate(currentDate.getDate() + 1); // Next day
        } else if (direction === "previous") {
            currentDate.setDate(currentDate.getDate() - 1); // Previous day
        }
        setSelectedDate(currentDate.toISOString().slice(0, 10));
    };

    if (loading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" /> Loading...
            </div>
        );

    return (
        <div className="m-3">
            <h3>Attendance Tracker</h3>

            {/* Date Picker */}
            <div className="d-flex align-items-center mb-3">
                <h5 className="me-3">
                    📅 Selected Date: <strong>{selectedDate}</strong>
                </h5>
                <Form.Control
                    type="date"
                    style={{ width: "200px" }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
                <Button className="ms-3" onClick={() => setSelectedDate(today)}>
                    Today
                </Button>
            </div>

            <div className="mb-3 d-flex justify-content-between">
                <Button onClick={() => changeDate("previous")} disabled={loading}>
                    ⬅ Previous Day
                </Button>

                <h5>
                    Current: {selectedDate}
                </h5>

                <Button onClick={() => changeDate("next")} disabled={loading}>
                    Next Day ➡
                </Button>
            </div>

            <div className="row">
                {/* Students */}
                <div className="col">
                    <h4>Students</h4>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderRows("students", students)}</tbody>
                    </Table>
                </div>

                {/* Teachers */}
                <div className="col">
                    <h4>Teachers</h4>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>{renderRows("teachers", teachers)}</tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AttendanceList;
