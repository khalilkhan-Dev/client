import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SeriesCreate() {
  const [title, setTitle] = useState('');
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
      const response = await axios.get('http://localhost:5000/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const createSeries = async () => {
    try {
      await axios.post('http://localhost:5000/series', { title, description, releaseDate, genreIds });
      navigate('/series'); // Redirect to list page
    } catch (error) {
      console.error('Error creating series:', error);
    }
  };

  return (
    <div>
      <h2>Create Series</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        placeholder="Release Date"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <select
        multiple
        value={genreIds}
        onChange={(e) => setGenreIds(Array.from(e.target.selectedOptions, option => option.value))}
      >
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>{genre.name}</option>
        ))}
      </select>
      <button onClick={createSeries}>Create Series</button>
    </div>
  );
}

export default SeriesCreate;
