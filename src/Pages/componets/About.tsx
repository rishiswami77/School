import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { fetchTeacherList } from "../../store/slice/teacher";
import { fetchPrincipalDetails } from "../../store/slice/principal";
const About: React.FC = () => {


    // const teachersImages = [
    //     { img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=80" },
    //     { img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=1200&q=80" },
    //     { img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=1200&q=80" },
    //     { img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1200&q=80" },
    //     { img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=1200&q=80" },
    // ];

    const [teachers, setTeachers] = useState<any[]>([]);
    const [principal, setPrincipal] = useState<any>();
    const dispatch = useDispatch<AppDispatch>();
    const teacherdata = useSelector((state: RootState) => state.teacher);
    const principalDetails = useSelector((state: RootState) => state.principalDetails);

    useEffect(() => {
        dispatch(fetchTeacherList());
        dispatch(fetchPrincipalDetails());
    }, []);
    useEffect(() => {
        if (Array.isArray(teacherdata.data)) {
            setTeachers(teacherdata.data)
        }
        if (Array.isArray(principalDetails.data)) {
            let a = (principalDetails.data as any[])[0];
            setPrincipal(a)
        }

    }, [teacherdata, principalDetails])

    return (
        <div className="container about-page py-5">
            {/* School Image */}
            <div className="text-center mb-4">
                <img
                    src="https://images.unsplash.com/photo-1592066575517-58df903152f2?auto=format&fit=crop&w=1200&q=80"
                    alt="School Campus"
                    className="img-fluid rounded shadow"
                />
            </div>

            {/* About School */}
            <h1 className="text-center mb-3 text-primary fw-bold">
                About Sunrise International School
            </h1>
            <p className="lead text-muted text-justify">
                Sunrise International School, established in 1998, stands as a beacon of
                quality education blending tradition with modern teaching. Our mission
                is to nurture critical thinking, creativity, and compassion in every
                student, preparing them to become lifelong learners and responsible
                citizens.
            </p>

            {/* School Features */}
            <h2 className="mt-5 text-secondary">Key Features of Our School</h2>
            <div className="row mt-3 g-4">
                {[
                    "Smart classrooms with interactive digital boards.",
                    "Well-equipped laboratories for science, robotics, and AI.",
                    "Comprehensive sports and fitness facilities.",
                    "Internationally recognized curriculum and co-curricular programs.",
                    "Library with 15,000+ books and digital reading stations.",
                    "STEM-based learning and coding from early grades.",
                    "Art, music, and theatre programs for creative development.",
                    "Regular parent engagement and mentoring sessions.",
                    "Green campus with solar energy and waste management system.",
                    "24x7 CCTV security and a fully digital attendance system.",
                ].map((feature, index) => (
                    <div key={index} className="col-md-6">
                        <div className="d-flex align-items-start feature-item">
                            <i className="bi bi-check-circle-fill text-success me-2 fs-4"></i>
                            <p className="mb-0">{feature}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Principal Message */}
            <div className="mt-5 card border-0 shadow-lg p-4 principal-section">
                <div className="row align-items-center">
                    <div className="col-md-3 text-center mb-3 mb-md-0">
                        <img
                            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=1200&q=80"
                            alt="Principal"
                            className="rounded-circle img-fluid principal-img"
                        />
                    </div>
                    <div className="col-md-9">
                        <h3 className="text-primary">Dr. {principal?.name}, Principal</h3>
                        <p className="text-muted">
                            “At Sunrise International School, we inspire students to think
                            critically, communicate clearly, and act responsibly. Our teachers
                            serve as mentors and guides, ensuring that every child receives
                            the personalized attention and support they deserve.”
                        </p>
                    </div>
                </div>
            </div>

            {/* Teachers Section */}
            <h2 className="mt-5 text-secondary text-center">Meet Our Teachers</h2>
            <div className="row mt-4 g-4">
                {teachers?.map((data: any, i) => (
                    <div key={i} className="col-md-4 col-lg-3">
                        <div key={data.id} className="card teacher-card shadow-sm border-0 h-100">
                            <img
                                src={data.img}
                                alt={data.name}
                                className="card-img-top teacher-img"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title text-primary fw-semibold">
                                    Dr. {data.name} {data.surname}
                                </h5>
                                <p className="card-text text-muted">{data.subject}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default About;
