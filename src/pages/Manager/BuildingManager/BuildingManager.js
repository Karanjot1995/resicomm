import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ManagerDashboard from "../ManagerDashboard";
import ManagerHome from "../ManagerHome";


function BuildingManager() {
  const navigate = useNavigate();
	const [userType, setUserType] = useState('resident');
	const [active, setActive] = useState('home');

	useEffect(() => {
		let selected = window.location.pathname.replace('/','');
		setUserType(selected)
  });

	const changeType = (e) =>{
		window.location.href = e.target.value
	}
	const boxData = [
		{
			heading: 'No. of pools',
			description: '2'
		},
		{
			heading: 'Pools Employees',
			description: '6'
		}
	]
	const reportData = {
		titles:['Reports', 'Residents', 'Date'],
		rows:[['Report_1', 'Resident_1', 'Date_1']]
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
			<ManagerHome/>
			:
			<ManagerDashboard boxData={boxData} reportData={reportData}/>
		}
	</div>
   );
}
 
export default BuildingManager;

