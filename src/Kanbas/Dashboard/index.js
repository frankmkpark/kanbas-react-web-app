
import db from "../Database";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import blueImg from "../Dashboard/blue.png";
import "./index.css";

function Dashboard({ courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }
) {
    const isDashboard = window.location.pathname.includes("/Kanbas/Dashboard");
    return (
        <div className="container">

            <h1>Dashboard</h1>
            <hr />
            <h2>Published Courses ({courses.length})</h2>
            <hr />
            <input value={course.name} className="form-control"
                onChange={(e) => setCourse({ ...course, name: e.target.value })} />
            <input value={course.number} className="form-control"
                onChange={(e) => setCourse({ ...course, number: e.target.value })} />
            <input value={course.startDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, startDate: e.target.value })} />
            <input value={course.endDate} className="form-control" type="date"
                onChange={(e) => setCourse({ ...course, endDate: e.target.value })} />
            <button onClick={addNewCourse} >
                Add
            </button>
            <button onClick={updateCourse} >
                Update
            </button>
            <br />
            <br />
            <hr />
            <div class="d-flex flex-row flex-wrap">

                <div className="row row-cols-4">
                    {courses.map((course) => (
                        <div className="card course-card" key={course._id}>
                            <img src={blueImg} className="card-img-top" alt={`Course ${course.number}`} />
                            <div className="card-body">
                                <h5 className="card-title">
                                    <Link to={`/Kanbas/Courses/${course._id}`}>
                                        {course.number + " " + course.name}
                                    </Link>
                                <br />
                                </h5>
                                <p className="card-text">
                                    Fall 2023
                                </p>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setCourse(course);
                                    }}>
                                    Edit
                                </button>
                                <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        deleteCourse(course._id);
                                    }}>
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >

    );
}

export default Dashboard;
