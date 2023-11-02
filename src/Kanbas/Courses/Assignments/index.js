import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheckCircle, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { setAssignment, deleteAssignment } from "./assignmentsReducer";

function Assignments() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const assignments = useSelector((state) => state.assignmentsReducer.assignments);
  const dispatch = useDispatch();
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === courseId
  );

  const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);

  const handleAddAssignment = () => {
    navigate(`/Kanbas/Courses/${courseId}/Assignments/assignment-editor`);
    dispatch(setAssignment({
      title: "New Assignment",
      description: "New Description",
      points: 0,
      assignDate: "",
      due: "",
      availableFrom: "",
      until: "",
      course: courseId
    }));
  };

  const handleDeleteAssignment = (assignmentId) => {
    setDeleteAssignmentId(assignmentId);
  };

  const handleConfirmDelete = () => {
    if (deleteAssignmentId) {
      dispatch(deleteAssignment(deleteAssignmentId));
      setDeleteAssignmentId(null); 
    }
  };

  const handleCancelDelete = () => {
    setDeleteAssignmentId(null);
  };

  return (
    <div>
      <h2>Assignments for course {courseId}</h2>
      <br />
      <div className="flex-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input type="text" placeholder="Search for Assignment..." style={{ height: "35px" }} />
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <button className="btn btn-secondary custom-btn" style={{ height: "35px", marginRight: "1px", width: "35px" }} onClick={handleAddAssignment}>
            <i className="fas fa-plus"></i> +
          </button>
          <button className="btn btn-secondary custom-btn" style={{ width: "0.8cm", height: "35px", marginRight: '5px' }}>
            <b>⋮</b>
          </button>
        </div>
      </div>
      <div style={{ textAlign: "left" }}>
      </div>
      <hr />
      <ul className="list-group" style={{flex: '1'}}>
        <li className="list-group-item list-group-item-secondary custom-grey-bg">
          <div className="flex-container">
            <b>Assignments</b>
          </div>
        </li>
      </ul>
      <ul className="list-group" style={{flex: '1'}}>
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
                <span style={{ fontSize: "10px" }}>&nbsp;&nbsp;|&nbsp;&nbsp;{assignment.points}pts</span>
              </div>
              <div>
                <button
                  className="btn btn-secondary" style={{height: "35px", marginRight: '5px' }}
                  onClick={() => handleDeleteAssignment(assignment._id)}
                >
                  Delete
                </button>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {deleteAssignmentId && (
        <div className="delete-confirmation-dialog">
          <p>Are you sure you want to remove this assignment?</p>
          <button className="btn btn-secondary" onClick={handleConfirmDelete}>Yes</button>
          <button className="btn btn-secondary" onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default Assignments;
