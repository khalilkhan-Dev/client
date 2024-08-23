import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SeasonsList() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axios.get('http://localhost:5000/seasons');
        setSeasons(response.data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };

    fetchSeasons();
  }, []);

  return (
    <div>
      <h2>Seasons List</h2>
      <Link to="/seasons/create">Create New Season</Link>
      <ul>
        {seasons.map(season => (
          <li key={season._id}>
            {season.title} (Season {season.seasonNumber}) - 
            <Link to={`/seasons/edit/${season._id}`}>Edit</Link> - 
            <button onClick={() => deleteSeason(season._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );

  async function deleteSeason(id) {
    try {
      await axios.delete(`http://localhost:5000/seasons/${id}`);
      setSeasons(seasons.filter(season => season._id !== id));
    } catch (error) {
      console.error('Error deleting season:', error);
    }
  }
}

export default SeasonsList;
