import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/login/Login";
import Home from './pages/home/Home';
import Register from './pages/login/Register';
import ForgotPassword from "./pages/login/ForgotPassword";
import Header from "./components/Header/Header";
import ChatBot from "./components/ChatBot/ChatBot";
import Footer from "./components/Footer/Footer";
import ResidentDashboard from "./pages/Resident/ResidentDashboard/ResidentDashboard";
import PoolManager from "./pages/Manager/PoolManager/PoolManager";
import GardenManager from "./pages/Manager/GardenManager/GardenManager";
import BuildingManager from "./pages/Manager/BuildingManager/BuildingManager";
import SecurityManager from "./pages/Manager/SecurityManager/SecurityManager";
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
          <Route path="/resident" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/visitor" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/pool-manager" element={<PoolManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/garden-manager" element={<GardenManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/building-manager" element={<BuildingManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/security-manager" element={<SecurityManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Navigate replace to="/resident" />} />
          <Route path="*" element={<Navigate replace to="/resident" />} />
        </Routes>
        :
        <Routes>
          <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/resident" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/visitor" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/pool-manager" element={<PoolManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/garden-manager" element={<GardenManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/building-manager" element={<BuildingManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/security-manager" element={<SecurityManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="*" element={<Navigate replace to="/login"/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        }
      </div>
      <ChatBot/>
      <Footer/>
    </div>
  );
}

export default App;
