import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";

function VisitorDashboard() {
  const navigate = useNavigate();
  // const [userType, setUserType] = useState("visitor");
  const [active, setActive] = useState("home");

  useEffect(() => {
    // console.log("hi");
  });

  const changeType = (e) => {
    window.location.href = e.target.value;
  };
  return (
    <div className="pt-50 resident" id="visitor">
     
      {/* <div className="tab-toggle">
				<button onClick={()=>setActive('home')} className={`custom-btn ${active=='home'?'active':''}`}>Home</button>
				<button onClick={()=>setActive('dashboard')} className={`custom-btn ${active=='dashboard'?'active':''}`}>Dashboard</button>
			</div> */}
      <div className="container">
        <div className="main">
        <div className="report-container">
          <div className="report-header d-flex justify-content-between align-items-center">
            <button className="view" onClick={() => navigate("/create-request")}>
              Create a visit request
            </button>
          </div>
        </div>

          <div className="container">
            <div className="report">
              <div className="report-container">
                <div className="report-header d-flex justify-content-between align-items-center">
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
                            {/* <a href="./visitor_driving_instructions.html">
                              <img
                                src="./images/map.png"
                                height="24px"
                                width="24px"
                              />
                            </a> */}
                            <button
                              className="driving-instructions"
                              onClick={() => navigate("/driving-instructions")}
                            >
                              Driving Instructions
                            </button>

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
                            <button className="driving-instructions">
                              Driving Instructions
                            </button>

                            {/* <a href="./visitor_driving_instructions.html">
                              <img
                                src="./images/map.png"
                                height="24px"
                                width="24px"
                              />
                            </a> */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorDashboard;
