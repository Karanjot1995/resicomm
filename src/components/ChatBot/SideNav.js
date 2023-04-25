import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getUsers } from "../../services/services";
import Accordion from "./Accordion";

function SideNav(props) {
  const navigate = useNavigate();
  const {isCollapsed} = props;

	let [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  let [users, setUsers] = useState(null);
	let [managers, setManagers] = useState(null);
	let [residents, setResidents] = useState(null);
	let [visitors, setVisitors] = useState(null);

  useEffect(() => {
    getUsers().then(res=>{
      Object.keys(res).map(category=>{
        res[category] = res[category].filter(u=>u.id!=user.id)
      })
      let managers = {
        'building':res.building,
        'security':res.security,
        'garden':res.garden,
        'pool':res.pool
      }
      setManagers(managers)
      setResidents(res.residents)
      setVisitors(res.visitors)
      setUsers(res)
    });
  }, []);


  if(users){
    return (
      <div className="sidenav">
        <div className="sidenav-content">
          <div>
            {Object.keys(managers).length>0 ? Object.keys(managers).map((category,index)=>
              <div>
                <Accordion
                  key={index}
                  title={`${category} Manager`}
                  data={managers[category]}

                />
                {/* <h3 className="text-capitalize">{category} Manager</h3>
                {managers[category].map(m=>
                  <div>{m.fname}</div>
                )} */}
              </div>
            ):''}
            <div>
              <Accordion
                title={`Residents`}
                data={residents}
              />

              {/* <h3>Residents</h3>
              {residents.length ? residents.map(resident=>
                <div>
                  {resident.fname}
                </div>
              ):''} */}
            </div>
            <div>
              <Accordion
                title={`Visitors`}
                data={visitors}
              />
            </div>
            
          </div>
        </div>
      </div>
    );
  }else{
    return <div className="p-3 sidenav">Loading...</div>
  }
}
 
export default SideNav;