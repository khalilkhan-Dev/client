// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = () => {
  return (
    <nav>
      <ul>
        <li><Link className='btn bg-white mt-5 w-100' to="/users">User List</Link></li>
        <li><Link className='btn bg-white mt-2 w-100' to="/genres">Genre List</Link></li>
        <li><Link className='btn bg-white mt-2 w-100' to="/genres-series">Genre Series List</Link></li>
        <li><Link className='btn bg-white mt-2 w-100' to="/series">Series List</Link></li>
        <li><Link className='btn bg-white mt-2 w-100' to="/seasons">Seasons List</Link></li>
        
      </ul>
    </nav>
  );
};

export default Sidebar;
