import React, { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function GenreCreate() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const createGenre = async () => {
    try {
      await axiosInstance.post('/genres', { name });
      setName('');
      navigate('/genres'); // Redirect to genre list page
    } catch (error) {
      console.error('Error creating genre:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-5 mt-3'>Create New Genre</h2>
      <label className='me-5 fs-4' htmlFor="genre">Genre Name</label>
      <input
      className='p-2 w-25 '
        type="text"
        placeholder="Name"
        name='genre'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button className='btn btn-primary my-3' onClick={createGenre}>Create Genre</button>
    </div>
  );
}

export default GenreCreate;
