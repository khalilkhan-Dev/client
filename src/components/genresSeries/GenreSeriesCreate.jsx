import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GenreSeriesCreate() {
  const [genreId, setGenreId] = useState('');
  const [seriesId, setSeriesId] = useState('');
  const [genres, setGenres] = useState([]);
  const [series, setSeries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
    fetchSeries();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
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

  const createGenreSeries = async () => {
    try {
      await axios.post('http://localhost:5000/genres-series', { genreId, seriesId });
      navigate('/genres-series'); // Redirect to list page
    } catch (error) {
      console.error('Error creating genre-series:', error);
    }
  };

  return (
    <div>
      <h2>Create Genre-Series Association</h2>
      <select value={genreId} onChange={(e) => setGenreId(e.target.value)}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>{genre.name}</option>
        ))}
      </select>
      <select value={seriesId} onChange={(e) => setSeriesId(e.target.value)}>
        <option value="">Select Series</option>
        {series.map((serie) => (
          <option key={serie._id} value={serie._id}>{serie.name}</option>
        ))}
      </select>
      <button onClick={createGenreSeries}>Create Association</button>
    </div>
  );
}

export default GenreSeriesCreate;
