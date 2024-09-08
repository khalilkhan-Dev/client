import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function SeriesCreate() {
  const [name, setName] = useState(''); // Changed title to name
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axiosInstance.get('/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const createSeries = async () => {
    try {
      await axiosInstance.post('/series', { name, description, releaseDate, genreIds }); // Changed title to name
      navigate('/series'); // Redirect to list page
    } catch (error) {
      console.error('Error creating series:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-5 mt-3'>Create Series</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="name">Title</label>
        </div>
        <div className="col-md-9">
          <input
            className='p-2 w-50'
            name='name'
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)} // Changed title to name
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="description">Description</label>
        </div>
        <div className="col-md-9">
          <textarea
            className='p-2 w-50'
            name='description'
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="releaseDate">Release Date</label>
        </div>
        <div className="col-md-9">
          <input
            className='p-2 w-50'
            name='releaseDate'
            type="date"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="genres">Genres</label>
        </div>
        <div className="col-md-9">
          <select
            className='p-2 w-50'
            name='genres'
            value={genreIds}
            onChange={(e) => setGenreIds(Array.from(e.target.selectedOptions, option => option.value))}
          >
            <option value="">Select Genres</option>
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>

      <button className='btn btn-primary my-3' onClick={createSeries}>Create Series</button>
    </div>
  );
}

export default SeriesCreate;
