import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function GenreEdit() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/genres/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching genre:', error);
      }
    };

    fetchGenre();
  }, [id]); // Include 'id' as a dependency

  const updateGenre = async () => {
    try {
      await axios.patch(`http://localhost:5000/genres/${id}`, { name });
      navigate('/genres'); // Redirect to genre list page
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  return (
    <div>
      <h2>Update Genre</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={updateGenre}>Update Genre</button>
    </div>
  );
}

export default GenreEdit;
