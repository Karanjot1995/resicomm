import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";
import { getAllUsers, getVehicles, visitRequest } from "../../services/services";

function VisitorCreateRequest() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState("home");
  const [resident, setResident] = useState({})
  const [getOwnVehicle, setGetOwnVehicle] = useState("no")
  const [vehicles, setVehicles] = useState([])
  const [select_vehicle, setSelectVehicle] = useState("")
  const [in_time, setInTime] = useState("")
  const [out_time, setOutTime] = useState("")
  const [reason, setReason] = useState("")
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))

  useEffect(() => {
    getAllUsers().then(res=>setUsers(res))
    getVehicles().then(res=>{
      let registeredVehicles = res.filter(v=>v.user_id==user.id)
      setVehicles(registeredVehicles)
    })
  },[]);


  const submitRequest = (e) =>{
    e.preventDefault();
    let request = {
      user_id: resident,
      guest_id: user.id,
      vehicle_id: select_vehicle,
      reason: reason,
      in_time: in_time,
      out_time: out_time
    }
    visitRequest(request).then(res=>{
      if(res.status==200){
        alert(res.message);
        window.location.href = '/dashboard'
      }
    })
  }

  console.log(select_vehicle,vehicles)
  return (
    <div className="pt-50 resident" id="visitor">
      <div className="container">
        <div className="main">
          <div className="container">
            <div className="report">
              <div className="report-container">
                
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
                            <label htmlFor="apartment_number">Select Resident: </label>
                            <select onChange={(e)=>setResident(e.target.value)}>
                              <option disabled selected>Select</option>
                              {users.length>0? users.map(u=><option value={u.id}>{u.fname} {u.lname}</option>):''}
                            </select>
                            {/* <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                            /> */}
                          </div>
                         
                        </div>
                        <br />
                        <label htmlFor="vehicle_radio">
                          Will you be coming with a vehicle?:
                        </label>
                        <br />
                        <div className="line-item d-flex justify-content-center">
                          <input
                            type="radio"
                            id="vehicle_radio_no"
                            htmlFor="vehicle_radio"
                            value="no"
                            checked={ getOwnVehicle === 'no' } 
                            onChange={()=>setGetOwnVehicle('no')}
                          />
                          <label className="m-2" htmlFor="male"> No </label>
                          <input
                            type="radio"
                            id="vehicle_radio_yes"
                            name="vehicle_radio"
                            value="yes"
                            onChange={()=>setGetOwnVehicle('yes')}
                            checked={ getOwnVehicle === 'yes' } 
                          />
                          <label className="m-2" htmlFor="female"> Yes</label>
                          <br />
                        </div>
                        {getOwnVehicle=='yes'?
                        <div className="mt-2">
                          <label htmlFor="vehicle_number">Select your vehicle: </label>
                          <select id="vehicle_number" name="vehicle_number" onChange={(e)=>setSelectVehicle(e.target.value)}>
                            <option selected disabled>Select vehicle</option>
                            {vehicles.length>0?
                            vehicles.map(v=><option value={v.id}>{v.make} {v.model} / {v.number_plate}</option>)
                            :''}
                          </select>
                          <p className="mt-2" style={{ fontSize: "14" }}>
                            Vehicle not added?
                            <a onClick={() => {
                            navigate("/add-vehicle", {
                              state: { navigateBack: true },
                            })
                          }}>Add here!</a>
                          </p>
                        </div>
                        :''}
                       
                        <div className="d-flex mt-3 justify-content-center">
                          <div className="d-inline">
                            <label htmlFor="in-time">In-Time:</label>
                            <input type="time" id="in-time" value={in_time} onChange={(e)=>setInTime(e.target.value)}  name="in-time" />
                          </div>
                          <div className="d-inline">
                            <label htmlFor="out-time">Out-Time:</label>
                            <input type="time" value={out_time} onChange={(e)=>setOutTime(e.target.value)} id="out-time" name="out-time" />
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
                          value={reason} onChange={(e)=>setReason(e.target.value)}
                        ></textarea>
                        <br />
                        <br />
                        <button
                          type="submit"
                          className="btn-primary"
                          value="Submit"
                          onClick={submitRequest}
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
