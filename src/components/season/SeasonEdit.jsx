import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SeasonEdit() {
  const [season, setSeason] = useState(null);
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [seasonNumber, setSeasonNumber] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/seasons/${id}`);
        setSeason(response.data);
        setTitle(response.data.title);
        setSeasonNumber(response.data.seasonNumber);
        setSeriesId(response.data.seriesId);
      } catch (error) {
        console.error('Error fetching season:', error);
      }
    };

    const fetchSeries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/series');
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeason();
    fetchSeries();
  }, [id]);

  const updateSeason = async () => {
    try {
      await axios.patch(`http://localhost:5000/seasons/${id}`, { seriesId, seasonNumber, title });
      navigate('/seasons');
    } catch (error) {
      console.error('Error updating season:', error);
    }
  };

  return (
    <div>
      <h2>Edit Season</h2>
      {season ? (
        <>
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
          <button onClick={updateSeason}>Update Season</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SeasonEdit;
