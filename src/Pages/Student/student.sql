DROP TABLE IF EXISTS students;

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

INSERT INTO students 
(name, father_name, mother_name, class, address, year, teacher_name)
VALUES
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
