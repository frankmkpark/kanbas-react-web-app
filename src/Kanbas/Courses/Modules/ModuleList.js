import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './ModuleList.css';
import db from '../../Database';

function Modules() {
  const { courseId } = useParams();
  const [modules, setModules] = useState(db.modules);
  const [expandedModules, setExpandedModules] = useState({});
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId,
  });

  const addModule = () => {
    const newModule = { ...module, _id: new Date().getTime().toString() };
    setModules([...modules, newModule]);
  };

  const deleteModule = (moduleId) => {
    setModules(modules.filter((m) => m._id !== moduleId));
  };

  const editModule = (moduleId) => {
    const selectedModule = modules.find((m) => m._id === moduleId);
    if (selectedModule) {
      setModule(selectedModule);
    }
  };

  const updateModule = () => {
    setModules((prevModules) =>
      prevModules.map((m) => {
        if (m._id === module._id) {
          return module;
        } else {
          return m;
        }
      })
    );
    setModule({
      name: "New Module",
      description: "New Description",
      course: courseId,
    });
  };

  const toggleModule = (index) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const customBtnStyle = { height: '35px' };
  const buttonDimensions = { width: '0.8cm', height: '35px' };
  const checkIconStyle = { color: '#00a600' };
  const ellipsisIconStyle = { color: '#787878' };

  return (
    <div>
      <div className="module-header">
        <button className="btn btn-light custom-btn" style={customBtnStyle}>
          Collapse All
        </button>
        <button className="btn btn-light custom-btn" style={{ width: '4cm', ...customBtnStyle }}>
          View Progress
        </button>
        <select className="btn btn-light custom-btn" style={customBtnStyle}>
          <option>Publish All</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <button className="btn btn-danger" onClick={addModule}>
          <FontAwesomeIcon icon={faPlus} />&nbsp;Module
        </button>
      </div>
      <hr />
      <br />

      <ul className="list-group module-list">
        <li className="list-group-item">
          <div className="input-container">
            <input
              className="input-field"
              value={module.name}
              onChange={(e) => setModule({ ...module, name: e.target.value })}
              placeholder="New Module"
            />
            <textarea 
              className="input-field"
              value={module.description}
              onChange={(e) => setModule({ ...module, description: e.target.value })}
              placeholder="New Description"
            />
            {module._id ? (
              <>
                <button className="btn btn-secondary" onClick={updateModule}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => deleteModule(module._id)}>
                  Delete
                </button>
              </>
            ) : (
              <button className="btn btn-secondary" onClick={addModule}>
                Add
              </button>
            )}
          </div>
        </li>
        {modules
          .filter((m) => m.course === courseId)
          .map((m, index) => (
            <React.Fragment key={m._id}>
              <li
                className="list-group-item list-group-item-light custom-grey-bg"
                onClick={() => toggleModule(index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>{m.name}</div>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} style={checkIconStyle} />
                    &nbsp;&nbsp;
                    {expandedModules[index] ? '-' : '+'}
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faEllipsisV} style={ellipsisIconStyle} />
                  </div>
                  <button className="btn btn-light" onClick={() => editModule(m._id)}>
                    Edit
                  </button>
                </div>
              </li>
              {expandedModules[index] && m.lessons && m.lessons.map((lesson) => (
                <li key={lesson._id} className="list-group-item ms-3">
                  <div className="flex-container">{lesson.name}</div>
                </li>
              ))}
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
}

export default Modules;
