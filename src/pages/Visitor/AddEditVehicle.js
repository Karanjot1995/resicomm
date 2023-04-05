import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  getVehicleDetails,
  updateVehicleDetails,
} from "../../services/services";
import "./visitor.scss";
import "../../App.scss";

function VisitorAddEditVehicle() {
  const { vehicle_id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (vehicle_id != null) {
      setLoading(true);

      let data = {
        vehicle_id: vehicle_id,
      };

      getVehicleDetails(data)
        .then((response) => {
          setLoading(false);
          if (response.status == 200) {
            setVehicleDetails(response.vehicle_details);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const updateVehicle = async (e) => {
    if (!vehicleDetails.type) {
      alert("Select a valid vehicle type!");
    } else if (!vehicleDetails.make) {
      alert("Enter a valid vehicle make!");
    } else if (!vehicleDetails.model) {
      alert("Enter a valid vehicle model!");
    } else if (!vehicleDetails.number_plate) {
      alert("Enter a valid vehicle number plate!");
    } else if (!vehicleDetails.color) {
      alert("Enter a valid vehicle color!");
    } else {
      let data = vehicleDetails;
      data.vehicle_id = vehicle_id;
      updateVehicleDetails(data)
        .then((res) => {
          if (res.status == 200) {
            alert(res.message);
            handleReload();
          } else {
            alert(res.message);
          }
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
        });
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (loading) {
    return (
      <div>
        {/* <button onClick={handleButtonClick}>Load Data</button> */}
        {loading && <Loader />}
      </div>
    );
  } else {
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
                        <div className="logo">Hi {user.fname}!</div>
                      </div>
                    </div>
                  </div>

                  <div className="report-container">
                    <div className="report-header">
                      {vehicle_id ? (
                        <h1 className="recent-Articles">Edit your vehicle</h1>
                      ) : (
                        <h1 className="recent-Articles">
                          Register your vehicle
                        </h1>
                      )}
                    </div>
                    <div className="card text-center d-inline-block">
                      <div className="report-body">
                        <h2>Select your vehicle type:</h2>
                        <br />
                        <div className="d-flex justify-content-center">
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) =>
                                (vehicleDetails.type = "motorbike")
                              }
                              type="radio"
                              name="register-vehicle-radio"
                              value="a"
                              className="register-vehicle-radio"
                              defaultChecked={
                                !vehicle_id ||
                                (vehicle_id &&
                                  vehicleDetails.type === "motorbike")
                              }
                              // checked={
                              //   vehicle_id &&
                              //   vehicleDetails.type === "motorbike"
                              // }
                            />
                            <img
                              src="../images/category-a.png"
                              className="register-vehicle-radio-image"
                              alt="Option 1"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) => (vehicleDetails.type = "car")}
                              type="radio"
                              name="register-vehicle-radio"
                              value="b"
                              className="register-vehicle-radio"
                              defaultChecked={
                                vehicle_id && vehicleDetails.type === "car"
                              }
                            />
                            <img
                              src="../images/category-b.png"
                              className="register-vehicle-radio-image"
                              alt="Option 2"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) => (vehicleDetails.type = "truck")}
                              type="radio"
                              name="register-vehicle-radio"
                              value="c"
                              className="register-vehicle-radio"
                              defaultChecked={
                                vehicle_id && vehicleDetails.type === "truck"
                              }
                            />
                            <img
                              src="../images/category-c.png"
                              className="register-vehicle-radio-image"
                              alt="Option 3"
                            />
                          </div>
                        </div>

                        <br />
                        <div className="d-flex justify-content-center">
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) => (vehicleDetails.type = "bus")}
                              type="radio"
                              name="register-vehicle-radio"
                              value="d"
                              className="register-vehicle-radio"
                              defaultChecked={
                                vehicle_id && vehicleDetails.type === "bus"
                              }
                            />
                            <img
                              src="../images/category-d.png"
                              className="register-vehicle-radio-image"
                              alt="Option 4"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) =>
                                (vehicleDetails.type = "tractor")
                              }
                              type="radio"
                              name="register-vehicle-radio"
                              value="e"
                              className="register-vehicle-radio"
                              defaultChecked={
                                vehicle_id && vehicleDetails.type === "tractor"
                              }
                            />
                            <img
                              src="../images/category-t.png"
                              className="register-vehicle-radio-image"
                              alt="Option 5"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline d-relative">
                            <input
                              onChange={(e) => (vehicleDetails.type = "others")}
                              type="radio"
                              name="register-vehicle-radio"
                              value="o"
                              className="register-vehicle-radio"
                              defaultChecked={
                                vehicle_id && vehicleDetails.type === "others"
                              }
                            />
                            <img
                              src="../images/category-u.png"
                              className="register-vehicle-radio-image"
                              alt="Option 6"
                            />
                          </div>
                        </div>
                        <br />

                        <div className="d-flex justify-content-center column">
                          <label htmlFor="in-time">
                            {" "}
                            <b>Vehicle Make:</b>
                          </label>
                          &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                          <input
                            required
                            onChange={(e) =>
                              (vehicleDetails.make = e.target.value)
                            }
                            className="form-input"
                            type="text"
                            id="in-time"
                            name="in-time"
                            defaultValue={vehicle_id ? vehicleDetails.make : ""}
                          />
                        </div>
                        <br />
                        <div className="d-flex justify-content-center column">
                          <label htmlFor="out-time">
                            <b>Vehicle Model:</b>
                          </label>
                          &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                          <input
                            required
                            onChange={(e) =>
                              (vehicleDetails.model = e.target.value)
                            }
                            className="form-input"
                            type="text"
                            id="out-time"
                            name="out-time"
                            defaultValue={
                              vehicle_id ? vehicleDetails.model : ""
                            }
                          />
                        </div>
                        <br />
                        <div className="d-flex justify-content-center column">
                          <label htmlFor="out-time">
                            <b> Vehicle Number Plate:</b>
                          </label>
                          &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                          <input
                            required
                            onChange={(e) =>
                              (vehicleDetails.number_plate = e.target.value)
                            }
                            className="form-input"
                            type="text"
                            id="out-time"
                            name="out-time"
                            defaultValue={
                              vehicle_id ? vehicleDetails.number_plate : ""
                            }
                          />
                        </div>
                        <br />
                        <div className="d-flex justify-content-center column">
                          <label className="text-left" htmlFor="out-time">
                            <b>Color:</b>
                          </label>
                          &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                          <input
                            required
                            onChange={(e) =>
                              (vehicleDetails.color = e.target.value)
                            }
                            className="form-input"
                            type="text"
                            id="out-time"
                            name="out-time"
                            defaultValue={
                              vehicle_id ? vehicleDetails.color : ""
                            }
                          />
                        </div>
                        <br />
                        <button className="btn-primary" onClick={updateVehicle}>
                          Submit
                        </button>
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
  }
}

export default VisitorAddEditVehicle;
