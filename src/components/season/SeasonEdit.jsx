import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';

function SeasonEdit() {
  const [season, setSeason] = useState(null);
  const [series, setSeries] = useState([]);
  const [seriesId, setSeriesId] = useState('');
  const [description, setDescription] = useState(''); // Changed from seasonNumber to description
  const [name, setName] = useState(''); // Changed from title to name
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSeason = async () => {
      try {
        const response = await axiosInstance.get(`/seasons/${id}`);
        setSeason(response.data);
        setName(response.data.name); // Changed from title to name
        setDescription(response.data.description); // Changed from seasonNumber to description
        setSeriesId(response.data.seriesId);
      } catch (error) {
        console.error('Error fetching season:', error);
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

    fetchSeason();
    fetchSeries();
  }, [id]);

  const updateSeason = async () => {
    try {
      await axiosInstance.patch(`/seasons/${id}`, { seriesId, description, name }); // Changed seasonNumber to description
      navigate('/seasons');
    } catch (error) {
      console.error('Error updating season:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='my-2'>Edit Season</h2>
      {season ? (
        <>
          <div className="row mb-3">
            <div className="col-md-3">
              <label className='fs-5' htmlFor="name">Season Title</label>
            </div>
            <div className="col-md-9">
              <input
                className='p-2 w-50'
                type="text"
                placeholder="Season Title"
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
                placeholder="Season Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3" 
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
                value={seriesId}
                onChange={(e) => setSeriesId(e.target.value)}
              >
                <option value="">Select Series</option>
                {series.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button className='btn btn-primary my-3' onClick={updateSeason}>Update Season</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SeasonEdit;
