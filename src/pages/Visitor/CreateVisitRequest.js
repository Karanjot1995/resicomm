import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./visitor.scss";
import "../../App.scss";
import {
  getAllUsers,
  getVehicles,
  getVisitRequests,
  updateVisitRequest,
  visitRequest,
} from "../../services/services";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { validateCurrentDateTime } from "../../utils/validation";
import moment from "moment";

function VisitorCreateRequest() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigateBack = location.state?.navigateBack
    ? location.state.navigateBack
    : false;
  const { request_id } = useParams();
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState("home");
  const [resident, setResident] = useState({});
  const [getOwnVehicle, setGetOwnVehicle] = useState("no");
  const [vehicles, setVehicles] = useState([]);
  const [select_vehicle, setSelectVehicle] = useState("");
  const [in_time, setInTime] = useState("");
  const [out_time, setOutTime] = useState("");
  const [reason, setReason] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [requestDetails, setRequestDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [errMsgs, setErrMsgs] = useState({});

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res));
    getVehicles().then((res) => {
      let registeredVehicles = res.filter((v) => v.user_id == user.id);
      setVehicles(registeredVehicles);
    });

    if (request_id != null) {
      getVisitRequests({ uid: user.id, request_id: request_id }).then((res) => {
        setRequestDetails(res.data[0]);
        if (res.data[0]["vehicle_id"] != null) {
          setGetOwnVehicle("yes");
        }
        setReason(res.data[0].reason);
        setResident(res.data[0].user_id)
        const inDateString = res.data[0].in_time + 'Z';
        const unixInTimestamp = new Date(inDateString).getTime();
        setInTime(unixInTimestamp)

        const outDateString = res.data[0].out_time + 'Z';
        const unixOutTimestamp = new Date(outDateString).getTime();
        setOutTime(unixOutTimestamp)
        setLoading(false);
      });
    }
  }, []);

  const isValid = (e) => {
    var yesterday = moment().subtract(1, "day");
    return e.isAfter(yesterday);
  };

  const isValidEnd = (e) => {
    if (in_time != "") {
      // var yesterday = moment().subtract(1, "day");
      return e.isAfter(in_time);
    } else {
      var yesterday = moment().subtract(1, "day");
      return e.isAfter(yesterday);
    }
  };

  

  const editRequest = async (e) => {
    let iTime = new Date(in_time);
    let oTime = new Date(out_time);
    let iIsoString = iTime.toISOString().slice(0, 19).replace("T", " ");
    let oIsoString = oTime.toISOString().slice(0, 19).replace("T", " ");
    let request = {
      request_id: request_id,
      user_id: resident,
      guest_id: user.id,
      vehicle_id: select_vehicle == "" ? null : select_vehicle,
      reason: reason,
      in_time: iIsoString,
      out_time: oIsoString,
    };
    updateVisitRequest(request).then((res) => {
      if (res.status == 200) {
        alert(res.message);
        window.location.href = "/dashboard";
      }
    });
  };

  const submitRequest = async (e) => {
    let iTime = new Date(in_time);
    let oTime = new Date(out_time);
    let iIsoString = iTime.toISOString().slice(0, 19).replace("T", " ");
    let oIsoString = oTime.toISOString().slice(0, 19).replace("T", " ");
    let request = {
      user_id: resident,
      guest_id: user.id,
      vehicle_id: select_vehicle == "" ? null : select_vehicle,
      reason: reason,
      in_time: iIsoString,
      out_time: oIsoString,
    };
    visitRequest(request).then((res) => {
      if (res.status == 200) {
        alert(res.message);
        window.location.href = "/dashboard";
      }
    });
  };

  console.log(select_vehicle, vehicles);
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
                        <div className="d-flex justify-content-center">
                          <div className="d-inline">
                            <label htmlFor="apartment_number">
                              Select Resident:{" "}
                            </label>
                            <select
                              value={requestDetails["user_id"]}
                              defaultValue="select"
                              onChange={(e) => setResident(e.target.value)}
                              disabled= {request_id != null}
                            >
                              <option disabled value="select">
                                Select
                              </option>
                              {users.length > 0
                                ? users.map((u) => (
                                    <option value={u.id}>
                                      {u.fname} {u.lname}
                                    </option>
                                  ))
                                : ""}
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
                            checked={getOwnVehicle === "no"}
                            onChange={() => {
                              setSelectVehicle("");
                              setGetOwnVehicle("no");
                            }}
                          />
                          <label className="m-2" htmlFor="male">
                            {" "}
                            No{" "}
                          </label>
                          <input
                            type="radio"
                            id="vehicle_radio_yes"
                            name="vehicle_radio"
                            value="yes"
                            onChange={() => setGetOwnVehicle("yes")}
                            checked={getOwnVehicle === "yes"}
                          />
                          <label className="m-2" htmlFor="female">
                            {" "}
                            Yes
                          </label>
                          <br />
                        </div>
                        {getOwnVehicle == "yes" ? (
                          <div className="mt-2">
                            <label htmlFor="vehicle_number">
                              Select your vehicle:{" "}
                            </label>
                            <select
                              id="vehicle_number"
                              name="vehicle_number"
                              defaultValue="select"
                              value={
                                request_id != null
                                  ? requestDetails.vehicle_id
                                  : null
                              }
                              onChange={(e) => setSelectVehicle(e.target.value)}
                            >
                              <option value="select" disabled>
                                Select vehicle
                              </option>
                              {vehicles.length > 0
                                ? vehicles.map((v) => (
                                    <option value={v.id} se>
                                      {v.make} {v.model} / {v.number_plate}
                                    </option>
                                  ))
                                : ""}
                            </select>
                            <p className="mt-2" style={{ fontSize: "14" }}>
                              Vehicle not added?
                              <a
                                onClick={() => {
                                  navigate("/add-vehicle", {
                                    state: { navigateBack: true },
                                  });
                                }}
                              >
                                <u style={{ color: "blue" }}> Add here! </u>
                              </a>
                            </p>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="d-flex column mt-3 justify-content-center">
                          <div className="d-flex row w-50 ps-5">
                            <label htmlFor="in-time" className="w-25">
                              In-Time:
                            </label>
                            <div className="w-75">
                              <Datetime
                                isValidDate={isValid}
                                value={
                                  request_id != null
                                    ? in_time
                                    : null
                                }
                                onChange={(e) => {
                                  console.log("val is " + e);
                                  validateCurrentDateTime(
                                    e,
                                    setInTime,
                                    errMsgs,
                                    setErrMsgs,
                                    "startDateTime"
                                  );
                                }}
                              />
                            </div>
                            {/* <input
                              type="time"
                              id="in-time"
                              value={in_time}
                              onChange={(e) => setInTime(e.target.value)}
                              name="in-time"
                            /> */}
                          </div>
                          <p className="error-msg">
                            {errMsgs["startDateTime"]
                              ? errMsgs["startDateTime"]
                              : ""}
                          </p>
                          <div className="d-flex row w-50 ps-5">
                            <label htmlFor="out-time" className="w-25">
                              Out-Time:
                            </label>
                            {/* <input
                              type="time"
                              value={out_time}
                              onChange={(e) => setOutTime(e.target.value)}
                              id="out-time"
                              name="out-time"
                            /> */}
                            <div className="w-75">
                              <Datetime
                                isValidDate={isValidEnd}
                                value={
                                  request_id != null
                                    ? out_time
                                    : null
                                }
                                onChange={(e) => {
                                  validateCurrentDateTime(
                                    e,
                                    setOutTime,
                                    errMsgs,
                                    setErrMsgs,
                                    "endDateTime"
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <p className="error-msg">
                            {errMsgs["endDateTime"]
                              ? errMsgs["endDateTime"]
                              : ""}
                          </p>
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
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        ></textarea>
                        <br />
                        <br />
                        <button
                          className="btn-primary"
                          onClick={() => {
                            if (request_id != null) {
                              editRequest();
                            } else {
                              submitRequest();
                            }
                          }}
                        >
                          Submit
                        </button>
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
