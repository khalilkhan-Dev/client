import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

function SeriesEdit() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genreIds, setGenreIds] = useState([]);
  const [genres, setGenres] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Define fetchSeries inside useEffect
    const fetchSeries = async () => {
      try {
        const response = await axiosInstance.get(`/series/${id}`);
        setName(response.data.name);
        setDescription(response.data.description);
        setReleaseDate(response.data.releaseDate);
        setGenreIds(response.data.genreIds);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    // Define fetchGenres inside useEffect
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get('/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchSeries();
    fetchGenres();
  }, [id]); // Dependency array includes id

  const updateSeries = async () => {
    try {
      await axiosInstance.patch(`/series/${id}`, { name, description, releaseDate, genreIds });
      navigate('/series'); // Redirect to list page
    } catch (error) {
      console.error('Error updating series:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-5 mt-3'>Edit Series</h2>
    
      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="name">Name</label> 
        </div>
        <div className="col-md-9">
          <input
            className='p-2 w-50'
            name='name'
            type="text"
            placeholder="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
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
            multiple
            value={genreIds}
            onChange={(e) => setGenreIds(Array.from(e.target.selectedOptions, option => option.value))}
          >
            {genres.map((genre) => (
              <option key={genre._id} value={genre._id}>{genre.name}</option>
            ))}
          </select>
        </div>
      </div>
    
      <button className='btn btn-primary my-3' onClick={updateSeries}>Update Series</button>
    </div>
  );
}

export default SeriesEdit;
