import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './header.scss';

function Header() {
  const navigate = useNavigate();
  

   return (
     <div className="navbar">
      <div className="logosec">
        <div className="logo">RESICOMM</div>
      </div>
      <div className="message">
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Login/Signup</a></li>
          </ul>
        </nav>
        <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png" className="icon" alt=""/>
        <div className="dp">
          <img src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png" className="dp_icon" alt="dp"/>
        </div>
      </div>
     </div>
   );
}
 
export default Header;