import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  users,
  getEmployees,
  getUsers,
  getServices,
  getEvents,
  getLocations,
} from "../../services/services";
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
  { title: "Manage Security Manager", dept: "security" },
  { title: "Manage Pool Manager", dept: "pool" },
  { title: "Manage Garden Manager", dept: "garden" },
  { title: "Manage Residents", role: "user" },
  { title: "Manage Visitors", role: "visitor" },
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
  const [amenities, setAmenities] = useState([]);
  const [events, setEvents] = useState(props.events);
  const [amenityDetails, setAmenityDetails] = useState(null);
  const [active, setActive] = useState("home");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(props.user);
  const [locationDetails, setLocationDetails] = useState({});

  useEffect(() => {
    initData();
    // fetch('data/employees.json',{
    //   headers : {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //   }
    // })
    // .then(res=>res.json()).then(data=>{
    //   setEmployees(data.building)
    // })
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  const initData = () => {
    getUsers().then((data) => {
      if (user.type == "manager") {
        if (user.department == "building") {
          let allManagers = [];
          Object.keys(data).map((key) => allManagers.push(...data[key]));
          setUsers(allManagers);
        } else if (user.department == "security") {
          setUsers(data.security);
        } else if (user.department == "pool") {
          setUsers(data.pool);
        } else if ((user.department = "garden")) {
          setUsers(data.garden);
        }
      }
    });
    getServices().then((res) => {
      setAmenities(res);

      let am = res.find(
        (obj) =>
          obj.name ===
          user.department.charAt(0).toUpperCase() + user.department.slice(1)
      );
      setAmenityDetails(am);
    });

    const currentTime = new Date();
    let eventsRequest = {
      start_time: currentTime.toISOString(),
      type: user.department.toLowerCase(),
    };

    getEvents(eventsRequest)
      .then((response) => {
        if (response.status == 200) {
          setEvents(response.events);
          // let event_id_list = response.events.map((item) => item.id);
          // getRegistrations(event_id_list);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    getPropertyDetails();
  };

  const getPropertyDetails = () => {
    getLocations()
      .then((response) => {
        if (response.status == 200) {
          let object = {};
          response.locations.map((item) => {
            object[item.id] = item;
          });

          setLocationDetails(object);
        } else {
          // alert(response.message);
        }
        // setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        // setLoading(false);
      });
  };

  return (
    <div className="pt-50 resident">
      <div>
        <h2 className="text-center pt-5">
          {user.department.charAt(0).toUpperCase() + user.department.slice(1)}{" "}
          Manager
        </h2>
        {amenityDetails && events ? (
          <ManagerType
            amenityDetails={amenityDetails}
            locationDetails={locationDetails}
            events={events}
            onUpdate={() => handleReload()}
          />
        ) : (
          ""
        )}
        {users.length ? (
          <ManagerHome
            boxData={boxData2}
            users={users}
            reportData={reportData}
          />
        ) : (
          ""
        )}
        <ManagerDashboard boxData={boxData} reportData={reportData} />
      </div>
    </div>
  );
}

export default Manager;
