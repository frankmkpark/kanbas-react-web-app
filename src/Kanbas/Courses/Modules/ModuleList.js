import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheckCircle, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import './ModuleList.css';
import { createModule, deleteModule, updateModule, findModulesForCourse } from "./client";
import { addModule as addModuleRedux, deleteModule as deleteModuleRedux, updateModule as updateModuleRedux, setModules } from "./modulesReducer";

function Modules() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const modules = useSelector(state => state.modulesReducer.modules);

  const [expandedModules, setExpandedModules] = useState({});
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId,
  });

  const handleAddModule = () => {
    createModule(courseId, module)
      .then(newModule => dispatch(addModuleRedux(newModule)))
      .catch(error => console.error("Error adding module:", error));
  };

  const editModule = (moduleId) => {
    const selectedModule = modules.find((m) => m._id === moduleId);
    if (selectedModule) {
      setModule(selectedModule);
    }
  };

  const handleDeleteModule = (moduleId) => {
    deleteModule(moduleId)
      .then(() => dispatch(deleteModuleRedux(moduleId)))
      .catch(error => console.error("Error deleting module:", error));
  };

  const handleUpdateModule = () => {
    updateModule(module)
      .then(updatedModule => dispatch(updateModuleRedux(updatedModule)))
      .catch(error => console.error("Error updating module:", error));
  };

  const toggleModule = (index) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    console.log("courseId:", courseId);
    findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)))
      .catch(error => console.error("Error fetching modules:", error));
  }, [courseId, dispatch]);

  const customBtnStyle = { height: '35px' };
  // const buttonDimensions = { width: '0.8cm', height: '35px' };
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
        <button className="btn btn-danger" onClick={handleAddModule}>
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
                <button className="btn btn-secondary" onClick={handleUpdateModule}>
                  Update
                </button>
                <button className="btn btn-danger" onClick={() => handleDeleteModule(module._id)}>
                  Delete
                </button>
              </>
            ) : (
              <button className="btn btn-secondary" onClick={handleAddModule}>
                Add
              </button>
            )}
          </div>
        </li>
        {modules
          .filter((m) => m.course === courseId)
          .map((m, index) => (
            <React.Fragment key={m._id}> {/* Added key prop */}
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
