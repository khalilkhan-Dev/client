import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SeriesList() {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/series');
      setSeriesList(response.data);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const deleteSeries = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/series/${id}`);
      fetchSeries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting series:', error);
    }
  };

  return (
    <div>
      <h2>Series List</h2>
      <Link to="/series/create">
        <button>Add New Series</button>
      </Link>
      <ul>
        {seriesList.map((series) => (
          <li key={series._id}>
            <strong>Title:</strong> {series.title} - <strong>Description:</strong> {series.description}
            <button onClick={() => deleteSeries(series._id)}>Delete</button>
            <Link to={`/series/edit/${series._id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeriesList;
