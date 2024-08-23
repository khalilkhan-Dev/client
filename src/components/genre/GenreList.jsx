import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GenreList() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get('http://localhost:5000/genres');
        setGenres(response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const deleteGenre = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/genres/${id}`);
      setGenres(genres.filter(genre => genre._id !== id)); // Refresh the genre list
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  return (
    <div>
      <h2>Genres</h2>
      <Link to="/genres/create">Create New Genre</Link>
      <ul>
        {genres.map(genre => (
          <li key={genre._id}>
            {genre.name}
            <Link to={`/genres/update/${genre._id}`}>Edit</Link>
            <button onClick={() => deleteGenre(genre._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GenreList;
