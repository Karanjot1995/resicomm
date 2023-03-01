import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function PoolManager() {
  const navigate = useNavigate();
	const [userType, setUserType] = useState('resident');
	const [active, setActive] = useState('home');

	useEffect(() => {
		let selected = window.location.pathname.replace('/','');
		setUserType(selected)
		console.log()
  });

	const changeType = (e) =>{
		window.location.href = e.target.value
	}
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
			<div className="tab-toggle">
				<button onClick={()=>setActive('home')} className={`custom-btn ${active=='home'?'active':''}`}>Home</button>
				<button onClick={()=>setActive('dashboard')} className={`custom-btn ${active=='dashboard'?'active':''}`}>Dashboard</button>
			</div>
			{active=='home'?
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
	
						<div className="container d-flex">
							<div className="report">
								<div className="report-container">
									<div className="report-header">
										<h1 className="recent-Articles">Visitor Requests</h1>
										<button className="view">View All</button>
									</div>
	
									<div className="report-body">
										<table>
											<tbody>
												<tr>
													<th>Visitor Name</th>
													<th>Reason</th>
													<th>In-Time/Out-Time</th>
													<th>Status</th>
													<th></th>
												</tr>
												<tr>
													<td>John Doe</td>
													<td>Electricity</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-visited">Visited</td>
													<td>
														<div className="visitor-schedule-action-container">
														<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
														</div>
													</td>
												</tr>
												<tr>
													<td>Sam Smith</td>
													<td>Plumbing</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-entered">Entered</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>Victor Dean</td>
													<td>Guest</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-requested">Requested</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>Lisa Harris</td>
													<td>Guest</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-declined">Declined</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>Peter Spencer</td>
													<td>Housekeeping</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-approved">Approved</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>Daniel Geroge</td>
													<td>Delivery</td>
													<td>Feb 21, 2023 12:30 PM / Feb 21, 2023 12:30 PM</td>
													<td className="visitor-table-request-declined">Declined</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
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
									<div className="report-header">
										<h1 className="recent-Articles">Service Requests</h1>
										<button className="view">View All</button>
									</div>
					
									<div className="report-body">
										<table>
											<tbody>
												<tr>
													<th>Request Id</th>
													<th>Type</th>
													<th>Status</th>
													<th></th>
												</tr>
												<tr>
													<td>1</td>
													<td>Electricity</td>
													<td className="visitor-table-request-visited">In-Progress</td>
													<td>
														<div className="visitor-schedule-action-container">
														<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
														</div>
													</td>
												</tr>
												<tr>
													<td>2</td>
													<td>Plumbing</td>
													<td className="visitor-table-request-visited">In-Progress</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>3</td>
													<td>Guest</td>
													<td className="visitor-table-request-requested">Requested</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>4</td>
													<td>Guest</td>
													<td className="visitor-table-request-requested">Requested</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>5</td>
													<td>Housekeeping</td>
													<td className="visitor-table-request-approved">Completed</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>6</td>
													<td>Delivery</td>
													<td className="visitor-table-request-approved">Completed</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
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
									<div className="report-header">
										<h1 className="recent-Articles">Memberships</h1>
									</div>
	
									<div className="report-body">
										<table>
											<tbody>
												<tr>
													<th>Sr. No.</th>
													<th>Membership Name</th>
													<th>Issued On</th>
													<th>Expires On</th>
													<th></th>
												</tr>
												<tr>
													<td>1</td>
													<td>Gym</td>
													<td>Feb 21, 2023</td>
													<td>Feb 21, 2023</td>
													<td>
														<div className="visitor-schedule-action-container">
														<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
														</div>
													</td>
												</tr>
												<tr>
													<td>2</td>
													<td>Pool</td>
													<td>Feb 21, 2023</td>
													<td>Feb 21, 2023</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>3</td>
													<td>Tennis Court</td>
													<td>Feb 21, 2023</td>
													<td>Feb 21, 2023</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
															</div>
													</td>
												</tr>
												<tr>
													<td>4</td>
													<td>Badminton</td>
													<td>Feb 21, 2023</td>
													<td>Feb 21, 2023</td>
													<td>
														<div className= "visitor-schedule-action-container">
															<a><img src="./images/more_vert.png" height="24px" width="24px"/></a>
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
				:
				<div className="container">
					Dashboard
				</div>
			}

     </div>
   );
}
 
export default PoolManager;

