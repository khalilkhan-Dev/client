import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import './user.css';

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
    <div className='p-3'>
      <h2 className='my-3'>Users</h2>
      <Link to="/create"><button className='btn btn-primary mb-3'>Add New User</button></Link>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td><Link className='text-decoration-none text-danger' onClick={() => deleteUser(user._id)}>Delete</Link></td>
              <td><Link className='text-decoration-none text-danger' to={`/update/${user._id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
