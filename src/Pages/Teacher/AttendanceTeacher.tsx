import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

interface AttendanceRecord {
    date: string;
    status: "present" | "absent";
}

const AttendanceTeacher: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [teacher, setTeacher] = useState<any>();
    let ID: number;
    if (id) {
        const parts = id.split("=");
        const idstr = parts[1];
        ID = Number(idstr.trim());
    }
    useEffect(() => {
        fetch(`http://localhost/backend/api/?action=singleteacher&id=${ID}`)
            .then((res) => res.json())
            .then((data) => setTeacher(data))
            .catch((err) => console.error(err));
        fetch(`http://localhost/backend/api/?action=getattendance&user_id=${ID}&user_type=teacher`)
            .then((res) => res.json())
            .then((data) => setAttendanceRecords(data))
            .catch((err) => console.log(err));
    }, [id]);
    return (
        <div className="m-3">
            <Link to={"/Principal/attendancelist"} className="btn btn-secondary">Back</Link>
            <h3 className="text-center">Teacher Attendance</h3>
            <>
                <h4>{teacher?.name}'s Attendance</h4>
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

export default AttendanceTeacher;
