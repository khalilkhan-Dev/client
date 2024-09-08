import React from 'react'
import './Navbar.css'
import logo from '../../assets/images/1.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    // Clear the token from localStorage or cookies
    localStorage.removeItem("token");
    // Redirect the user to the login page
   navigate("/login");
  };

  return (
    <>
    <div className="Navbar ">
        <div className="logo">
            <img src={logo} alt="" />
        </div>
        <div className="profile">
        <div class="dropdown">
  <button class="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  <svg style={{color:"white"}} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
  </button>
  <ul class="dropdown-menu">
    <li>
      <button class="dropdown-item" onClick={handleLogout} >Logout</button>
    </li>
   
  </ul>
</div>
        </div>


    </div>
    </>
  )
}

export default Navbar