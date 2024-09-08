import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  // Define fetchUser with useCallback to prevent unnecessary re-renders
  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      setName(response.data.username);
      setEmail(response.data.email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Add fetchUser to dependency array

  const updateUser = async () => {
    try {
      await axiosInstance.patch(`/users/${id}`, {
        username: name,
        email,
        password,
      });
      navigate('/users'); // Redirect to user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className='p-3'>
  <h2 className='my-3'>Update User</h2>
  
  <div className="row">
    <div className="col-md-3">
      <label className='fs-5' htmlFor="name">User Name</label>
    </div>
    <div className="col-md-9">
      <input
        className='w-50 p-2'
        name='name'
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      /> 
    </div>
  </div>

  <div className="row">
    <div className="col-md-3">
      <label className='fs-5' htmlFor="email">User Email</label>
    </div>
    <div className="col-md-9">
      <input
        className='w-50 p-2 my-3'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>
  
  <div className="row">
    <div className="col-md-3">
      <label className='fs-5' htmlFor="password">User Password</label>
    </div>
    <div className="col-md-9">
      <input
        className='w-50 p-2'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </div>

  <br />
  <button className='btn btn-primary my-3' onClick={updateUser}>Update User</button>
</div>

  );
}

export default UpdateUser;
