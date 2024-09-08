import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';
import './Genre.css'

function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get('/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const deleteGenre = async (id) => {
    try {
      await axiosInstance.delete(`/genres/${id}`);
      setGenres(genres.filter(genre => genre._id !== id)); // Refresh the genre list
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  return (
    <div className='p-3'>
      <h2 className='mt-3'>Genres</h2>
      <Link to="/genres/create"><button className='btn btn-primary my-3'>Create New Genre</button></Link>
     

      <table>
        
          <tr>
            <th>Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {genres.map(genre=>(
            <tr key={genre._id}>
              <td>{genre.name}</td>
              <td><Link className='text-decoration-none text-danger' to={`/genres/update/${genre._id}`}>Edit</Link></td>
              <td><Link className='text-decoration-none text-danger'  onClick={() => deleteGenre(genre._id)}>Delete</Link></td>

            </tr>
          ))}
          
        
      </table>
    </div>
  );
}

export default GenreList;
