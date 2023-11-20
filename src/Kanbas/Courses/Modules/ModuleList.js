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
  // const courseId = 'RS101'
  const dispatch = useDispatch();
  const modules = useSelector(state => state.modulesReducer.modules);
  const [expandedModules, setExpandedModules] = useState({});
  const [module, setModule] = useState({
    name: "New Module",
    description: "New Description",
    course: courseId,
  });

 console.log(modules);
 console.log(courseId);
 console.log(module);

  // Function to handle adding or updating a module
  const handleAddOrUpdateModule = () => {
    const newModule = {
      name: module.name,
      description: module.description,
      course: courseId
    };
  
    if (module._id) {
      // Update existing module
      updateModule(module)
        .then(updatedModule => dispatch(updateModuleRedux(updatedModule)))
        .catch(error => console.error("Error updating module:", error));
    } else {
      // Add new module
      createModule(courseId, newModule)
        .then((createdModule) => dispatch(addModuleRedux(createdModule)))
        .catch((error) => console.error("Error adding module:", error));
    }
  };

  const editModule = (moduleId) => {
    const selectedModule = modules.find((m) => m._id.$oid === moduleId);
    if (selectedModule) {
      setModule(selectedModule);
    }
  };

  const handleDeleteModule = (moduleId) => {
    deleteModule(moduleId)
      .then(() => dispatch(deleteModuleRedux(moduleId)))
      .catch(error => console.error("Error deleting module:", error));
  };
  
  const toggleModule = (index) => {
    setExpandedModules((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)))
      .catch((error) => console.error("Error fetching modules:", error));
  }, [courseId, dispatch]);

  return (
    <div>
      {/* Header and buttons */}
      <div className="module-header">
        <button className="btn btn-light custom-btn" style={{ height: '35px' }}>
          Collapse All
        </button>
        <button className="btn btn-light custom-btn" style={{ width: '4cm', height: '35px' }}>
          View Progress
        </button>
        <select className="btn btn-light custom-btn" style={{ height: '35px' }}>
          <option>Publish All</option>
          <option>Option 2</option>
          <option>Option 3</option>
        </select>
        <button className="btn btn-danger" onClick={handleAddOrUpdateModule}>
          <FontAwesomeIcon icon={faPlus} />&nbsp;Module
        </button>
      </div>
      <hr />
      <br />

      {/* Module input fields */}
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
            <button className="btn btn-secondary" onClick={handleAddOrUpdateModule}>
              {module._id ? "Update" : "Add"}
            </button>
            {module._id && (
              <button className="btn btn-danger" onClick={() => handleDeleteModule(module._id)}>
                Delete
              </button>
            )}
          </div>
        </li>

        {modules
          .filter((m) => m.course === courseId.toString())
          .map((m, index) => (
            <React.Fragment key={m._id}>
              <li
                className="list-group-item list-group-item-light custom-grey-bg"
                onClick={() => toggleModule(index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flexGrow: 1 }}>{m.name}</div>
                  <div>
                    <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#00a600' }} />
                    &nbsp;&nbsp;
                    {expandedModules[index] ? '-' : '+'}
                    &nbsp;&nbsp;
                    <FontAwesomeIcon icon={faEllipsisV} style={{ color: '#787878' }} />
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
