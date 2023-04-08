import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  addVehicle,
  getAmenityDetails,
  getEvents,
  getPayments,
  getUser,
  getVehicleDetails,
  leaveMembership,
  updateVehicleDetails,
} from "../../services/services";
import "./ResidentDashboard/resident.scss";
import Modal from "react-modal";
import "../../App.scss";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";

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

function Membership(props) {
  const navigate = useNavigate();
  const [amenity_id, setAmenity_id] = useState(props.amenity_id);
  const [loading, setLoading] = useState(true);
  const [amenityDetails, setAmenityDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [leaveConfirmationIsOpen, setLeaveConfirmationIsOpen] =
    React.useState(false);

  useEffect(() => {
    if (amenity_id != "") {
      //   setLoading(true);
      initData();
    }

  }, []);

  const initData = () => {
    let data = {
      amenity_id: amenity_id,
    };

    getAmenityDetails(data)
      .then((response) => {
        if (response.status == 200) {
          setAmenityDetails(response.amenity_details);
          const currentTime = new Date();
          let eventsRequest = {
            start_time: currentTime.toISOString(),
            type: response.amenity_details.name.toLowerCase(),
          };

          getEvents(eventsRequest)
            .then((response) => {
              setLoading(false);
              if (response.status == 200) {
                setEvents(response.events);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeMembership = () => {
    let data = { membership_id: amenity_id, user_id: user.id };
    leaveMembership(data)
      .then((res) => {
        if (res.status == 200) {
          setLeaveConfirmationIsOpen(false);
          alert(res.message);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error removing membership:", error);
      });
  };

  const handleReload = () => {
    setLoading(true);
    getUserDetails();
  };

  const getUserDetails = () => {
    let data = { user_id: user.id };
    getUser(data)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("user", JSON.stringify(res.user_details));
          setUser(JSON.stringify(res.user_details));
          initData();
          //   window.location.reload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error getting user details:", error);
      });
  };

  if (loading) {
    return (
      <div>
        {/* <button onClick={handleButtonClick}>Load Data</button> */}
        {loading && <Loader />}
      </div>
    );
  } else {
    let membershipsList = JSON.parse(user.memberships);

    return (
      <div className="pt-50 resident" id="visitor">
        <div
          className="container"
          id="resident-dashboard-amenity-modal"
          style={{ width: "100%" }}
        >
          {leaveConfirmationIsOpen && (
            <Modal
              isOpen={leaveConfirmationIsOpen}
              onHide={() => setLeaveConfirmationIsOpen(false)}
              onRequestClose={() => {
                setLeaveConfirmationIsOpen(false);
              }}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <h2>Confirmation</h2>
              <br></br>
              <p>Are you sure you want to leave this membership?</p>
              <br></br>
              <div className="text-right">
                <button
                  className="p-1 btn-outline-red"
                  onClick={() => {
                    setLeaveConfirmationIsOpen(false);
                  }}
                >
                  Cancel
                </button>
                &ensp;&ensp;&ensp;&ensp;
                <button
                  className="p-1 btn-red"
                  onClick={() => removeMembership()}
                >
                  Confirm
                </button>
              </div>
            </Modal>
          )}
          <div className="container">
            <div className="report">
              <div className="report-container">
                <div className="visitor-box-container">
                  <div className="box1">
                    <div className="text d-flex">
                      <h1 className="red">{amenityDetails.name} Amenity</h1>
                      {membershipsList && membershipsList.indexOf(amenityDetails.id) > -1 == 0 ? (
                        props.joinButton
                      ) : (
                        <button
                          className="btn-outline-red ms-5"
                          style={{ paddingLeft: 16, paddingRight: 16 }}
                          onClick={() => {
                            setLeaveConfirmationIsOpen(true);
                          }}
                        >
                          Leave Membership
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="report-container">
                  <div className="report-header">
                    {amenity_id != "" ? (
                      <div className="container">
                        <br />
                        <h2 className="text-left">Timings</h2>
                        <ul
                          className="text-left"
                          style={{ listStyleType: "none" }}
                        >
                          {Weekdays.map((day, index) => {
                            let dayString = day.slice(0, 3).toLowerCase();
                            let startTime = convertTo12Hour(
                              amenityDetails[dayString + "_in_time"]
                            );

                            let endTime = convertTo12Hour(
                              amenityDetails[dayString + "_out_time"]
                            );

                            return (
                              <li key={index}>
                                <div className="d-flex container row">
                                  {" "}
                                  <div
                                    style={{
                                      width: "5%",
                                    }}
                                  >
                                    <b>{day}:</b>
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "left",
                                      paddingLeft: "10%",
                                    }}
                                  >
                                    {startTime}-{endTime}
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <br />
                        <h2 className="text-left">Upcoming Events</h2>
                        <div className="container table-container">
                          {events.length === 0 ? (
                            <div>
                              <h3 className="text-left">No Upcoming Eventss</h3>
                            </div>
                          ) : (
                            <table
                              style={{ marginTop: "4vh" }}
                              className="table-striped"
                            >
                              <thead className="thead-light">
                                <tr>
                                  <th
                                    scope="col"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      width: "34%",
                                    }}
                                  >
                                    Description
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      width: "20%",
                                    }}
                                  >
                                    Location
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      width: "16%",
                                    }}
                                  >
                                    Start Time
                                  </th>
                                  <th
                                    scope="col"
                                    style={{
                                      width: "16%",
                                    }}
                                  >
                                    End Time
                                  </th>
                                  <th
                                    style={{
                                      width: "4%",
                                    }}
                                  ></th>
                                </tr>
                              </thead>
                              <tbody className="tbody">
                                {events.map((event, index) =>
                                  1 == 1 ? (
                                    <tr>
                                      <td>{event.name}</td>
                                      <td className="text-justify">
                                        {event.description.slice(0, 100)}...
                                      </td>
                                      <td>{event.location}</td>
                                      <td>{event.start_time}</td>
                                      <td>{event.end_time}</td>
                                      <td className="text-center">
                                        <div className="dropdown-container">
                                          <i className="text-center fa fa-ellipsis-v dropdown-icon" />
                                          <ul className="dropdown-menu text-left">
                                            <li
                                              key={event.id + "edit"}
                                              onClick={() => {
                                                //   navigate(
                                                //     `/edit-vehicle/${vehicle.id}`
                                                //   );
                                              }}
                                            >
                                              View
                                            </li>
                                            <li
                                              key={event.id + "delete"}
                                              onClick={() => {
                                                //   setSelectedVehicleId(vehicle.id);
                                                //   openModal();
                                              }}
                                            >
                                              {registeredEvents.indexOf(
                                                event.id
                                              ) > -1
                                                ? "Cancel Registration"
                                                : "Register"}
                                            </li>
                                          </ul>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : (
                                    ""
                                  )
                                )}
                              </tbody>
                            </table>
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Membership;
