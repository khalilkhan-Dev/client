import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function SeasonCreate() {
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [description, setDescription] = useState(''); // Changed from seasonNumber to description
  const [name, setName] = useState(''); // Changed from title to name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axiosInstance.get('/series');
        setSeries(response.data);
      } catch (error) {
        console.error('Error fetching series:', error);
      }
    };

    fetchSeries();
  }, []);

  const createSeason = async () => {
    try {
      await axiosInstance.post('/seasons', { seriesId, description, name }); // Changed seasonNumber to description
      navigate('/seasons');
    } catch (error) {
      console.error('Error creating season:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-5 mt-3'>Create New Season</h2>
    
      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="name">Season Title</label>
        </div>
        <div className="col-md-9">
          <input
            className='p-2 w-50'
            name='name'
            type="text"
            placeholder="Season Title" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
      </div>
    
      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="description">Description</label> {/* Updated label */}
        </div>
        <div className="col-md-9">
          <textarea
            className='p-2 w-50'
            name='description'
            placeholder="Season Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3" // Changed input type to textarea for description
          />
        </div>
      </div>
    
      <div className="row mb-3">
        <div className="col-md-3">
          <label className='fs-5' htmlFor="seriesSelect">Select Series</label>
        </div>
        <div className="col-md-9">
          <select
            className='p-2 w-50'
            name='seriesSelect'
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
          >
            <option value="">Select Series</option>
            {series.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
    
      <button className='btn btn-primary my-3' onClick={createSeason}>Create Season</button>
    </div>
  );
}

export default SeasonCreate;
