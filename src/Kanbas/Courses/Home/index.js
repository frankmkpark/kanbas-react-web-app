
import React from 'react';
import ModuleList from "../Modules/ModuleList";
import CourseNavigation from '../CourseNavigation';
function Home() {
    return (
        <div className="row">
            <div className="col-8">
                <h2>Home</h2>
                <ModuleList />
            </div>
            <div className="col-2">
                <div style={{ marginTop: '110px' }}>
                    <br />
                    <button className="btn btn-light btn-sm btn-consistent-width">Import Existing Content</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">Import From Commons</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">Choose Home Page</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">View Course Stream</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">New Announcement</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">New Analytics</button><br />
                    <button className="btn btn-light btn-sm btn-consistent-width">View Course Notifications</button><br />
                    <br />
                    To do
                    <hr />
                    <div className="float-sm-end smaller-text">
                        <a href="#" style={{ color: 'red' }}>Grade A1 - ENV + HTML </a>
                    </div>
                    <br />
                    Coming Up
                    <hr />
                    <div className="float-sm-end smaller-text">
                        <a href="#" style={{ color: 'red' }}>View Calendar</a>
                    </div>
                    <hr />
                    <div className="item">
                        Lecture<br />
                        CS4550.23123.23123<br />
                        Sep 5 at 11:45am<br />
                    </div>
                    <br />
                    <div className="item">
                        Lecture<br />
                        CS4550.23123.23123<br />
                        Sep 5 at 11:45am<br />
                    </div>
                    <br />
                    <div className="item">
                        Lecture<br />
                        CS5610.23211.32313<br />
                        Sep 6 at 12:45pm<br />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
