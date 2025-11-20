import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface AttendanceRecord {
    date: string;
    status: "present" | "absent";
}

const AttendanceStudent: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [student, setStudent] = useState<any>();
    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=singlestudent&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .catch((err) => console.error(err));
        fetch(`http://localhost/backend/api/?action=getattendance&user_id=${ID}&user_type=student`)
            .then((res) => res.json())
            .then((data) => setAttendanceRecords(data))
            .catch((err) => console.log(err));
    }, [id]);


    return (
        <div className="m-3">
            <h3 className="text-center">Student Attendance</h3>
            <>
                <h4>{student?.name}'s Attendance</h4>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendanceRecords.map((record) => (
                            <tr key={record.date}>
                                <td>{record.date}</td>
                                <td>
                                    <Button variant={record.status === "present" ? "success" : "danger"}>
                                        {record.status === "present" ? "Present" : "Absent"}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        </div>
    );
};

export default AttendanceStudent;
