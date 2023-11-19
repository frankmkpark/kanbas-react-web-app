import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: 'NodeJS Assignment',
    description: 'Create a NodeJS server with ExpressJS',
    due: '2021-10-10',
    completed: false,
    score: 0,
  });

  const URL = 'http://localhost:4000/a5/assignment';

  const fetchAssignment = async () => {
    try {
      const response = await axios.get(URL);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error fetching assignment:', error);
    }
  };

  const updateTitle = async () => {
    try {
      const response = await axios.get(`${URL}/title/${assignment.title}`);
      setAssignment(response.data);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div>
      <h3>Working With Objects</h3>
      
      <h4>Modifying Properties</h4>
      <input
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        value={assignment.title}
        className='form-control mb-2 w-75'
        type='text'
      />
      <button onClick={updateTitle} className='w-100 btn btn-primary mb-2'>
        Update Title to: {assignment.title}
      </button>

      <h4>Updating Score</h4>
      <input
        type='number'
        value={assignment.score}
        onChange={(e) => setAssignment({ ...assignment, score: parseInt(e.target.value, 10) })}
        className='form-control mb-2 w-75'
      />
      <a href={`${URL}/score/${assignment.score}`} className='btn btn-primary me-2'>
        Update Score
      </a>

      <h4>Updating Completed Status</h4>
      <input
        type='checkbox'
        checked={assignment.completed}
        onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })}
        className='form-check mb-2'
      />
      <a href={`${URL}/completed/${assignment.completed}`} className='btn btn-primary me-2'>
        Update Completed
      </a>

      <button onClick={fetchAssignment} className='w-100 btn btn-danger mb-2'>
        Fetch Assignment
      </button>
    </div>
  );
}

export default WorkingWithObjects;
