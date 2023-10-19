import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './ModuleList.css';
import db from '../../Database';

function Modules() {
    const { courseId } = useParams();
    const modules = db.modules;
    const [expandedModules, setExpandedModules] = useState({}); // To track expanded modules

    const toggleModule = (index) => {
        setExpandedModules(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    return (
        <div>
            <div style={{ textAlign: 'left' }}>
                <button className="btn btn-secondary custom-btn">Collapse All</button>
                <button className="btn btn-secondary custom-btn">View Progress</button>
                <select className="btn btn-secondary custom-btn">
                    <option>Publish All</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faPlus} />&nbsp;&nbsp;Module
                </button>
                <button className="btn btn-secondary " style={{ width: '0.8cm' }}>
                    <b>⋮</b>
                </button>
            </div>
            <hr />
            <br />

            <ul className="list-group" style={{width: '600px'}}>
                {
                    modules
                        .filter(module => module.course === courseId)
                        .map((module, index) => (
                            <React.Fragment key={index}>
                                <li 
                                    className="list-group-item list-group-item-secondary custom-grey-bg"
                                    onClick={() => toggleModule(index)}  // Toggle visibility
                                >
                                    <div className="flex-container">
                                        {module.name}
                                        <div>
                                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
                                            &nbsp;&nbsp;&nbsp;
                                            {expandedModules[index] ? '-' : '+'}
                                            &nbsp;&nbsp;&nbsp;
                                            <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
                                        </div>
                                    </div>
                                </li>


                            {expandedModules[index] && module.lessons && module.lessons.map((lesson, lessonIndex) => (
                                    <li key={lessonIndex} className="list-group-item ms-3">
                                        <div className="flex-container">
                                            {lesson.name}
                                            <div>
                                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
                                                &nbsp;&nbsp;&nbsp;
                                                <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </React.Fragment>
                        ))
                }
            </ul>
        </div>
    );
}

export default Modules;
