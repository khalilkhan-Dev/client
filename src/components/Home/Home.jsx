import React from "react";
import {Link } from "react-router-dom";


const Home = () => {
  return (
    <div>
      <nav>
        <Link to="/home/users">Users</Link>
        <Link to="/home/genres">Genres</Link>
        <Link to="/home/genres-series">Genres-series</Link>
        <Link to="/home/series">Series</Link>
        <Link to="/home/seasons">Seasons</Link>
      </nav>

      
    </div>
  );
};

export default Home;
