import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from './pages/home/Home';
import Register from './pages/login/Register';
import ForgotPassword from "./pages/login/ForgotPassword";
import Header from "./components/Header/Header";
// import { useLocalStorage } from "./utils/useLocalStorage";
// import ProtectedRoute from "./utils/ProtectedRoute";


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn}/>
      <div className="app-container">
      {isLoggedIn?
      <Routes>
        <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>
      :
      <Routes>
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="*" element={<Navigate replace to="/login"/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      }
      </div>
    </div>
  );
}

export default App;
