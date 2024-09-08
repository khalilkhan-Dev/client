import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

function SeasonsList() {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      try {
        const response = await axiosInstance.get('/seasons');
        console.log(response.data); 
        setSeasons(response.data);
      } catch (error) {
        console.error('Error fetching seasons:', error);
      }
    };

    fetchSeasons();
  }, []);

  async function deleteSeason(id) {
    try {
      await axiosInstance.delete(`/seasons/${id}`);
      setSeasons(seasons.filter(season => season._id !== id));
    } catch (error) {
      console.error('Error deleting season:', error);
    }
  }

  return (
    <div className='p-3'>
      <h2 className='mt-3'>Seasons List</h2>
      <Link to="/seasons/create">
        <button className='btn btn-primary my-3'>Create New Season</button>
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
          {seasons.map((season) => (
            <tr key={season._id}>
              <td>{season.name}</td>
              <td>{season.description}</td> {/* Updated data */}
              <td>
                <Link className='text-decoration-none text-secondary' to={`/seasons/edit/${season._id}`}>Edit</Link>
              </td>
              <td>
                <Link className='text-decoration-none text-danger p-0' onClick={() => deleteSeason(season._id)}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SeasonsList;
