import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function GenreSeriesList() {
  const [genreSeriesList, setGenreSeriesList] = useState([]);

  useEffect(() => {
    fetchGenreSeries();
  }, []);

  const fetchGenreSeries = async () => {
    try {
      const response = await axiosInstance.get('/genres-series');
      setGenreSeriesList(response.data);
    } catch (error) {
      console.error('Error fetching genre-series:', error);
    }
  };

  const deleteGenreSeries = async (id) => {
    try {
      await axiosInstance.delete(`/genres-series/${id}`);
      fetchGenreSeries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting genre-series:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mb-4'>Genre-Series Associations</h2>
      <Link to="/genres-series/create">
        <button className='btn btn-primary mb-3'>Add New Genre-Series</button>
      </Link>
      <table className='table table-bordered table-striped'>
        <thead>
          <tr>
            <th>Genre ID</th>
            <th>Series ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {genreSeriesList.map((association) => (
            <tr key={association._id}>
              <td>{association.genreId}</td>
              <td>{association.seriesId}</td>
              <td>
                <button
                  className='btn text-decoration-none btn-link text-danger p-0'
                  onClick={() => deleteGenreSeries(association._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenreSeriesList;
