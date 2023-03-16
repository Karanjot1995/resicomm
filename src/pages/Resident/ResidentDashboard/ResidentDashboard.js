import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./resident.scss";
import "../../../App.scss";

function ResidentDashboard() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("resident");
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
    <div className="pt-50 resident">
      <select onChange={changeType} value={userType} className="type-select">
        <option value="resident">Resident</option>
        <option value="visitor">Visitor</option>
        <option value="building-manager">Building Manager</option>
        <option value="pool-manager">Pool Manager</option>
        <option value="garden-manager">Garden Manager</option>
        <option value="security-manager">Security Manager</option>
      </select>
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
      {active == "home" ? (
        <div className="container">
          <div className="main">
            <div className="box-container">
              <div className="box box1">
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
              </div>
            </div>

            <div className="m-auto">
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
            </div>

            <div className="container">
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                          <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
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
                              <label class="switch">
                                <input type="checkbox" defaultChecked />
                                <span class="slider round"></span>
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
                              <label class="switch">
                                <input type="checkbox" />
                                <span class="slider round"></span>
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
                              <label class="switch">
                                <input type="checkbox" defaultChecked />
                                <span class="slider round"></span>
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
                              <label class="switch">
                                <input type="checkbox" defaultChecked />
                                <span class="slider round"></span>
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

export default ResidentDashboard;
