import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  let [showSubMenu, setShowSubMenu] = useState(false);

  const openSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const logout = () => {
    localStorage.removeItem("user")
    alert("Logged Out!");
    window.location.href = "/login";
  };

  return (
    <div className="navbar">
      <div className="logosec">
        <div className="logo">RESICOMM</div>
      </div>
      <div className="message">
        <nav>
          <ul>
          <li><a href="http://sxg0414.uta.cloud/blog/">Blog</a></li>
            <li><a href="/home">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact-us">Contact us</a></li>
            {isLoggedIn && <li><a href="/dashboard">Dashboard</a></li>}
            {isLoggedIn?
              <div>
                <div
                  className="profile-btn"
                  onMouseEnter={() => setShowSubMenu(true)}
                  onMouseLeave={() => setShowSubMenu(false)}
                  onClick={openSubMenu}
                >
                  <a className="profile_icon">
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                      className="dp_icon"
                      alt="dp"
                    />
                  </a>
                  <ul className={`nav__submenu ${showSubMenu ? "show" : ""}`}>
                    <li>
                      <a href="/profile">Profile</a>
                    </li>
                    <li>
                      <a onClick={logout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </div>
             : (
              <li>
                <a href="/login" className="custom-btn login-btn-nav">
                  Sign In
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
