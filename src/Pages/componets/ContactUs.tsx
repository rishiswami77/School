import React from "react";

const ContactUs: React.FC = () => {
    return (
        <div className="contact-page py-5">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-primary">Contact Our School</h2>
                    <p className="text-muted">
                        We’d love to hear from you! Reach out with any questions or feedback.
                    </p>
                </div>

                <div className="row g-4">
                    {/* Left: Contact Info */}
                    <div className="col-md-5">
                        <div className="contact-card p-4 rounded-4 shadow-sm mb-4">
                            <h5 className="fw-semibold mb-3">School Information</h5>
                            <ul className="list-unstyled mb-0">
                                <li className="d-flex align-items-start mb-3">
                                    <i className="bi bi-geo-alt-fill text-primary me-3 fs-5"></i>
                                    <span>123 Green Valley Road, Springfield, USA</span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <i className="bi bi-telephone-fill text-primary me-3 fs-5"></i>
                                    <span>+1 (555) 234-5678</span>
                                </li>
                                <li className="d-flex align-items-start">
                                    <i className="bi bi-envelope-fill text-primary me-3 fs-5"></i>
                                    <span>info@greenvalleyschool.edu</span>
                                </li>
                            </ul>
                        </div>

                        <div className="map-container rounded-4 overflow-hidden shadow-sm">
                            <iframe
                                title="School Location"
                                width="100%"
                                height="250"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0196432999045!2d-122.4206796846816!3d37.77851967975805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cb97a5f9f%3A0x0!2zMzfCsDQ2JzQyLjYiTiAxMjLCsDI1JzE0LjUiVw!5e0!3m2!1sen!2sus!4v1701111111111"
                            ></iframe>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="col-md-7">
                        <div className="contact-form p-4 rounded-4 shadow-sm bg-white">
                            <h5 className="fw-semibold mb-4">Send Us a Message</h5>
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label fw-semibold small">
                                            Your Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            className="form-control rounded-3"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label fw-semibold small">
                                            Your Email
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control rounded-3"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="subject" className="form-label fw-semibold small">
                                            Subject
                                        </label>
                                        <input
                                            id="subject"
                                            type="text"
                                            className="form-control rounded-3"
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="message" className="form-label fw-semibold small">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            className="form-control rounded-3"
                                            rows={4}
                                            placeholder="Write your message here..."
                                        ></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary mt-4 px-4 py-2 rounded-3 fw-semibold"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
