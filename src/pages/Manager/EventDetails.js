import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import moment from "moment";
import {
  addPayment,
  addVehicle,
  cancelEventRegistration,
  createEvent,
  getAmenityDetails,
  getEventDetails,
  getEventRegistrations,
  getEvents,
  getLocations,
  getPayments,
  getUser,
  getVehicleDetails,
  joinMembership,
  leaveMembership,
  registerEvent,
  updateEvent,
  updateVehicleDetails,
} from "../../services/services";
import "./../Resident/ResidentDashboard/resident.scss";
import Modal from "react-modal";
import "../../App.scss";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";
import { Colors } from "../../utils/colors";
import {
  validateAccountNumber,
  validateCardCVC,
  validateCardCvc,
  validateCardExpiry,
  validateCardNumber,
  validateCurrentDateTime,
  validateEmail,
  validateIFSC,
  validateLastName,
  validateName,
  validatePassword,
  validateText,
  validateUPI,
} from "../../utils/validation";
import Datetime from "react-datetime";
// import CustomDateTimePicker from "./../../components/DateTimePicker/CustomDateTimePicker";
import "react-datetime/css/react-datetime.css";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    maxWidth: "80vw",
    zIndex: 30,
  },
};

Modal.setAppElement(
  document.getElementById("resident-dashboard-amenity-modal")
);

