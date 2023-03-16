import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";

function VisitorCreateRequest() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("visitor");
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
                {/* <div className="report-header d-flex justify-content-between align-items-center">
                  <h1 className="recent-Articles">Visitation Requests</h1>
                  <button className="view">View All</button>
                </div>

                <div className="report-body">
                  <table>
                    <tbody>
                      <tr>
                        <th>Request Id</th>
                        <th>Building-Apartment Unit</th>
                        <th>In-Time/Out-Time</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                      <tr>
                        <td>73</td>
                        <td>5-210</td>
                        <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
                        <td className="visitor-table-request-approved">
                          Approved
                        </td>
                        <td>
                          <div className="visitor-schedule-action-container">
                            <a href="./visitor_driving_instructions.html">
                              <img
                                src="./images/map.png"
                                height="24px"
                                width="24px"
                              />
                            </a>
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
                        <td>73</td>
                        <td>5-210</td>
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
                        <td>73</td>
                        <td>5-210</td>
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
                        <td>73</td>
                        <td>5-210</td>
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
                        <td>73</td>
                        <td>5-210</td>
                        <td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
                        <td className="visitor-table-request-approved">
                          Approved
                        </td>
                        <td>
                          <div className="visitor-schedule-action-container">
                            <a href="./visitor_driving_instructions.html">
                              <img
                                src="./images/map.png"
                                height="24px"
                                width="24px"
                              />
                            </a>
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
                        <td>73</td>
                        <td>5-210</td>
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
                </div> */}
                <div className="visitor-box-container">
                  <div className=" box1">
                    <div className="text">
                      <div className="logo">Hi Visitor</div>
                    </div>
                  </div>
                </div>

                <div className="report-container">
                  <div className="report-header">
                    <h1 className="recent-Articles">Create a visit request</h1>
                  </div>
                  <div className="card text-center d-inline-block">
                    <div className="report-body">
                      <form>
                        <div className="d-flex justify-content-center">
                          <div className="d-inline">
                            <label htmlFor="apartment_number">
                              Apartment Number:
                            </label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline">
                            <label htmlFor="building_number">
                              Building Number:
                            </label>
                            <input
                              type="text"
                              id="building_number"
                              name="building_number"
                            />
                          </div>
                        </div>
                        <br />
                        <label htmlFor="vehicle_radio">
                          Will you be coming with a vehicle?:
                        </label>
                        <br />
                        <div className="d-flex justify-content-center">
                          <input
                            type="radio"
                            id="vehicle_radio_no"
                            htmlFor="vehicle_radio"
                            value="no"
                          />
                          &nbsp;
                          <label htmlFor="male">No</label>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <input
                            type="radio"
                            id="vehicle_radio_yes"
                            name="vehicle_radio"
                            value="yes"
                          />
                          &nbsp;
                          <label htmlFor="female">Yes</label>
                          <br />
                        </div>
                        <br />
                        <label htmlFor="vehicle_number">
                          Select your vehicle:
                        </label>
                        <select id="vehicle_number" name="vehicle_number">
                          <option value="">Select vehicle</option>
                          <option value="number1">
                            Hyundai Elantra / LHD-8488
                          </option>
                          <option value="number2">
                            Nissan Turano / CBH-3536
                          </option>
                          <option value="number3">
                            Ford Fusion / MBD-1254
                          </option>
                        </select>
                        <br />
                        <p style={{ fontSize: "14" }}>
                          Vehicle not added?
                          <a href="/visitor/add-vehicle">Add here!</a>
                        </p>
                        <br />
                        <div className="d-flex justify-content-center">
                          <div className="d-inline">
                            <label htmlFor="in-time">In-Time:</label>
                            <input type="text" id="in-time" name="in-time" />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline">
                            <label htmlFor="out-time">Out-Time:</label>
                            <input type="text" id="out-time" name="out-time" />
                          </div>
                        </div>
                        <br />
                        <p>
                          <label htmlFor="visit-reason">
                            Reason for visit:
                          </label>
                        </p>
                        <textarea
                          id="visit-reason"
                          name="visit-reason"
                          rows="6"
                          cols="80"
                        ></textarea>
                        <br />
                        <br />
                        <button
                          type="submit"
                          className="btn-primary"
                          value="Submit"
                        >
                          Submit
                        </button>
                      </form>
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

export default VisitorCreateRequest;
