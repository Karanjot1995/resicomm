import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users, getEmployees } from "../../services/services";
import ManagerDashboard from "./ManagerDashboard";
import ManagerHome from "./ManagerHome";

const boxData = [
  {
    heading: "No. of buildings",
    description: "2",
  },
  {
    heading: "No. of Managers",
    description: "6",
  },
];

const boxData2 = [
  { title: "Manage Security Manager" },
  { title: "Manage Pool Manager" },
  { title: "Manage Garden Manager" },
  { title: "Manage Resident and Visitors" },
  { title: "Generate Reports" },
];

const reportData = {
  titles: ["Reports", "Residents", "Date"],
  rows: [["Report_1", "Resident_1", "Date_1"]],
};

// const employees = [
//   { id: 2, name: "Jatin", email: "jatin@mavs.uta.edu", phone: "9090909090" },
// ];

function Manager(props) {
  const navigate = useNavigate();
  const [active, setActive] = useState("home");
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    getEmployees().then(data=>{
        if(user.type=="manager"){ 
            if(user.department=="building"){
                setEmployees(data.building)
            }else if(user.department=="security"){
                setEmployees(data.security)
            }else if(user.department=="pool"){
                setEmployees(data.pool)
            }else if(user.department="garden"){
                setEmployees(data.garden)
            }
        }
       
    })

    // fetch('data/employees.json',{  
    //   headers : { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //   }
    // })
    // .then(res=>res.json()).then(data=>{
    //   setEmployees(data.building)
    // })
  },[]);

  const changeType = (e) => {
    window.location.href = e.target.value;
  };

  return (
    <div className="pt-50 resident">
      {/* <select onChange={changeType} value={userType} className="type-select">
        <option value="resident">Resident</option>
        <option value="visitor">Visitor</option>
        <option value="building-manager">Building Manager</option>
        <option value="pool-manager">Pool Manager</option>
        <option value="garden-manager">Garden Manager</option>
        <option value="security-manager">Security Manager</option>
      </select> */}
      <h2 className="text-center pt-5">{user.department} Manager</h2>
      {active == "home" ? (
        <div>
          {employees.length ? <ManagerHome boxData={boxData2} employees={employees} />:''}
          <ManagerDashboard boxData={boxData} reportData={reportData} />
        </div>
      ) : (
        <ManagerDashboard boxData={boxData} reportData={reportData} />
      )}
    </div>
  );
}

export default Manager;
