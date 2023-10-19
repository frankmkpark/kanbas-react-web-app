import React from "react";
import { Link, useParams } from "react-router-dom";
import db from "../../Database";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

function Assignments() {
  const { courseId } = useParams();
  const assignments = db.assignments;
  const courseAssignments = assignments.filter(
    assignment => assignment.course === courseId
  );

  return (
    <div>
          <div className="flex-container" style={{ textAlign: "left" }}>
              <input type="text" placeholder="Search for Assignment..." style={{ height: "35px" }} />
              <div style={{ display: "flex", textAlign: "right" }}>
                  <button className="btn btn-secondary custom-btn" style={{ height: "35px" }}>
                      <div className="fas fa-plus"> + Group</div>
                  </button>
                  <button className="btn btn-danger" style={{ height: "35px" }}>
                      <i className="fas fa-plus"></i>&nbsp;&nbsp;Assignment
                  </button>
                  <button className="btn btn-secondary custom-btn" style={{ width: "0.8cm", height: "35px" }}>
                      <b>⋮</b>
                  </button>
              </div>
          </div>
      <div style={{ textAlign: "left" }}>
      </div>
      <hr />
      <ul className="list-group" style={{width: '700px'}}>
        <li className="list-group-item list-group-item-secondary custom-grey-bg">
          <div className="flex-container">
            <b>Assignments</b>
            <div>
              <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
              &nbsp;&nbsp;&nbsp;
              <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
            </div>
          </div>
        </li>
        {courseAssignments.map((assignment) => (
          <li className="list-group-item" key={assignment._id}>
            <div className="flex-container">
              <i className="far fa-list-alt" style={{ color: "#00b900", marginRight: "20px" }}></i>
              <div style={{ flex: 1 }}>
                <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{ color: "black", fontSize: "14px" }}>
                  <b>{assignment.title}</b>
                </Link>
                <br />
                <span style={{ fontSize: "10px", color: "red"}}>{assignment._id} : {assignment.course}&nbsp;&nbsp;</span>
                <span style={{ fontSize: "10px" }}>|&nbsp;&nbsp; <b>Due</b>&nbsp;&nbsp;{assignment.due}</span>
              </div>
              <div>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Assignments;
