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
      navigate('/'); // Redirect to user list
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={updateUser}>Update User</button>
    </div>
  );
}

export default UpdateUser;
