import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
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
      const response = await axiosInstance.get('/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchSeries = async () => {
    try {
      const response = await axiosInstance.get('/series');
      setSeries(response.data);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const createGenreSeries = async () => {
    try {
      await axiosInstance.post('/genres-series', { genreId, seriesId });
      navigate('/genres-series'); // Redirect to list page
    } catch (error) {
      console.error('Error creating genre-series:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-5 mt-3'>Create Genre-Series Association</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="genreSelect">Select Genre</label>
        </div>
        <div className="col-md-9">
          <select
            id="genreSelect"
            className='form-select w-50'
            value={genreId}
            onChange={(e) => setGenreId(e.target.value)}
          >
            <option value="">Select Genre</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="seriesSelect">Select Series</label>
        </div>
        <div className="col-md-9">
          <select
            id="seriesSelect"
            className='form-select w-50'
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
          >
            <option value="">Select Series</option>
            {series.map((serie) => (
              <option key={serie._id} value={serie._id}>{serie.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button className='btn btn-primary' onClick={createGenreSeries}>Create Association</button>
    </div>
  );
}

export default GenreSeriesCreate;
