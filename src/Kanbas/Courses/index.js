import React from "react";
import { useParams, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import JsonPre from "../../Labs/a3/JsonPre";
import db from "../Database";
import CourseNavigation from "./CourseNavigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import Grades from "./Grades"; import { Link } from "react-router-dom";
import ModuleList from "./Modules/ModuleList";
import { useState, useEffect } from "react";
import axios from "axios";

function Courses() {
    const { courseId } = useParams();
    const { pathname } = useLocation();
    const [empty, kanbas, courseSeg, id, screen, assignmentId] = pathname.split("/");
    const URL = "http://localhost:4000/api/courses";
    const [course, setCourse] = useState({});
    const findCourseById = async (courseId) => {
        console.log("Fetching course for courseId:", typeof courseId);
        const response = await axios.get(
            `${URL}/${courseId}`
        );
        setCourse(response.data);
    };

    const separatorStyle = {
        color: "gray",
        margin: "0 5px",
    };

    useEffect(() => {
        console.log("courseId from useParams:", typeof courseId);
        findCourseById(courseId);
    }, [courseId]);

    return (
        <div>
            <Link to={`/Kanbas/Courses/${courseId}`} style={{ color: "red", marginLeft: "10px" }}>{course.name}</Link>
            <span style={separatorStyle}> &gt; </span>
            <Link to={pathname} style={{ color: "black" }}>{screen}</Link>
            {assignmentId && (
                <>
                    <span style={separatorStyle}> &gt; </span>
                    <span style={{ color: "green" }}>Edit Assignment</span>
                </>
            )}
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