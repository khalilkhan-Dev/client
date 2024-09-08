import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function SeriesList() {
  const [seriesList, setSeriesList] = useState([]);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await axiosInstance.get('/series');
      setSeriesList(response.data);
    } catch (error) {
      console.error('Error fetching series:', error);
    }
  };

  const deleteSeries = async (id) => {
    try {
      await axiosInstance.delete(`/series/${id}`);
      fetchSeries(); // Refresh the list
    } catch (error) {
      console.error('Error deleting series:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mt-3'>Series List</h2>
      <Link to="/series/create">
        <button className='btn btn-primary my-3'>Add New Series</button>
      </Link>

      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {seriesList.map((series) => (
            <tr key={series._id}>
              <td>{series.name}</td> {/* Updated to series.name */}
              <td>{series.description}</td>
              <td>
                <Link className='text-decoration-none text-secondary' to={`/series/edit/${series._id}`}>Edit</Link>
              </td>
              <td>
                <Link className='text-decoration-none text-danger' onClick={() => deleteSeries(series._id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeriesList;
