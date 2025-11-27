import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import AddTeachers from './Pages/Teacher/AddTeacher';
import Layout from './Layout/Layout';
import AddStudent from './Pages/Student/AddStudent';
import Search from './Pages/componets/Search';
import Main from './Pages/Main';
import About from './Pages/componets/About';
import StudentLogin from './Pages/Student/StudentLogin';
import EditStudent from './Pages/Student/EditStudent';
import EditTeachers from './Pages/Teacher/EditTeacher';
import TeacherLogin from './Pages/Teacher/TeacherLogin';
import PrincipalLogin from './Pages/Principal/PrincipalLogin';
import ContactUs from './Pages/componets/ContactUs';
import StudentDetails from './Pages/Student/StudentDetails';
import AttendanceList from './Pages/Attendance';
import AttendanceTeacher from './Pages/Teacher/AttendanceTeacher';
import AttendanceStudent from './Pages/Student/AttendanceStudent';
import TeacherDetails from './Pages/Teacher/TeacherDetails';
import PrincipalLayout from './Layout/PrincipalLayout';
import SutdentLayout from './Layout/SutdentLayout';
import TeacherLayout from './Layout/TeacherLayout';
import TeacherSignup from './Pages/Teacher/TeahcerSignup';
import StudentSignup from './Pages/Student/StudentSignup';
import NotFound from './Pages/NotFound';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/Dashboard");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <div>
        <Routes>

          {/* ⛔ NOT FOUND ROUTE */}
          <Route path="*" element={<NotFound />} />

          <Route path='/Dashboard' element={<Layout />}>
            <Route index element={<Main />} />
            <Route path='/Dashboard/search' element={<Search />} />
            <Route path='/Dashboard/about' element={<About />} />
            <Route path='/Dashboard/contact-us' element={<ContactUs />} />
            <Route path='/Dashboard/student-login' element={<StudentLogin />} />
            <Route path='/Dashboard/teacher-login' element={<TeacherLogin />} />
            <Route path='/Dashboard/principal-login' element={<PrincipalLogin />} />
            <Route path='/Dashboard/teacher-signup' element={<TeacherSignup />} />
            <Route path='/Dashboard/student-signup' element={<StudentSignup />} />
          </Route>

          <Route path='/Principal' element={<PrincipalLayout />}>
            <Route index element={<Main />} />
            <Route path='/Principal/add-teacher' element={<AddTeachers />} />
            <Route path='/Principal/add-student' element={<AddStudent />} />
            <Route path='/Principal/search' element={<Search />} />
            <Route path='/Principal/student-edit/:id' element={<EditStudent />} />
            <Route path='/Principal/teacher-edit/:id' element={<EditTeachers />} />
            <Route path='/Principal/student-details/:id' element={<StudentDetails />} />
            <Route path='/Principal/attendancelist' element={<AttendanceList />} />
            <Route path='/Principal/attendance-student/:id' element={<AttendanceStudent />} />
            <Route path='/Principal/attendance-teacher/:id' element={<AttendanceTeacher />} />
            <Route path='/Principal/teacher-details/:id' element={<TeacherDetails />} />
          </Route>

          <Route path='/Student' element={<SutdentLayout />}>
            <Route index element={<Main />} />
            <Route path='/Student/search' element={<Search />} />
          </Route>

          <Route path='/Teacher' element={<TeacherLayout />}>
            <Route index element={<Main />} />
            <Route path='/Teacher/search' element={<Search />} />
            <Route path='/Teacher/student-details/:id' element={<StudentDetails />} />
            <Route path='/Teacher/student-edit/:id' element={<EditStudent />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
