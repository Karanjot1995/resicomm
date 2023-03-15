import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './home.scss';

function Home({setIsLoggedIn}) {
  const navigate = useNavigate();
   return (
     <div className="pt-50">
      <section id="home" className="section">
        <h2>Welcome to RESICOMM</h2>

      </section>
     </div>
   );
}
 
export default Home;

