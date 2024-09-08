import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      await axiosInstance.post('/users/registration', {
        username: name,
        email,
        password,
      });
      navigate('/users'); // Redirect to user list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='my-3'>Create New User</h2>
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
        <di className="col-md-3 d-flex align-items-center">
        <label className='fs-5' htmlFor="name">User Email</label>
        </di>

        <div className="col-md-9">
        <input
        className='w-50  p-2 my-3'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-3">
        <label className='fs-5' htmlFor="name">User Password</label>
        </div>
        <div className="col-md-9">
        <input
        className='w-50  p-2'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
        </div>
      </div>

      
      

      
      <br />
      <button className='btn btn-primary my-3' onClick={createUser}>Create User</button>
    </div>
  );
}

export default CreateUser;
