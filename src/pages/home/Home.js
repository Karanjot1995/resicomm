import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Register from "../login/Register";

function Home({setIsLoggedIn}) {
  const navigate = useNavigate();

   return (
     <div className="pt-50">
       <div>Home</div>
     </div>
   );
}
 
export default Home;

