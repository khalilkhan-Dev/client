import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function GenreSeriesList() {
  const [genreSeriesList, setGenreSeriesList] = useState([]);

  useEffect(() => {
    fetchGenreSeries();
  }, []);

  const fetchGenreSeries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres-series');
      setGenreSeriesList(response.data);
    } catch (error) {
      console.error('Error fetching genre-series:', error);
    }
  };

  const deleteGenreSeries = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/genres-series/${id}`);
      fetchGenreSeries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting genre-series:', error);
    }
  };

  return (
    <div>
      <h2>Genre-Series Associations</h2>
      <Link to="/genres-series/create">
        <button>Add New Genre-Series</button>
      </Link>
      <ul>
        {genreSeriesList.map((association) => (
          <li key={association._id}>
            Genre ID: {association.genreId} - Series ID: {association.seriesId}
            <button onClick={() => deleteGenreSeries(association._id)}>Delete</button>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreSeriesList;
