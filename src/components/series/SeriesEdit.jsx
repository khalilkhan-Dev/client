import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SeriesEdit() {
  const [title, setTitle] = useState('');
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
        const response = await axios.get(`http://localhost:5000/series/${id}`);
        setTitle(response.data.title);
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
        const response = await axios.get('http://localhost:5000/genres');
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
      await axios.patch(`http://localhost:5000/series/${id}`, { title, description, releaseDate, genreIds });
      navigate('/series'); // Redirect to list page
    } catch (error) {
      console.error('Error updating series:', error);
    }
  };

  return (
    <div>
      <h2>Edit Series</h2>
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
      <button onClick={updateSeries}>Update Series</button>
    </div>
  );
}

export default SeriesEdit;
