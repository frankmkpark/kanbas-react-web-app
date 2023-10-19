import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import db from "../../../Database";

function AssignmentEditor() {
  const { assignmentId, courseId } = useParams();
  const assignment = db.assignments.find(
    (assignment) => assignment._id === assignmentId
  );

  const navigate = useNavigate();
  const handleSave = () => {
    console.log("Actually saving assignment TBD in later assignments");
    navigate(`/Kanbas/Courses/${courseId}/Assignments`);
  };
  
  return (
    <div style={{marginTop: '100px'}}>
      <hr />
      Assignment Name<br />
      <input value={assignment.title} className="form-control mb-2" />
      <hr />
      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Link 
            to={`/Kanbas/Courses/${courseId}/Assignments`}
            className="btn btn-secondary mr-2" 
            style={{color:"lightgray"}}
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
