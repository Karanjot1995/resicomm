import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./resident.scss";
import "../../../App.scss";
import {
  deleteVehicle,
  getServices,
  getVehicles,
} from "../../../services/services";
import Modal from "react-modal";
import Loader from "../../../components/loader/Loader";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 30,
  },
};

Modal.setAppElement(document.getElementById("resident-dashboard"));

function ResidentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("resident");
  const [active, setActive] = useState("home");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    console.log("user is " + JSON.stringify(user));
    getServices().then((res) => setAmenities(res));
    getVehicles().then((res) => {
      setVehicles(res);
      setLoading(false);
    });
  }, []);

  const changeType = (e) => {
    window.location.href = e.target.value;
  };

  const showDeleteVehicleDialog = () => {
    let data = { vehicle_id: selectedVehicleId };
    deleteVehicle(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedVehicleId(null);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
      });
  };

  const handleReload = () => {
    window.location.reload();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (loading) {
    return (
      <div>
        {/* <button onClick={handleButtonClick}>Load Data</button> */}
        {loading && <Loader />}
      </div>
    );
  } else {
    return (
      <div className="pt-50 resident">
        {/* <div className="tab-toggle">
        <button
          onClick={() => setActive("home")}
          className={`custom-btn ${active == "home" ? "active" : ""}`}
        >
          Home
        </button>
        <button
          onClick={() => setActive("dashboard")}
          className={`custom-btn ${active == "dashboard" ? "active" : ""}`}
        >
          Dashboard
        </button>
      </div> */}

        {/* <div className="menu-container side-menu">
        <div className="menu-toggle">&#9776;</div>
        <ul className={`menu sidebar-menu ${isOpen ? "open" : ""}`}>
          <li>
            <a href="#">Dashboard</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Registered Vehicles</a>
          </li>
        </ul>
      </div> */}

        {active == "home" ? (
          <div className="container">
            <div className="main" id="resident-dashboard">
              {modalIsOpen && (
                <Modal
                  isOpen={modalIsOpen}
                  onHide={() => setIsOpen(false)}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2>Delete Confirmation</h2>
                  <br></br>
                  <p>Are you sure you want to delete this item?</p>
                  <br></br>
                  <div className="text-right">
                    <button onClick={closeModal}>Cancel</button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button onClick={() => showDeleteVehicleDialog()}>
                      Delete
                    </button>
                  </div>
                </Modal>
              )}
              <div className="box-container">
                {amenities &&
                  amenities.map((service) => (
                    <div className="box box1">
                      <div className="text">
                        <h2 className="topic-heading">{service.name}</h2>
                        <h2 className="topic">{service.hours}</h2>
                      </div>
                    </div>
                  ))}
                {/* <div className="box box1">
                <div className="text">
                  <h2 className="topic-heading">Garden</h2>
                  <h2 className="topic">7:00 AM - 5:00 PM</h2>
                </div>
              </div>

              <div className="box box2">
                <div className="text">
                  <h2 className="topic-heading">Pool</h2>
                  <h2 className="topic">8:00 AM - 8:00 PM</h2>
                </div>
              </div>

              <div className="box box3">
                <div className="text">
                  <h2 className="topic-heading-md">Tennis Court</h2>
                  <h2 className="topic">6:00 AM - 12:00 PM (Mor.)</h2>
                  <h2 className="topic">4:00 PM - 10:00 PM (Eve.)</h2>
                </div>
              </div>

              <div className="box box4">
                <div className="text">
                  <h2 className="topic-heading">Gym</h2>
                  <h2 className="topic">5:00 AM - 12:00 AM</h2>
                </div>
              </div> */}
              </div>

              {/* <div className="m-auto">
              <div className="home-section-vehicle report-header d-block m-auto">
                <div className="input-group">
                  <div className="input-box">
                    <h4>Vehicle Registration</h4>
                  </div>
                </div>
                <div className="input-group">
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="Vehicle Model"
                      required
                      className="name"
                    />
                    <i className="bx bxs-user"></i>
                  </div>
                  <div className="input-box">
                    <input
                      type="text"
                      placeholder="License Plate"
                      required
                      className="name"
                    />
                    <i className="bx bxs-phone"></i>
                  </div>
                  <div className="input-box">
                    <p>Expiry Date</p>
                    <select>
                      <option>01 Jun</option>
                    </select>
                    <select>
                      <option>2023</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="input-group">
                  <div className="input-box">
                    <button type="submit" className="vehicle-submit">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

              <div className="container">
                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Registered Vehicles</h1>
                      <div className="d-flex justify-content-around">
                        <button
                          className="btn-red"
                          style={{ paddingLeft: 16, paddingRight: 16 }}
                          onClick={() => {
                            navigate("/add-vehicle", {
                              state: { navigateBack: true },
                            });
                          }}
                        >
                          Add Vehicle
                        </button>
                        {/* <button className="view">View All</button> */}
                      </div>
                    </div>

                    <div className="report-body table-container">
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>Make</th>
                            <th style={{ width: "20%" }}>Model</th>
                            <th style={{ width: "32%" }}>Number Plate</th>
                            <th style={{ width: "19%" }}>Color</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.map((vehicle, index) =>
                            vehicle.user_id == user.id ? (
                              <tr>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.number_plate}</td>
                                <td className="visitor-table-request-visited">
                                  {vehicle.color}
                                </td>
                                <td>
                                  {/* <div className="visitor-schedule-action-container">
                                  <a>
                                    <img
                                      src="./images/more_vert.png"
                                      height="24px"
                                      width="24px"
                                    />
                                  </a>
                                </div> */}
                                  <div className="dropdown-container">
                                    <i className="fa fa-ellipsis-v dropdown-icon" />
                                    <ul className="dropdown-menu text-left">
                                      <li
                                        key={vehicle.id + "edit"}
                                        onClick={() => {
                                          navigate(
                                            `/edit-vehicle/${vehicle.id}`
                                          );
                                        }}
                                      >
                                        Edit
                                      </li>
                                      <li
                                        key={vehicle.id + "delete"}
                                        onClick={() => {
                                          setSelectedVehicleId(vehicle.id);
                                          openModal();
                                        }}
                                      >
                                        Delete
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            ) : (
                              ""
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Visitor Requests</h1>
                      <button className="view">View All</button>
                    </div>

                    <div className="report-body">
                      <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>Visitor Name</th>
                            <th style={{ width: "20%" }}>Reason</th>
                            <th style={{ width: "32%" }}>In-Time/Out-Time</th>
                            <th style={{ width: "19%" }}>Status</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>John Doe</td>
                            <td>Electricity</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-visited">
                              Visited
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Sam Smith</td>
                            <td>Plumbing</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-entered">
                              Entered
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Victor Dean</td>
                            <td>Guest</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-requested">
                              Requested
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Lisa Harris</td>
                            <td>Guest</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-declined">
                              Declined
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Peter Spencer</td>
                            <td>Housekeeping</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-approved">
                              Approved
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Daniel Geroge</td>
                            <td>Delivery</td>
                            <td>
                              Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM
                            </td>
                            <td className="visitor-table-request-declined">
                              Declined
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Service Requests</h1>
                      <button className="view">View All</button>
                    </div>

                    <div className="report-body">
                      <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th style={{ width: "25%" }}>Request Id</th>
                            <th style={{ width: "35%" }}>Type</th>
                            <th style={{ width: "35%" }}>Status</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Electricity</td>
                            <td className="visitor-table-request-visited">
                              In-Progress
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Plumbing</td>
                            <td className="visitor-table-request-visited">
                              In-Progress
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Guest</td>
                            <td className="visitor-table-request-requested">
                              Requested
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Guest</td>
                            <td className="visitor-table-request-requested">
                              Requested
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Housekeeping</td>
                            <td className="visitor-table-request-approved">
                              Completed
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Delivery</td>
                            <td className="visitor-table-request-approved">
                              Completed
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="report">
                  <div className="report-container">
                    <div className=" d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Memberships</h1>
                    </div>

                    <div className="report-body">
                      <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>Sr. No.</th>
                            <th style={{ width: "15%" }}>Membership Name</th>
                            <th style={{ width: "35%" }}>Issued On</th>
                            <th style={{ width: "35%" }}>Expires On</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Gym</td>
                            <td>Feb 21, 2023</td>
                            <td>Feb 21, 2023</td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                {/* <a>
                                <img
                                  src="./images/more_vert.png"
                                  height="24px"
                                  width="24px"
                                />
                              </a> */}
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Pool</td>
                            <td>Feb 21, 2023</td>
                            <td>Feb 21, 2023</td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                {/* <a>
                                <img
                                  src="./images/more_vert.png"
                                  height="24px"
                                  width="24px"
                                />
                              </a> */}
                                <label className="switch">
                                  <input type="checkbox" />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Tennis Court</td>
                            <td>Feb 21, 2023</td>
                            <td>Feb 21, 2023</td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                {/* <a>
                                <img
                                  src="./images/more_vert.png"
                                  height="24px"
                                  width="24px"
                                />
                              </a> */}
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Badminton</td>
                            <td>Feb 21, 2023</td>
                            <td>Feb 21, 2023</td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                {/* <a>
                                <img
                                  src="./images/more_vert.png"
                                  height="24px"
                                  width="24px"
                                />
                              </a> */}
                                <label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">Dashboard</div>
        )}
      </div>
    );
  }
}

export default ResidentDashboard;
