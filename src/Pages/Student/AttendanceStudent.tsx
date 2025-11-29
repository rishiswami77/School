import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

interface AttendanceRecord {
    date: string;
    status: "present" | "absent";
}

const AttendanceStudent: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [student, setStudent] = useState<any>();
    const ID = Number(id);

    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=singlestudent&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setStudent(data))
            .catch((err) => console.error(err));
        fetch(`http://localhost/backend/api/?action=getattendance&user_id=${ID}&user_type=student`)
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setAttendanceRecords(data);
                } else {
                    setAttendanceRecords([]);
                }
            })
            .catch((err) => console.error(err));

    }, [id]);


    return (
        <div className="m-3">
            <Link to={"/Principal/attendancelist"} className="btn btn-secondary">Back</Link>
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
