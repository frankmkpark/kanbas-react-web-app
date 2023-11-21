import React, { useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import db from "../../Database";
import "./index.css";
import { BiPlus, BiCheckCircle, BiDotsVertical } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { setAssignment, deleteAssignment } from './assignmentsReducer';
function Assignments() {
    const { courseId } = useParams();
    // const assignments = db.assignments;
    const navigate = useNavigate();

    const assignments = useSelector((state) => state.assignmentsReducer.assignments);
    const dispatch = useDispatch();
    const [deleteAssignmentId, setDeleteAssignmentId] = useState(null);


    const courseAssignments = assignments.filter(
        (assignment) => assignment.course === courseId);

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
        <div className="assignments">
            <h2>Assignments for course {courseId}</h2>
            <div>
                <input type="text" id="myInput" placeholder="Search for Assignment"></input>


                {/* <div class="float-sm-end"> */}
                <div class="btn-group" style={{ marginRight: '-5px' }}>
                    <button class="btn btn-light btn-sm"><BiPlus />Group</button>
                    <button class="btn btn-danger btn-sm" onClick={handleAddAssignment}><BiPlus />Assignment</button>
                    <button class="btn btn-light btn-sm"><BiDotsVertical /></button>

                </div>

                <hr />
                <div class="list-group mb-4">
                    <a href="edit.html" class="list-group-item list-group-item-secondary"><BiDotsVertical /><BiDotsVertical />
                        Assignments
                        <div class="float-sm-end">
                            <span class="percentage">40% of Total</span>
                            <span class="icon"><BiPlus /></span>
                            <span class="icon"><BiDotsVertical /></span>
                        </div>
                    </a>
                    <div className="list-group">
                        {courseAssignments.map((assignment) => (
                            <li className="list-group-item" key={assignment._id}>
                                <div className="flex-container">
                                    <div style={{ flex: 1 }}>
                                        <Link to={`/Kanbas/Courses/${courseId}/Assignments/${assignment._id}`} style={{ color: "black" }}>
                                            <b>{assignment.title}</b>
                                        </Link>
                                        <br />
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-secondary" style={{ height: "35px", marginRight: '5px' }}
                                            onClick={() => handleDeleteAssignment(assignment._id)}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            {deleteAssignmentId && (
                <div className="delete-confirmation-dialog">
                    <p>Are you sure you want to remove this assignment?</p>
                    <button className="btn btn-secondary" onClick={handleConfirmDelete}>Yes</button>
                    <button className="btn btn-secondary" onClick={handleCancelDelete}>No</button>
                </div>
            )}
        </div >
    );
}
export default Assignments;