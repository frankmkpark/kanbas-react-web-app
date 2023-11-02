import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  updateAssignment,
  addAssignment, 
} from "../assignmentsReducer";

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  const dispatch = useDispatch();
  const assignments = useSelector((state) =>
    state.assignmentsReducer.assignments
  );
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  const navigate = useNavigate();
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPoints, setEditedPoints] = useState(0);
  const [editedAssignDate, setEditedAssignDate] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [editedAvailableFrom, setEditedAvailableFrom] = useState("");
  const [editedUntil, setEditedUntil] = useState("");

  useEffect(() => {
    if (assignment) {
      setEditedTitle(assignment.title);
      setEditedDescription(assignment.description);
      setEditedPoints(assignment.points);
      setEditedAssignDate(assignment.assignDate);
      setEditedDueDate(assignment.due);
      setEditedAvailableFrom(assignment.availableFrom);
      setEditedUntil(assignment.until);
    }
  }, [assignment]);

  const handleSave = () => {
    const updatedAssignment = {
      _id: assignmentId,
      title: editedTitle,
      description: editedDescription,
      points: editedPoints,
      assignDate: editedAssignDate,
      due: editedDueDate,
      availableFrom: editedAvailableFrom,
      until: editedUntil,
      course: courseId,
    };

    if (assignment) {
      dispatch(updateAssignment(updatedAssignment));
    } else {
      dispatch(addAssignment(updatedAssignment));
    }

    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <hr />
      Assignment Name<br />
      <input
        value={editedTitle}
        className="form-control mb-2"
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      New Assignment Description<br />
      <textarea
        value={editedDescription}
        className="form-control mb-2"
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      Points (out of 100)<br />
      <input
        type="number"
        value={editedPoints}
        className="form-control mb-2"
        onChange={(e) => setEditedPoints(parseInt(e.target.value, 10))}
      />
      <br />
      <hr />
      <b>Assign Date</b>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 1 }}>
          Due Date<br />
          <input
            type="date"
            value={editedDueDate}
            className="form-control mb-2"
            onChange={(e) => setEditedDueDate(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 0.5 }}>
          Available From<br />
          <input
            type="date"
            value={editedAvailableFrom}
            className="form-control mb-2"
            onChange={(e) => setEditedAvailableFrom(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div style={{ flex: 0.5 }}>
          Until<br />
          <input
            type="date"
            value={editedUntil}
            className="form-control mb-2"
            onChange={(e) => setEditedUntil(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link
          to={`/Kanbas/Courses/${courseId}/Assignments`}
          className="btn btn-secondary mr-2"
          style={{ color: "lightgray" }}
        >
          Cancel
        </Link>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
      <div>
        <hr />
      </div>
    </div>
  );
}

export default AssignmentEditor;
