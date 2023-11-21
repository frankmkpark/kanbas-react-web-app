import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import db from "../../Database";
import { BiPlus, BiDotsVertical, BiCheckCircle } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
    addModule,
    deleteModule,
    updateModule,
    setModule,
    setModules,
} from "./modulesReducer";
import { findModulesForCourse, createModule } from "./client";
import * as client from "./client";
function ModuleList() {
    const { courseId } = useParams();
    const buttonGroupStyle = {
        marginRight: '-5px',
    };
    useEffect(() => {
        findModulesForCourse(courseId)
            .then((modules) =>
                dispatch(setModules(modules))
            );
    }, [courseId]);
    const handleAddModule = () => {
        createModule(courseId, module).then((module) => {
            dispatch(addModule(module));
        });
    };

    const handleDeleteModule = (moduleId) => {
        client.deleteModule(moduleId).then((status) => {
            dispatch(deleteModule(moduleId));
        });
    };

    const handleUpdateModule = async () => {
        const status = await client.updateModule(module);
        dispatch(updateModule(module));
    };
    const modules = useSelector((state) => state.modulesReducer.modules);
    const module = useSelector((state) => state.modulesReducer.module);
    const dispatch = useDispatch();
    return (
        <div style={{ marginRight: '20px' }}>
            <div className="btn-group" style={buttonGroupStyle}>
                <button className="btn btn-light btn-sm">Collapse All</button>
                <button className="btn btn-light btn-sm">View Progress</button>

                <div className="dropdown">
                    <button className="btn btn-light btn-sm dropdown-toggle" type="button"
                        data-bs-toggle="dropdown" aria-expanded="false"> <BiCheckCircle style={{ color: 'green' }} />
                        Publish All
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                    </ul>
                </div>

                <button className="btn btn-danger btn-sm"><BiPlus />Module</button>
                <button className="btn btn-light btn-sm"><BiDotsVertical /></button>
            </div>
            <hr />
            <ul className="list-group">
                <li className="list-group-item">

                    <input
                        value={module.name}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, name: e.target.value }))
                        } />
                    <button
                        onClick={() => dispatch(updateModule(module))}>
                        Update
                    </button>

                    <button
                        onClick={handleAddModule}>
                        Add
                    </button>
                    <br />
                    <textarea
                        value={module.description}
                        onChange={(e) =>
                            dispatch(setModule({ ...module, description: e.target.value }))
                        } />

                </li>
                {
                    modules
                        .filter((module) => module.course === courseId)
                        .map((module, index) => (
                            <li key={index} className="list-group-item list-group-item-secondary" style={{ marginBottom: "40px" }
                            }>
                                <button
                                    onClick={() => dispatch(setModule(module))}>
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteModule(module._id)}
                                >
                                    Delete
                                </button>
                                <h4>{module.name}</h4>
                                <p>{module.description}</p>
                            </li>

                        ))
                }
            </ul>

        </div >
    );
}
export default ModuleList;