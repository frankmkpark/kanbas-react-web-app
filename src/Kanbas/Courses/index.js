import React from "react";
import { useParams, Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import db from "../Database";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades";

function Courses({ courses }) {
    const { courseId } = useParams();
    const { pathname } = useLocation();
    const [empty, kanbas, courseSegments, id, screen] = pathname.split("/");
    const course = courses.find((course) => course._id === courseId);

    const separatorStyle = {
        color: "gray",
        margin: "0 5px",
    };

    return (
        <div>
            <Link to={`/Kanbas/Courses/${courseId}`} style={{ color: "red", marginLeft: "10px" }}>{course.name}</Link>
            <span style={separatorStyle}> &gt; </span>
            <Link to={pathname} style={{ color: "black" }}>{screen}</Link>
            <hr />
            <CourseNavigation />
            <div>
                <div
                    className="overflow-y-scroll position-fixed bottom-0 end-0"
                    style={{
                        left: "320px",
                        top: "50px",
                    }}
                >
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route
                            path="Assignments/:assignmentId"
                            element={<AssignmentEditor />}
                        />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default Courses;
