import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './ModuleList.css';
import db from '../../Database';

function Modules() {
    const { courseId } = useParams();
    const modules = db.modules;
    const [expandedModules, setExpandedModules] = useState({});

    const toggleModule = (index) => {
        setExpandedModules(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const customBtnStyle = { height: '35px' };
    const buttonDimensions = { width: '0.8cm', height: '35px' };
    const checkIconStyle = { color: '#00a600' };
    const ellipsisIconStyle = { color: '#787878' };

    return (
        <div>
            <div className="module-header">
                <button className="btn btn-light custom-btn" style={customBtnStyle}>Collapse All</button>
                <button className="btn btn-light custom-btn" style={{width: '4cm', ...customBtnStyle}}>View Progress</button>
                <select className="btn btn-light custom-btn" style={customBtnStyle}>
                    <option>Publish All</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                </select>
                <button className="btn btn-danger">
                    <FontAwesomeIcon icon={faPlus} />&nbsp;Module
                </button>
                <button className="btn btn-light custom-btn" style={buttonDimensions}>
                    <b>⋮</b>
                </button>
            </div>
            <hr />
            <br />

            <ul className="list-group module-list">
                {
                    modules
                        .filter(module => module.course === courseId)
                        .map((module, index) => (
                            <React.Fragment key={module._id}>
                        <li 
                            className="list-group-item list-group-item-light custom-grey-bg"
                            onClick={() => toggleModule(index)} 
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ flexGrow: 1 }}>{module.name}</div>
                                <div>
                                    <FontAwesomeIcon icon={faCheckCircle} style={checkIconStyle} />
                                    &nbsp;&nbsp;
                                    {expandedModules[index] ? '-' : '+'}
                                    &nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faEllipsisV} style={ellipsisIconStyle} />
                                </div>
                            </div>
                        </li>
                                {expandedModules[index] && module.lessons && module.lessons.map((lesson) => (
                                    <li key={lesson._id} className="list-group-item ms-3">
                                    <div className="flex-container">
                                        {lesson.name}
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