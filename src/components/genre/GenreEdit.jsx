import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

function GenreEdit() {
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenre = async () => {
      try {
        const response = await axiosInstance.get(`/genres/${id}`);
        setName(response.data.name);
      } catch (error) {
        console.error('Error fetching genre:', error);
      }
    };

    fetchGenre();
  }, [id]); // Include 'id' as a dependency

  const updateGenre = async () => {
    try {
      await axiosInstance.patch(`/genres/${id}`, { name });
      navigate('/genres'); // Redirect to genre list page
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  return (
    <div className='p-3'>
    <h2 className='mb-5 mt-3'>Update Genre</h2>
    <label className='me-5 fs-4' htmlFor="genre">Update Genre</label>
      <input
        className='p-2 w-25 '
        name='genre'
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button className='btn btn-primary my-3' onClick={updateGenre}>Update Genre</button>
    </div>
  );
}

export default GenreEdit;
