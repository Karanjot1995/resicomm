import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  addPayment,
  addVehicle,
  cancelEventRegistration,
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
  updateVehicleDetails,
} from "../../services/services";
import "./../Resident/ResidentDashboard/resident.scss";
import Modal from "react-modal";
// import "../../App.scss";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";
import { Colors } from "../../utils/colors";
import {
  validateAccountNumber,
  validateCardCVC,
  validateCardCvc,
  validateCardExpiry,
  validateCardNumber,
  validateEmail,
  validateIFSC,
  validateLastName,
  validateName,
  validatePassword,
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
  const [locationDetails, setLocationDetails] = useState({});

  useEffect(() => {
    if (event_id != "") {
      initData();
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
    setEventStartTime(data.start_time);
    setEventEndTime(data.end_time);
    getPropertyDetails();
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
          setLoading(false);
        } else {
          alert(response.message);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else if (viewMode === "edit") {
    return (
      <div className="pt-50 resident" id="visitor">
        <div
          className="container"
          id="resident-dashboard-payment-modal"
          style={{ width: "100%" }}
        >
          <div className="container">
            <div className="report">
              <div className="report-container">
                <div className="visitor-box-container">
                  <div className="box1">
                    <div className="text d-flex">
                      <h1 className="red">Event Details</h1>
                    </div>
                  </div>
                </div>
                <div className="d-flex column">
                  <div className="report-body">
                    {/* <h3 className="text-left">Select a payment method:</h3> */}
                    <br />
                    <div className="pt-3 pb-3">
                      <div>
                        <form className="register-form" id="register-form">
                          <div className="lInput w-48">
                            <label>
                              <b>Event Name:</b>
                            </label>
                            <input
                              className=""
                              type="text"
                              maxLength={16}
                              id="cardNumber"
                              placeholder="1234 1234 1234 1234"
                              onChange={(e) => {
                                //   validateCardNumber(
                                //     e,
                                //     setCardNumber,
                                //     errMsgs,
                                //     setErrMsgs
                                //   );
                              }}
                              required
                            />
                            <p className="error-msg">
                              {errMsgs["cardNumber"]
                                ? errMsgs["cardNumber"]
                                : ""}
                            </p>
                          </div>
                          <div className="lInput w-48">
                            <label>
                              <b>Event Description:</b>
                            </label>
                            <textarea
                              name="description"
                              placeholder="Enter description..."
                              // value={description}
                              // onChange={(e) => setDescription(e.target.value)}
                            />
                            {/* <input
                                className=""
                                type="text"
                                id="cardExpiry"
                                placeholder="MM/YY"
                                maxLength={5}
                                onChange={
                                  (e) => {}
                                  //   validateCardExpiry(
                                  //     e,
                                  //     setCardExpiry,
                                  //     errMsgs,
                                  //     setErrMsgs
                                  //   )
                                }
                                required
                              /> */}
                            <p className="error-msg">
                              {errMsgs["cardExpiry"]
                                ? errMsgs["cardExpiry"]
                                : ""}
                            </p>
                          </div>
                          <div className="lInput w-48">
                            <label>
                              <b>Event Location:</b>
                            </label>
                            <input
                              className=""
                              type="text"
                              maxLength={16}
                              id="cardNumber"
                              placeholder="1234 1234 1234 1234"
                              onChange={(e) => {
                                //   validateCardNumber(
                                //     e,
                                //     setCardNumber,
                                //     errMsgs,
                                //     setErrMsgs
                                //   );
                              }}
                              required
                            />
                            <p className="error-msg">
                              {errMsgs["cardNumber"]
                                ? errMsgs["cardNumber"]
                                : ""}
                            </p>
                          </div>
                          <div className="lInput w-48">
                            <label>
                              <b>Event Start:</b>
                            </label>
                            <div>
                              <Datetime />
                            </div>
                            <p className="error-msg">
                              {errMsgs["cardCvc"] ? errMsgs["cardCvc"] : ""}
                            </p>
                          </div>
                          <div className="lInput w-48">
                            <label>
                              <b>Event End:</b>
                            </label>
                            <div>
                              <Datetime />
                            </div>
                            <p className="error-msg">
                              {errMsgs["cardCvc"] ? errMsgs["cardCvc"] : ""}
                            </p>
                          </div>
                          <button
                            className="btn-primary"
                            type="submit"
                            onClick={() => {}}
                          >
                            Save
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
  } else {
    let startTime = convertTo12Hour(eventStartTime.split(" ")[1]);

    const startDate = new Date(eventStartTime.split(" ")[0]);
    const formattedStartDate = startDate
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");

    let endTime = convertTo12Hour(eventEndTime.split(" ")[1]);

    const endDate = new Date(eventEndTime.split(" ")[0]);
    const formattedEndDate = endDate
      .toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      })
      .replace(/\//g, "-");
    return (
      <div className="container" id="resident-dashboard-amenity-modal">
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
                // setMembershipModalIsOpen(false);
                // setPaymentModalisOpen(true);
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
                  {formattedStartDate} {startTime}
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
                  {formattedEndDate} {endTime}
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
              {locationDetails[eventLocation]["address"]}
            </div>
            <button
              className="btn-red ms-5"
              style={{ paddingLeft: 16, paddingRight: 16 }}
              onClick={() => {
                navigate("/driving-instructions", {
                  state: {
                    destination: locationDetails,
                  },
                });
              }}
            >
              Driving Instructions
            </button>
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
