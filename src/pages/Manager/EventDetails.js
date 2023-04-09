import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  addPayment,
  addVehicle,
  getAmenityDetails,
  getEventDetails,
  getEvents,
  getPayments,
  getUser,
  getVehicleDetails,
  joinMembership,
  leaveMembership,
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

function EventDetails(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event_id, setEvent_id] = useState(props.event_id);
  const [eventDetails, setEventDetails] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [errMsgs, setErrMsgs] = useState({});
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventStartTime, setEventStartTime] = useState("");
  const [eventEndTime, seteventEndTime] = useState({});
  const [eventLocation, setEventLocation] = useState("");
  const [eventType, setEventType] = useState("");

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
          setEventDetails(response.event_details);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReload = () => {
    // setLoading(true);
    // getUserDetails();
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
  } else {
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

                {isEdit ? (
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
                              <input
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
                              />
                              <p className="error-msg">
                                {errMsgs["cardExpiry"]
                                  ? errMsgs["cardExpiry"]
                                  : ""}
                              </p>
                            </div>
                            <div className="lInput w-48">
                              <label>
                                <b>Event Start:</b>
                              </label>
                              <Datetime
                                value={eventStartTime}
                                onChange={(newDate) => {
                                  console.log("newDate is " + newDate);
                                }}
                              />
                              {/* <input
                            className=""
                            type="text"
                            id="cardCvc"
                            placeholder="CVC"
                            maxLength={3}
                            onChange={
                              (e) => {}
                              //   validateCardCvc(
                              //     e,
                              //     setCardCvc,
                              //     errMsgs,
                              //     setErrMsgs
                              //   )
                            }
                            required
                          /> */}
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
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetails;
