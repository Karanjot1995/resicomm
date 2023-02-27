import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Register from "../login/Register";

function Home({setIsLoggedIn}) {
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem('user')
    setIsLoggedIn("")
    navigate('/login');
  };

   return (
     <div className="pt-50">
       <div>Home</div>
       <div><button onClick={logout}>Logout</button></div>
     </div>
   );
}
 
export default Home;