-- =============================================
-- DROP TABLES IF THEY EXIST
-- =============================================
DROP TABLE IF EXISTS student_details;
DROP TABLE IF EXISTS students;

-- =============================================
-- CREATE TABLE: students
-- =============================================
CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    class VARCHAR(20),
    address VARCHAR(200),
    year VARCHAR(10),
    teacher_name VARCHAR(100)
);

-- =============================================
-- CREATE TABLE: student_details
-- =============================================
CREATE TABLE student_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,                     
    rollNumber VARCHAR(50),
    age INT,
    course VARCHAR(100),
    section VARCHAR(10),
    attendance VARCHAR(10),
    feesStatus VARCHAR(20),
    grade VARCHAR(5),
    email VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(200),
    pastYearMarks VARCHAR(10),
    passingYear INT,
    FOREIGN KEY (student_id) REFERENCES students(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- =============================================
-- INSERT STUDENT BASIC DATA
-- =============================================
INSERT INTO students (name, father_name, mother_name, class, address, year, teacher_name) VALUES
('Rahul Sharma', 'Amit Kumar', 'Priya Verma', '10th', 'Delhi, India', '2005', 'Anil Geholt'),
('Sneha Gupta', 'Rakesh Gupta', 'Sunita Gupta', '9th', 'Mumbai, India', '2006', 'Rekha Singh'),
('Amit Verma', 'Suresh Verma', 'Kavita Verma', '10th', 'Jaipur, India', '2005', 'Manoj Tiwari'),
('Pooja Singh', 'Mahesh Singh', 'Renu Singh', '8th', 'Lucknow, India', '2007', 'Anil Geholt'),
('Karan Patel', 'Vijay Patel', 'Mina Patel', '7th', 'Ahmedabad, India', '2008', 'Rekha Singh'),
('Riya Mishra', 'Rajesh Mishra', 'Nidhi Mishra', '6th', 'Varanasi, India', '2009', 'Manoj Tiwari'),
('Arjun Mehta', 'Prakash Mehta', 'Seema Mehta', '9th', 'Surat, India', '2006', 'Anil Geholt'),
('Neha Rani', 'Dilip Rani', 'Shobha Rani', '10th', 'Patna, India', '2005', 'Rekha Singh'),
('Sahil Khan', 'Imran Khan', 'Farah Khan', '8th', 'Bhopal, India', '2007', 'Manoj Tiwari'),
('Tina Das', 'Ajay Das', 'Reena Das', '7th', 'Kolkata, India', '2008', 'Anil Geholt'),
('Vikram Joshi', 'Harish Joshi', 'Pallavi Joshi', '6th', 'Pune, India', '2009', 'Rekha Singh');

-- =============================================
-- INSERT STUDENT DETAILS WITH LINK TO students TABLE
-- =============================================
-- Assuming IDs from students table: 1 to 11
INSERT INTO student_details (student_id, rollNumber, age, course, section, attendance, feesStatus, grade, email, phone, address, pastYearMarks, passingYear) VALUES
(1, 'CS202', 20, 'Computer Science', 'A', '90%', 'Paid', 'A', 'rahul.sharma@example.com', '9876123450', 'Delhi, India', '87%', 2023),
(2, 'IT305', 22, 'Information Technology', 'B', '88%', 'Pending', 'B+', 'sneha.gupta@example.com', '9988123456', 'Mumbai, India', '83%', 2022),
(3, 'ME215', 21, 'Mechanical Engineering', 'A', '82%', 'Paid', 'A-', 'amit.verma@example.com', '9123004567', 'Jaipur, India', '78%', 2023),
(4, 'EL210', 19, 'Electronics', 'A', '93%', 'Paid', 'A+', 'pooja.singh@example.com', '9877098765', 'Lucknow, India', '91%', 2023),
(5, 'CE360', 23, 'Civil Engineering', 'C', '75%', 'Pending', 'B', 'karan.patel@example.com', '9899001122', 'Ahmedabad, India', '70%', 2022),
(6, 'CS150', 18, 'Computer Science', 'B', '89%', 'Paid', 'A-', 'riya.mishra@example.com', '9900887766', 'Varanasi, India', '85%', 2023),
(7, 'IT410', 22, 'Information Technology', 'A', '94%', 'Paid', 'A+', 'arjun.mehta@example.com', '9877002233', 'Surat, India', '90%', 2022),
(8, 'ME330', 21, 'Mechanical Engineering', 'B', '81%', 'Pending', 'B+', 'neha.rani@example.com', '9123459900', 'Patna, India', '76%', 2022),
(9, 'EL150', 20, 'Electronics', 'A', '96%', 'Paid', 'A+', 'sahil.khan@example.com', '9988223344', 'Bhopal, India', '93%', 2023),
(10, 'CE499', 24, 'Civil Engineering', 'B', '78%', 'Paid', 'B+', 'tina.das@example.com', '9876112233', 'Kolkata, India', '74%', 2022);
