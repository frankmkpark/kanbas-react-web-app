import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", role: "USER" });

  const createUser = async () => {
    try {
      console.log('Creating user:', user); 
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
      
      setUser({ username: "", password: "", role: "USER", firstName: "", lastName: "" });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  // const selectUser = async (user) => {
  //   try {
  //     const u = await client.findUserById(user._id);
  //     setUser(u);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const selectUser = async (selectedUser) => {
    try {
      
      if (selectedUser && selectedUser._id) {
        const u = await client.findUserById(selectedUser._id);
        setUser({ ...u });
      } else {
        console.error("Invalid user or missing ID");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) => (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    const users = await client.findAllUsers();
    setUsers(users);
  };

  const deleteUser = async (user) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <div>
      <h1>User List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
          <tr>
            <td>
              <input 
                placeholder="Username"
                value={user.username} 
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </td>
            <td>
              <input
                placeholder="Password" 
                value={user.password} 
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </td>
            <td>
              <input 
                placeholder="FirstName"
                value={user.firstName} 
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
              />
            </td>
            <td>
              <input 
                placeholder="LastName"
                value={user.lastName} 
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </td>
            <td>
              <select 
                value={user.role} 
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
                <option value="FACULTY">Faculty</option>
                <option value="STUDENT">Student</option>
              </select>
            </td>
            <td>
              <BsFillCheckCircleFill 
                onClick={updateUser}
                className="me-2 text-success fs-1"
              />
              <BsPlusCircleFill onClick={createUser} />
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>
                <button className="btn btn-warning me-2">
                  <BsPencil onClick={() => selectUser(user)} />
                </button>
                <button className="btn btn-warning me-2">
                  <BsTrash3Fill onClick={() => deleteUser(user)}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
