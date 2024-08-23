import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SeasonCreate() {
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/series');
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  const createSeason = async () => {
    try {
      await axios.post('http://localhost:5000/seasons', { seriesId, seasonNumber, title });
      navigate('/seasons');
    } catch (error) {
      console.error('Error creating season:', error);
    }
  };

  return (
    <div>
      <h2>Create New Season</h2>
      <input
        type="text"
        placeholder="Season Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Season Number"
        value={seasonNumber}
        onChange={(e) => setSeasonNumber(e.target.value)}
      />
      <select value={seriesId} onChange={(e) => setSeriesId(e.target.value)}>
        <option value="">Select Series</option>
        {series.map(s => (
          <option key={s._id} value={s._id}>{s.title}</option>
        ))}
      </select>
      <button onClick={createSeason}>Create Season</button>
    </div>
  );
}

export default SeasonCreate;
