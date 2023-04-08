import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { users, getEmployees, getUsers } from "../../services/services";
import ManagerDashboard from "./ManagerDashboard";
import ManagerHome from "./ManagerHome";
import ManagerType from "./ManagerType";

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
  { title: "Manage Security Manager" ,dept:"security"},
  { title: "Manage Pool Manager" ,dept:"pool"},
  { title: "Manage Garden Manager" ,dept:"garden"},
  { title: "Manage Residents", role:'user'},
  { title: "Manage Visitors", role:'visitor'}
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
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    getUsers().then(data=>{
        if(user.type=="manager"){ 
            if(user.department=="building"){
              let allManagers = [];
              Object.keys(data).map(key=>allManagers.push(...data[key]));
              setUsers(allManagers)
            }else if(user.department=="security"){
              setUsers(data.security)
            }else if(user.department=="pool"){
              setUsers(data.pool)
            }else if(user.department="garden"){
              setUsers(data.garden)
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


  return (
    <div className="pt-50 resident">
        <div>
            <h2 className="text-center pt-5">{user.department} Manager</h2>
            <ManagerType/>
            {users.length ? <ManagerHome boxData={boxData2} users={users} reportData={reportData}/>:''}
            <ManagerDashboard boxData={boxData} reportData={reportData} />
        </div>
    </div>
  );
}

export default Manager;
