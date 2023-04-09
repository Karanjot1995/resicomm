import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";
import { getVisitRequests } from "../../services/services";

function VisitorDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [active, setActive] = useState("home");
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    let uid = user.id
    getVisitRequests({uid}).then(res=>setVisits(res.data))
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
      <div>
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
                          <th>Resident</th>
                          <th>Building-Apartment Unit</th>
                          <th>In-Time/Out-Time</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                          {visits.length>0? visits.map(v=>
                          <tr>
                            <td>{v.id}</td>
                            <td>{v.resident.fname} {v.resident.lname}</td>
                            <td>{v.resident.building? v.resident.building+'-'+v.resident.apt:''}</td>
                            <td>{v.in_time}-{v.out_time}</td>
                            <td>{v.accepted==1?'Approved':'Requested'}</td>
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
                          ):''}
                          
                        
                      </tbody>
                    </table>
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

export default VisitorDashboard;
