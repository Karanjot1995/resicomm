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
import About from "./pages/about/About";
import Contactus from "./pages/contactus/Contactus";
import Services from "./pages/services/Services";
import VisitorDashboard from "./pages/Visitor/VisitorDashboard";
import VisitorCreateRequest from "./pages/Visitor/CreateVisitRequest";
import VisitorAddEditVehicle from "./pages/Visitor/AddEditVehicle";
import UserProfile from "./pages/login/UserProfile";
import DrivingInstructions from "./pages/Visitor/DrivingInstructions";
import VerifyEmail from "./pages/login/Verify";
import Manager from "./pages/Manager/Manager";
import ResetPassword from "./pages/login/ResetPassword";
// import { useLocalStorage } from "./utils/useLocalStorage";
// import ProtectedRoute from "./utils/ProtectedRoute";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   console.log(user);
    
  // },[]);

  const renderDashboard = (user) => {
    if(user.type && (user.type=='user' || user.type=='resident')){
      return <ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>
    }else if(user.type && user.type=='visitor'){
      return <VisitorDashboard setIsLoggedIn={setIsLoggedIn}/>
    }else if(user.type && user.type=='manager'){
      return <Manager user={user}/>
    }
  }

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn}/>
      <div className="app-container">
        {user?
        <Routes>
          <Route path="/verify" element={<VerifyEmail setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/profile" element={<UserProfile setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/dashboard" element={renderDashboard(user)} />
          {/* {user.type == 'manager' && <Route path="/dashboard" element={<Manager user={user}/>} />}
          {user.type=='resident' && <Route path="/resident" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />}
          {user.type == 'visitor' && <Route path="/visitor" element={<VisitorDashboard setIsLoggedIn={setIsLoggedIn}/>} />} */}
          <Route path="/create-request" element={<VisitorCreateRequest setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/edit-request/:request_id" element={<VisitorCreateRequest setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/add-vehicle" element={<VisitorAddEditVehicle setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/edit-vehicle/:vehicle_id" element={<VisitorAddEditVehicle setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/driving-instructions" element={<DrivingInstructions setIsLoggedIn={setIsLoggedIn}/>} />
          {/* <Route path="/pool-manager" element={<PoolManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/garden-manager" element={<GardenManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/building-manager" element={<BuildingManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/security-manager" element={<SecurityManager setIsLoggedIn={setIsLoggedIn}/>} /> */}
          <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/contact-us" element={<Contactus setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/services" element={<Services setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<Navigate replace to="/home" />} />
        </Routes>
        :
        <Routes>
          <Route path="/verify" element={<VerifyEmail setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/home" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/" element={<Home setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/profile" element={<UserProfile setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser}/>} />
          {/* <Route path="/resident" element={<ResidentDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/visitor" element={<VisitorDashboard setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/create-request" element={<VisitorCreateRequest setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/add-vehicle" element={<VisitorAddVehicle setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/driving-instructions" element={<DrivingInstructions setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/pool-manager" element={<PoolManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/garden-manager" element={<GardenManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/building-manager" element={<BuildingManager setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/security-manager" element={<SecurityManager setIsLoggedIn={setIsLoggedIn}/>} /> */}
          <Route path="/about" element={<About setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/contact-us" element={<Contactus setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="/services" element={<Services setIsLoggedIn={setIsLoggedIn}/>} />
          <Route path="*" element={<Navigate replace to="/login"/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
        }
      </div>
      {/* <ChatBot/> */}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
