import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GenreCreate() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const createGenre = async () => {
    try {
      await axios.post('http://localhost:5000/genres', { name });
      setName('');
      navigate('/genres'); // Redirect to genre list page
    } catch (error) {
      console.error('Error creating genre:', error);
    }
  };

  return (
    <div>
      <h2>Create New Genre</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createGenre}>Create Genre</button>
    </div>
  );
}

export default GenreCreate;
