import React from 'react';
import db from "../Database";
import { Link } from "react-router-dom";
import './index.css';

function Dashboard() {
  const courses = db.courses;

  return (
    <div className="wd-grid-container">
      <div className="wd-grid-col-main-content content-padding">
        <h1>Dashboard</h1>
        <hr />
        <h2>Published Courses ({courses.length})</h2>
        <hr />

        <div className="flex-container">
          {courses.map((course, index) => (
            <div className="flex-item">
              <div className="card" style={{ width: '260px', marginTop: '35px' }}>                
              <img src="/images/blue-1.png" className="card-img-top" alt="course-thumbnail" />
                <div className="card-body">
                  <h5 className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    <Link 
                      to={`/Kanbas/Courses/${course._id}`} 
                      style={{ textDecoration: 'none', color: '#3498db' }}
                    >
                      <b>{course.name}</b>
                    </Link>
                  </h5>
                  <p className="card-text">Section 1 for {course.name}</p>
                  <br />
                  <button className="btn btn-transparent" style={{ backgroundColor: 'transparent', color: 'white' }}>
                    <i className="far fa-list-alt" style={{ color: '#838383' }}></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
