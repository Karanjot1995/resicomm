// import React from "react";
// import { Navigate, Outlet } from 'react-router-dom';

// function ProtectedRoute() {
//   const isLogged = localStorage.getItem("user");
//   console.log("this", isLogged);
//   // return (
//   //   <Route
//   //     {...restOfProps}
//   //     element={isLogged ? <Component /> : <Navigate replace to="/home" />}
//   //   />
//   // );
//   return isLogged? <Outlet /> : <Navigate to="/login" />;
// }

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkUser = () => {
        const user = localStorage.getItem('user');
        if (!user || user === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }
    useEffect(() => {
      checkUser();
    }, [isLoggedIn]);
    
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;