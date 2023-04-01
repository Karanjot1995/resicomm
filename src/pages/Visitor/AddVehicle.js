import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
// import "../../App.scss";

function VisitorAddVehicle() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("visitor");
  const [active, setActive] = useState("home");

  useEffect(() => {
    let selected = window.location.pathname.replace("/", "");
    setUserType(selected);
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
                    <h1 className="recent-Articles">Register your vehicle</h1>
                  </div>
                  <div className="card text-center d-inline-block">
                    <div className="report-body">
                      <form>
                        <h2>Select your vehicle type:</h2>
                        <br />
                        <div className="d-flex justify-content-center">
                          <div className="d-inline d-relative">
                            <input
                              type="radio"
                              name="register-vehicle-radio"
                              value="a"
                              className="register-vehicle-radio"
                              defaultChecked
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
                              type="radio"
                              name="register-vehicle-radio"
                              value="b"
                              className="register-vehicle-radio"
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
                              type="radio"
                              name="register-vehicle-radio"
                              value="c"
                              className="register-vehicle-radio"
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
                              type="radio"
                              name="register-vehicle-radio"
                              value="d"
                              className="register-vehicle-radio"
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
                              type="radio"
                              name="register-vehicle-radio"
                              value="e"
                              className="register-vehicle-radio"
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
                              type="radio"
                              name="register-vehicle-radio"
                              value="o"
                              className="register-vehicle-radio"
                            />
                            <img
                              src="../images/category-u.png"
                              className="register-vehicle-radio-image"
                              alt="Option 6"
                            />
                          </div>
                        </div>
                        <br />

                        <div className="d-inline">
                          <label htmlFor="in-time">Vehicle Make:</label>
                          <input type="text" id="in-time" name="in-time" />
                        </div>
                        <br />
                        <br />
                        <div className="d-inline">
                          <label htmlFor="out-time">Vehicle Model:</label>
                          <input type="text" id="out-time" name="out-time" />
                        </div>
                        <br />
                        <br />
                        <div className="d-inline">
                          <label htmlFor="out-time">
                            Vehicle Number Plate:
                          </label>
                          <input type="text" id="out-time" name="out-time" />
                        </div>
                        <br />
                        <br />
                        <div className="d-inline">
                          <label htmlFor="out-time">DL Number:</label>
                          <input type="text" id="out-time" name="out-time" />
                        </div>
                        <br />
                        <br />
                        <a href="./visitor_create_request.html">
                          <button
                            type="submit"
                            className="btn-primary"
                            value="Submit"
                          >
                            Submit
                          </button>
                        </a>
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

export default VisitorAddVehicle;
