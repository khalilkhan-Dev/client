import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <Link to="/create">Add New User</Link>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
            <button onClick={() => deleteUser(user._id)}>Delete</button>
            <Link to={`/update/${user._id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
