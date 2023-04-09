import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

function DrivingInstructions() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("visitor");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [active, setActive] = useState("home");

  useEffect(() => {
    let selected = window.location.pathname.replace("/", "");
    setUserType(selected);
    console.log();
  });

  const changeType = (e) => {
    window.location.href = e.target.value;
  };
  return (
    <div className="pt-50 resident" id="visitor">
      <div className="container">
        <div className="main">
          <div className="container">
            <div className="report">
              <div className="report-container">
                <div className="visitor-box-container">
                  <div className=" box1">
                    <div className="text">
                      <div className="logo">Hi {user.fname}</div>
                    </div>
                  </div>
                </div>

                <div className="report-container">
                  <div className="report-header">
                    <h1 className="recent-Articles">Driving Instructions</h1>
                  </div>
                  <div className="card text-center d-inline-block">
                    <div className="report-body">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d53666.31088235871!2d-97.1574939019848!3d32.78842947781195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e0!4m5!1s0x864e7d0c2eb6db5d%3A0xbd1df967cff57f5!2sTimber%20Brook%2C%20410%20Kerby%20Street%2C%20Arlington%2C%20TX!3m2!1d32.7326257!2d-97.1193241!4m5!1s0x864e7fa7086a3063%3A0x4144003e8e64d247!2sBedford%2C%20TX!3m2!1d32.844017!2d-97.1430671!5e0!3m2!1sen!2sus!4v1676685564627!5m2!1sen!2sus"
                        className="driving-instructions-map"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                      {/* <iframe src="https://www.google.com/maps/d/embed?mid=1q34OCJg3rep-qh8qH_ZyTa76jWYtFms&ehbc=2E312F" width="100%" height="480"></iframe> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const mapStyles = {
  //   height: "100vh",
  //   width: "100%",
  // };

  // const defaultCenter = {
  //   lat: 41.3851,
  //   lng: 2.1734,
  // };

  // return (
  //   <LoadScript googleMapsApiKey="AIzaSyAc49AINR73SvhaeLaJquHMXWgDOjKkJDo">
  //     <GoogleMap
  //       mapContainerStyle={mapStyles}
  //       zoom={13}
  //       center={defaultCenter}
  //     />
  //   </LoadScript>
  // );
}

export default DrivingInstructions;