function EventDetails(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event_id, setEvent_id] = useState(props.event_id);
  // const [eventDetails, setEventDetails] = useState({});
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [errMsgs, setErrMsgs] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, setEventEndTime] = useState({});
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("");
  const [value, setValue] = useState(new Date());
  const [viewMode, setViewMode] = useState("view");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registerModalIsOpen, setRegisterModalIsOpen] = React.useState(false);
  const [unregisterModalIsOpen, setUnregisterModalIsOpen] =
    React.useState(false);
  const [locationDetails, setLocationDetails] = useState(null);

  useEffect(() => {
    getPropertyDetails();
    if (event_id != "") {
      initData();
    } else {
      setViewMode("edit");
      setLoading(false);
      setEventType(user.department);
    }
  }, []);

  const initData = () => {
    let data = {
      event_id: event_id,
    };

    getEventDetails(data)
      .then((response) => {
        if (response.status == 200) {
          setEventDetails(response.eventDetails);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    getRegistrations(event_id);
  };

  const setEventDetails = (data) => {
    setEventName(data.name);
    setEventDescription(data.description);
    setEventDescription(data.description);
    setEventLocation(data.location);
    const startTime = data.start_time + "Z";
    const unixStartTime = new Date(startTime).getTime();
    setEventType(data.type);
    const endTime = data.end_time + "Z";
    const unixEndTime = new Date(endTime).getTime();
    setEventStartTime(unixStartTime);
    setEventEndTime(unixEndTime);
    setLoading(false);
  };

  const getRegistrations = (event_id) => {
    let data = {
      user_id: user.id,
      events_id: [event_id],
    };

    getEventRegistrations(data)
      .then((response) => {
        if (response.status == 200) {
          if (response.event_registrations.length === 0) {
            setIsRegistered(false);
          } else {
            setIsRegistered(true);
          }
          // setLoading(false);
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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
          alert(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const register = () => {
    setProcessing(true);
    let data = { event_id: event_id, user_id: user.id };
    registerEvent(data)
      .then((res) => {
        if (res.status == 200) {
          setRegisterModalIsOpen(false);
          alert(res.message);
          setProcessing(false);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        setProcessing(false);
        console.error("Error removing membership:", error);
      });
  };

  const unRegister = () => {
    setProcessing(true);
    let data = { event_id: event_id, user_id: user.id };
    cancelEventRegistration(data)
      .then((res) => {
        if (res.status == 200) {
          setUnregisterModalIsOpen(false);
          alert(res.message);
          setProcessing(false);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        setProcessing(false);
        console.error("Error removing membership:", error);
      });
  };

  const update = () => {
    let sTime = new Date(eventStartTime);
    let eTime = new Date(eventEndTime);
    let sIsoString = sTime.toISOString().slice(0, 19).replace("T", " ");
    let iIsoString = eTime.toISOString().slice(0, 19).replace("T", " ");

    let data = {
      name: eventName,
      description: eventDescription,
      start_time: sIsoString,
      end_time: iIsoString,
      location: eventLocation,
      id: event_id,
    };

    updateEvent(data)
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status == 200) {
          alert(response.message);
          props.onUpdate();
        } else {
          alert(response.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error updating amenity:", error);
      });
  };

  const create = () => {
    if (validate()) {
      let iTime = new Date(eventStartTime);
      let oTime = new Date(eventEndTime);
      let iIsoString = iTime.toISOString().slice(0, 19).replace("T", " ");
      let oIsoString = oTime.toISOString().slice(0, 19).replace("T", " ");
      let request = {
        name: eventName,
        description: eventDescription,
        type: eventType,
        location: eventLocation,
        start_time: iIsoString,
        end_time: oIsoString,
      };
      createEvent(request).then((res) => {
        if (res.status == 200) {
          alert(res.message);
          window.location.href = "/dashboard";
        } else {
          alert(res.message);
        }
      });
    }
  };

  const handleReload = () => {
    initData();
  };

  const validate = () => {
    let valid = true;
    for (const key in errMsgs) {
      if (errMsgs[key] && key != "randomKey") {
        valid = false;
      }
    }

    if (!eventName) {
      alert("Enter a valid event name!");
    } else if (!eventDescription) {
      alert("Enter a valid event description!");
    } else if (!eventStartTime) {
      alert("Enter a valid event start time!");
    } else if (!eventEndTime) {
      alert("Enter a valid event end time!");
    } else if (!eventLocation) {
      alert("Enter a valid event location!");
    } else if (!eventType) {
      alert("Enter a valid event type!");
    } else {
    }

    return valid;
  };

  const isValid = (e) => {
    var yesterday = moment().subtract(1, "day");
    return e.isAfter(yesterday);
  };

  const isValidEnd = (e) => {
    if (eventStartTime != "") {
      return Date(e) == Date(eventStartTime) || e.isAfter(eventStartTime);
    } else {
      var yesterday = moment().subtract(1, "day");
      return e.isAfter(yesterday);
    }
  };

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else if (viewMode === "edit") {
    return (
      <div className="container resident ps-5 pe-5 pt-5" id="visitor">
        <div className="report-container">
          <div className="visitor-box-container">
            <div className="box1">
              <div className="text d-flex">
                <h1 className="red">Event Details</h1>
                {/* {user.manager ? (
                  <button
                    className="btn-red ms-5"
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                    onClick={() => {
                      setViewMode("view");
                    }}
                  >
                    Cancel
                  </button>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          </div>
          <div className="d-flex column align-items-start">
            {/* <h3 className="text-left">Select a payment method:</h3> */}
            <br />
            <div className="w-100">
              <div className="lInput w-50">
                <label>
                  <h2 className="text-left">Name</h2>
                </label>
                <input
                  className=""
                  value={eventName}
                  type="text"
                  maxLength={16}
                  id="name"
                  placeholder="Event Name"
                  onChange={(e) => {
                    validateName(e, setEventName, errMsgs, setErrMsgs);
                  }}
                  required
                />
                <p className="error-msg text-left ps-4">
                  {errMsgs["name"] ? errMsgs["name"] : ""}
                </p>
              </div>
              <div className="lInput">
                <label>
                  <h2 className="text-left">Description</h2>
                </label>
                <textarea
                  value={eventDescription}
                  className="ms-n5"
                  name="description"
                  placeholder="Enter description..."
                  onChange={(e) => {
                    validateText(
                      e,
                      setEventDescription,
                      errMsgs,
                      setErrMsgs,
                      "description"
                    );
                  }}
                  required
                />
                <p className="error-msg text-left ps-4">
                  {errMsgs["description"] ? errMsgs["description"] : ""}
                </p>
              </div>
              <div className="">
                <h2 className="text-left">Event Timings</h2>
                <ul
                  className="text-left"
                  style={{ listStyleType: "none", paddingLeft: "2%" }}
                >
                  <li key="startTime">
                    <div className="d-flex row">
                      <div
                        style={{
                          width: "5%",
                        }}
                      >
                        {/* <div className="lInput w-48 d-flex row"> */}
                        <label>
                          <b>From:</b>
                        </label>

                        {/* </div> */}
                      </div>
                      <div
                        style={{
                          textAlign: "left",
                          paddingLeft: "1%",
                        }}
                      >
                        <div>
                          <Datetime
                            isValidDate={isValid}
                            value={event_id != "" ? eventStartTime : null}
                            onChange={(e) => {
                              validateCurrentDateTime(
                                e,
                                setEventStartTime,
                                errMsgs,
                                setErrMsgs,
                                "startDateTime"
                              );
                            }}
                          />
                        </div>
                        <p className="error-msg">
                          {errMsgs["startDateTime"]
                            ? errMsgs["startDateTime"]
                            : ""}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li key="endTime">
                    <div className="d-flex row">
                      <div
                        style={{
                          width: "5%",
                        }}
                      >
                        {/* <div className="lInput w-48 d-flex row"> */}
                        <label>
                          <b>To:</b>
                        </label>

                        {/* </div> */}
                      </div>
                      <div
                        style={{
                          textAlign: "left",
                          paddingLeft: "1%",
                        }}
                      >
                        <div>
                          <Datetime
                            isValidDate={isValidEnd}
                            value={event_id != "" ? eventEndTime : null}
                            onChange={(e) => {
                              validateCurrentDateTime(
                                e,
                                setEventEndTime,
                                errMsgs,
                                setErrMsgs,
                                "endDateTime"
                              );
                            }}
                          />
                        </div>
                        <p className="error-msg">
                          {errMsgs["endDateTime"] ? errMsgs["endDateTime"] : ""}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="">
                <label>
                  <h2 className="text-left">Location</h2>
                </label>
                <div className=" text-left w-25 ps-4">
                  {" "}
                  <select
                    id="event_location"
                    name="vehicle_number"
                    defaultValue="select"
                    value={event_id != "" ? eventLocation : null}
                    onChange={(e) => setEventLocation(e.target.value)}
                  >
                    <option value="select" disabled>
                      Select Location
                    </option>
                    {/* locationDetails.map((location) => */}

                    {locationDetails &&
                      Object.values(locationDetails).map((location) =>
                        location.building.includes(
                          user.department.charAt(0).toUpperCase() +
                            user.department.slice(1)
                        ) ? (
                          <option value={location.id}>
                            {location.building}
                          </option>
                        ) : (
                          ""
                        )
                      )}
                  </select>
                </div>
                <p className="error-msg">
                  {errMsgs["cardNumber"] ? errMsgs["cardNumber"] : ""}
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={() => {
                  if (event_id != "") {
                    update();
                  } else {
                    create();
                  }
                }}
              >
                {event_id == "" ? "Create Event" : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    let iTime = new Date(eventStartTime);
    const idate = new Date(iTime);
    const formattedStartDate = idate.toLocaleString();

    let oTime = new Date(eventEndTime);
    const odate = new Date(oTime);
    const formattedEndDate = odate.toLocaleString();

    return (
      <div
        className="container ps-5 pt-5 pe-5"
        id="resident-dashboard-amenity-modal"
      >
        {registerModalIsOpen && (
          <Modal
            isOpen={registerModalIsOpen}
            onHide={() => setRegisterModalIsOpen(false)}
            onRequestClose={() => {
              setRegisterModalIsOpen(false);
            }}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              {processing ? (
                <Loader />
              ) : (
                <div>
                  <h2>Confirmation</h2>
                  <br></br>
                  <p>Are you sure you want to register to this event?</p>
                  <br></br>
                  <div className="text-right">
                    <button
                      className="p-1 btn-outline-red"
                      onClick={() => {
                        setRegisterModalIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button className="p-1 btn-red" onClick={() => register()}>
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}

        {unregisterModalIsOpen && (
          <Modal
            isOpen={unregisterModalIsOpen}
            onHide={() => setUnregisterModalIsOpen(false)}
            onRequestClose={() => {
              setUnregisterModalIsOpen(false);
            }}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div>
              {processing ? (
                <Loader />
              ) : (
                <div>
                  <h2>Confirmation</h2>
                  <br></br>
                  <p>
                    Are you sure you want to cancel your registration to this
                    event?
                  </p>
                  <br></br>
                  <div className="text-right">
                    <button
                      className="p-1 btn-outline-red"
                      onClick={() => {
                        setUnregisterModalIsOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button
                      className="p-1 btn-red"
                      onClick={() => unRegister()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Modal>
        )}
        <div className="text d-flex">
          <h1 className="red">Event Details</h1>
          {user.manager ? (
            <button
              className="btn-red ms-5"
              style={{ paddingLeft: 16, paddingRight: 16 }}
              onClick={() => {
                setViewMode("edit");
              }}
            >
              Edit
            </button>
          ) : isRegistered ? (
            <button
              className="btn-outline-red ms-5"
              style={{ paddingLeft: 16, paddingRight: 16 }}
              onClick={() => {
                setUnregisterModalIsOpen(true);
              }}
            >
              Cancel Registration
            </button>
          ) : (
            <button
              className="btn-red ms-5"
              style={{ paddingLeft: 16, paddingRight: 16 }}
              onClick={() => {
                setRegisterModalIsOpen(true);
              }}
            >
              Register
            </button>
          )}
        </div>
        <br />
        <div>
          <h2 className="text-left">Name</h2>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "2%",
            }}
          >
            {eventName}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-left">Description</h2>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "2%",
            }}
          >
            {eventDescription}
          </div>
        </div>
        <br />
        <div>
          <h2 className="text-left">Event Timings</h2>
          <ul
            className="text-left"
            style={{ listStyleType: "none", paddingLeft: "2%" }}
          >
            <li key="startTime">
              <div className="d-flex container row">
                <div
                  style={{
                    width: "5%",
                  }}
                >
                  <b>From:</b>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "1%",
                  }}
                >
                  {formattedStartDate}
                </div>
              </div>
            </li>

            <li key="endTime">
              <div className="d-flex container row">
                <div
                  style={{
                    width: "5%",
                  }}
                >
                  <b>To:</b>
                </div>
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "1%",
                  }}
                >
                  {formattedEndDate}
                </div>
              </div>
            </li>
          </ul>
          {/* <div
            style={{
              textAlign: "left",
              paddingLeft: "2%",
            }}
          >
            {formattedStartDate} {startTime} to {formattedEndDate} {endTime}
          </div> */}
        </div>
        <br />
        <div>
          <h2 className="text-left">Location</h2>
          <div className="d-flex justify-content-between">
            <div
              style={{
                textAlign: "left",
                paddingLeft: "2%",
              }}
            >
              {locationDetails && locationDetails[eventLocation]["address"]}
            </div>
            {isRegistered ? (
              <button
                className="btn-red ms-5"
                style={{ paddingLeft: 16, paddingRight: 16 }}
                onClick={() => {
                  navigate("/driving-instructions", {
                    state: {
                      destination: locationDetails[eventLocation],
                    },
                  });
                }}
              >
                Driving Instructions
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <br />
        {/* <div>
            <h3 className="text-left">No Upcoming Eventss</h3>
          </div> */}
      </div>
    );
  }
}

export default EventDetails;
