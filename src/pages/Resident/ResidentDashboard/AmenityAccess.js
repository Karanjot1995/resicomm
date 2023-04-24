import React, { useState, useEffect } from "react";
import {
  getAccessLogs,
  addAccessLog,
  getAccessLogsManager,
  updateAccessLog,
} from "../../../services/services";
import Modal from "react-modal";
import Datetime from "react-datetime";
import moment from "moment";
import { customStyles } from "../../../utils/constants";
Modal.setAppElement(document.getElementById("amenity-access"));

function AmenityAccess(props) {
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [acceptModalIsOpen, setAcceptModalIsOpen] = useState(false);
  const [declineModalIsOpen, setDeclineModalIsOpen] = useState(false);
  const { user } = props;
  const [manager_amenity_id, setManagerAmenityId] = useState(props.amenity_id);
  const [amenities, setAmenities] = useState(props.amenities);
  const [logs, setLogs] = useState([]);
  const [amenity, setAmenity] = useState({
    in_time: "",
    out_time: "",
    name: "Select Amenity",
    user_id: user.id,
  });

  useEffect(() => {
    if (user.type == "manager") {
      console.log("user is manager " +manager_amenity_id);
      getAccessLogsManager({ amenity_id: manager_amenity_id }).then((res) =>
        setLogs(res.data)
      );
    } else {
      let uid = user.id;
      getAccessLogs({ uid }).then((res) => setLogs(res.data));
    }
  }, []);

  const handleOnChange = (name, value) => {
    setAmenity({ ...amenity, [name]: value });
  };

  const submit = () => {
    if (amenity.name == "Select Amenity") {
      alert("Select a valid amenity!");
    } else if (
      amenity.in_time &&
      amenity.out_time &&
      amenity.name != "Select Amenity"
    ) {
      let iTime = new Date(amenity.in_time);
      let oTime = new Date(amenity.out_time);
      let iIsoString = iTime.toISOString().slice(0, 19).replace("T", " ");
      let oIsoString = oTime.toISOString().slice(0, 19).replace("T", " ");
      amenity.in_time = iIsoString;
      amenity.out_time = oIsoString;
      addAccessLog(amenity).then((res) => {
        alert(res.message);
        window.location.href = "/dashboard";
      });
    } else {
      alert("All fields are mandatory!");
    }
  };

  const showAcceptRejectDialog = (isAccept) => {
    let val = isAccept ? 1 : 2;
    let data = { id: selectedLogId, accepted: val };
    updateAccessLog(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedLogId(null);
          window.location.href = "/dashboard";
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error updating log:", error);
      });
  };

  const isValid = (e) => {
    var yesterday = moment().subtract(1, "day");
    return e.isAfter(yesterday);
  };

  const isValidEnd = (e) => {
    if (amenity.in_time != "") {
      var yesterday = moment().subtract(1, "day");
      return e.isAfter(yesterday); //   return Date(e) == Date(amenity.in_time) || e.isAfter(amenity.in_time);
    } else {
      var yesterday = moment().subtract(1, "day");
      return e.isAfter(yesterday);
    }
  };

  return (
    <div id="amenity-access">
      {declineModalIsOpen && (
        <Modal
          isOpen={declineModalIsOpen}
          onHide={() => setDeclineModalIsOpen(false)}
          onRequestClose={() => setDeclineModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Decline Confirmation</h2>
          <br></br>
          <p>Are you sure you want to decline the request?</p>
          <br></br>
          <div className="text-right">
            <button onClick={() => setDeclineModalIsOpen(false)}>Cancel</button>
            &ensp;&ensp;&ensp;&ensp;
            <button onClick={() => showAcceptRejectDialog(false)}>
              Confirm
            </button>
          </div>
        </Modal>
      )}

      {acceptModalIsOpen && (
        <Modal
          isOpen={acceptModalIsOpen}
          onHide={() => setAcceptModalIsOpen(false)}
          onRequestClose={() => setAcceptModalIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>Accept Confirmation</h2>
          <br></br>
          <p>Are you sure you want to accept the request?</p>
          <br></br>
          <div className="text-right">
            <button onClick={() => setAcceptModalIsOpen(false)}>Cancel</button>
            &ensp;&ensp;&ensp;&ensp;
            <button onClick={() => showAcceptRejectDialog(true)}>
              Confirm
            </button>
          </div>
        </Modal>
      )}
      {user.type == "manager" ? (
        <div>
          <div className=" d-flex justify-content-between align-items-center">
            <h2 className="recent-Articles">Access Logs</h2>
          </div>
          <div className="report-body">
            {!logs || logs.length === 0 ? (
              <div>
                <h3 className="text-left">No Access Logs Found</h3>
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th style={{ width: "5%" }}></th>
                  </tr>
                  {logs && logs.length > 0
                    ? logs.map((log) => {
                        let iDateString = log.in_time;
                        const idate = new Date(iDateString + "Z");
                        const localInDate = idate.toLocaleString();

                        let oDateString = log.out_time;
                        const odate = new Date(oDateString + "Z");
                        const localOutDate = odate.toLocaleString();

                        let cDateString = log.created_at;
                        const cdate = new Date(cDateString + "Z");
                        const localCDate = cdate.toLocaleString();
                        return (
                          <tr>
                            <td>
                              {log.resident.fname} {log.resident.lname}
                            </td>
                            <td>{localInDate}</td>
                            <td>{localOutDate}</td>
                            <td>{localCDate}</td>
                            <td>
                              {log.accepted != 0
                                ? log.accepted == 1
                                  ? "Accepted"
                                  : "Rejected"
                                : "Requested"}
                            </td>
                            <td>
                              <div className="dropdown-container">
                                <i className="fa fa-ellipsis-v dropdown-icon" />
                                <ul className="dropdown-menu text-left">
                                  <li
                                    key={log.id + "accept"}
                                    onClick={() => {
                                      setSelectedLogId(log.id);
                                      setAcceptModalIsOpen(true);
                                    }}
                                  >
                                    Accept
                                  </li>
                                  <li
                                    key={log.id + "decline"}
                                    onClick={() => {
                                      setSelectedLogId(log.id);
                                      setDeclineModalIsOpen(true);
                                    }}
                                  >
                                    Decline
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>Request Access for Amenity</h2>
          <div className="report-body d-flex">
            <table>
              <tr>
                <td>
                  <label>Type of amenity: </label>
                  <select
                    value={amenity.name}
                    name="name"
                    onChange={(e) => {
                      handleOnChange("name", e.target.value);
                    }}
                  >
                    <option value="Select Amenity" disabled>
                      Select Amenity
                    </option>
                    {user.memberships.includes(1) && (
                      <option value="Pool">Pool</option>
                    )}
                    {user.memberships.includes(2) && (
                      <option value="Garden">Garden</option>
                    )}
                    {user.memberships.includes(3) && (
                      <option value="Tennis Court">Tennis Court</option>
                    )}
                    {user.memberships.includes(4) && (
                      <option value="Gym">Gym</option>
                    )}
                  </select>
                </td>
                <td>
                  <label>In Time: </label>
                  <Datetime
                    isValidDate={isValid}
                    value={amenity.in_time}
                    onChange={(e) => {
                      handleOnChange("in_time", e);
                    }}
                  />
                </td>
                <td>
                  <label>Out Time: </label>
                  <Datetime
                    isValidDate={isValidEnd}
                    value={amenity.out_time}
                    onChange={(e) => {
                      handleOnChange("out_time", e);
                    }}
                  />
                </td>
                <td>
                  <button onClick={submit}>Save</button>
                </td>
              </tr>
            </table>
          </div>
          <div className=" d-flex justify-content-between align-items-center">
            <h2 className="recent-Articles">Access Logs</h2>
          </div>
          <div className="report-body">
            {!logs || logs.length === 0 ? (
              <div>
                <h3 className="text-left">No Access Logs Found</h3>
              </div>
            ) : (
              <table>
                <tbody>
                  <tr>
                    <th>Amenity</th>
                    <th>In Time</th>
                    <th>Out Time</th>
                    <th>Created On</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                  {logs && logs.length > 0
                    ? logs.map((log) => {
                        let iDateString = log.in_time;
                        const idate = new Date(iDateString + "Z");
                        const localInDate = idate.toLocaleString();

                        let oDateString = log.out_time;
                        const odate = new Date(oDateString + "Z");
                        const localOutDate = odate.toLocaleString();

                        let cDateString = log.created_at;
                        const cdate = new Date(cDateString + "Z");
                        const localCDate = cdate.toLocaleString();

                        return (
                          <tr>
                            <td>{log.amenity.name}</td>
                            <td>{localInDate}</td>
                            <td>{localOutDate}</td>
                            <td>{localCDate}</td>
                            <td>
                              {log.accepted != 0
                                ? log.accepted == 1
                                  ? "Accepted"
                                  : "Rejected"
                                : "Requested"}
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AmenityAccess;
