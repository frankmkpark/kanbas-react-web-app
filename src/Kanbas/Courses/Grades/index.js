import db from "../../Database";
import { useParams } from "react-router-dom";
import './index.css';

function Grades() {
    const { courseId } = useParams();
    const assignments = db.assignments.filter((assignment) => assignment.course === courseId);
    const enrollments = db.enrollments.filter((enrollment) => enrollment.course === courseId);

    return (
        <div>
            <h2>Grades</h2><br/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ color: 'red' }}>
                    <a href="#">Gradebooks</a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="btn-group">
                        <button className="btn btn-light btn-sm" type="button" aria-expanded="false">
                            <i className="fas fa-upload"></i> Import
                        </button>
                        <button className="btn btn-light btn-sm dropdown-toggle" type="button"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-download"></i> Export
                        </button>
                        <button className="btn btn-light btn-sm" type="button">
                            <i className="fas fa-cog"></i>
                        </button>
                    </div>
                    <span className="tool-icon"></span>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-6">
                    <h6><b>Students Name</b></h6>
                    <form id="text-fields-students">
                        <input id="text-fields-studentname" placeholder="Search Students"
                               style={{ width: "100%" }} /><br />
                    </form>
                </div>
                <div className="col-md-6">
                    <h6><b>Assignments Name</b></h6>
                    <form id="text-fields-assignments">
                        <input id="text-fields-assignment" placeholder="Search Assignments"
                               style={{ width: "100%" }} /><br />
                    </form>
                </div>
            </div>
            <br />

            <div className="row">
                <button className="btn btn-light btn-sm" type="button" style={{ width: "20%" }}>
                    <i className="fas fa-filter"></i> Apply filter
                </button>
            </div><br />

            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            {assignments.map((assignment) => (
                                <th key={assignment._id} className="centered-header">
                                    {assignment.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((enrollment, index) => {
                            const user = db.users.find((user) => user._id === enrollment.user);
                            const rowStyle = (index % 2 === 0) ? { backgroundColor: 'lightgray' } : {};
                            return (
                                <tr key={enrollment._id} style={rowStyle}>
                                    <td style={{color: 'red'}}>{user.firstName} {user.lastName}</td>
                                    {assignments.map((assignment) => {
                                        const grade = db.grades.find(
                                            (grade) => grade.student === enrollment.user && grade.assignment === assignment._id
                                        );
                                        return (
                                            <td key={assignment._id} className="grade-cell">
                                                {grade?.grade || "0"}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Grades;
