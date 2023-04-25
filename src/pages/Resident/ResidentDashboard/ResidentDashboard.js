import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./resident.scss";
import "../../../App.scss";
import {
  deleteVehicle,
  getResidentVisitRequests,
  getServices,
  getVehicles,
  getVisitRequests,
  updateVisitRequest,
} from "../../../services/services";
import Modal from "react-modal";
import Loader from "../../../components/loader/Loader";
import { convertTo12Hour } from "../../../utils/utils.js";
import Membership from "../Membership";
import { Weekdays } from "../../../utils/constants";
import Payment from "../Payment";
import EventDetails from "../../Manager/EventDetails";
import AmenityAccess from "./AmenityAccess";
import RequestAccess from "./RequestAccess";

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

const membershipCustomStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "80vh",
    maxWidth: "80vw",
    minWidth: "80vw",
    zIndex: 30,
  },
};

Modal.setAppElement(document.getElementById("resident-dashboard"));

function ResidentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("resident");
  const [active, setActive] = useState("home");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenityId, setSelectedAmenityId] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [membershipModalIsOpen, setMembershipModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalisOpen] = useState(false);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [visits, setVisits] = useState([]);
  const [acceptModalIsOpen, setAcceptModalIsOpen] = useState(false);
  const [declineModalIsOpen, setDeclineModalIsOpen] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState(null);

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    setLoading(true);
    getServices().then((res) => setAmenities(res));
    getVehicles().then((res) => {
      setVehicles(res);
      setLoading(false);
    });
    let uid = user.id;
    getResidentVisitRequests({ uid }).then((res) => {
      setVisits(res.data)
      // setLoading(false);
    });
  };

  const changeType = (e) => {
    window.location.href = e.target.value;
  };

  const showAcceptRejectDialog = (isAccept) => {
    let val = isAccept ? 1 : 2;
    let data = { request_id: selectedVisitId, accepted: val };
    updateVisitRequest(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedVisitId(null);
          window.location.href = "/dashboard";
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error updating log:", error);
      });
  };

  const showDeleteVehicleDialog = () => {
    let data = { vehicle_id: selectedVehicleId };
    deleteVehicle(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedVehicleId(null);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting vehicle:", error);
      });
  };

  const handleReload = () => {
    window.location.reload();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else {
    return (
      <div className="pt-50 resident">
        {active == "home" ? (
          <div className="container">
            <div className="main" id="resident-dashboard">
              {modalIsOpen && (
                <Modal
                  isOpen={modalIsOpen}
                  onHide={() => setIsOpen(false)}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2>Delete Confirmation</h2>
                  <br></br>
                  <p>Are you sure you want to delete this item?</p>
                  <br></br>
                  <div className="text-right">
                    <button onClick={closeModal}>Cancel</button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button onClick={() => showDeleteVehicleDialog()}>
                      Delete
                    </button>
                  </div>
                </Modal>
              )}
              {membershipModalIsOpen && (
                <Modal
                  isOpen={membershipModalIsOpen}
                  onHide={() => setMembershipModalIsOpen(false)}
                  onRequestClose={() => {
                    setSelectedAmenityId(null);
                    setMembershipModalIsOpen(false);
                  }}
                  style={membershipCustomStyles}
                  contentLabel="Example Modal"
                >
                  <i
                    className="fa fa-times"
                    style={{ float: "right" }}
                    onClick={() => {
                      setMembershipModalIsOpen(false);
                    }}
                  ></i>
                  <Membership
                    amenity_id={selectedAmenityId}
                    onViewEventCick={(event_id) => {
                      setMembershipModalIsOpen(false);
                      setSelectedEventId(event_id);
                      setEventModalIsOpen(true);
                    }}
                    joinButton={
                      <button
                        className="btn-red ms-5"
                        style={{ paddingLeft: 16, paddingRight: 16 }}
                        onClick={() => {
                          setMembershipModalIsOpen(false);
                          setPaymentModalisOpen(true);
                        }}
                      >
                        Join Membership
                      </button>
                    }
                  />
                </Modal>
              )}

              {paymentModalIsOpen && (
                <Modal
                  isOpen={paymentModalIsOpen}
                  onHide={() => setPaymentModalisOpen(false)}
                  onRequestClose={() => {
                    // setSelectedAmenityId(null);
                    setPaymentModalisOpen(false);
                  }}
                  style={membershipCustomStyles}
                  contentLabel="Example Modal"
                >
                  <i
                    className="fa fa-times"
                    style={{ float: "right" }}
                    onClick={() => {
                      setPaymentModalisOpen(false);
                    }}
                  ></i>
                  <Payment
                    amenity_id={selectedAmenityId}
                    building={selectedBuilding}
                    onRequestClose={() => {
                      setPaymentModalisOpen(false);
                    }}
                  />
                </Modal>
              )}

              {eventModalIsOpen && (
                <Modal
                  isOpen={eventModalIsOpen}
                  onHide={() => setEventModalIsOpen(false)}
                  onRequestClose={() => {
                    // setSelectedAmenityId(null);
                    setEventModalIsOpen(false);
                  }}
                  style={membershipCustomStyles}
                  contentLabel="Example Modal"
                >
                  <i
                    className="fa fa-times"
                    style={{ float: "right" }}
                    onClick={() => {
                      setEventModalIsOpen(false);
                    }}
                  ></i>
                  <EventDetails
                    isEdit={true}
                    event_id={selectedEventId}
                    onRequestClose={() => {
                      setEventModalIsOpen(false);
                    }}
                  />
                </Modal>
              )}

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
                    <button onClick={() => setDeclineModalIsOpen(false)}>
                      Cancel
                    </button>
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
                    <button onClick={() => setAcceptModalIsOpen(false)}>
                      Cancel
                    </button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button onClick={() => showAcceptRejectDialog(true)}>
                      Confirm
                    </button>
                  </div>
                </Modal>
              )}
              <div className="box-container">
                {amenities &&
                  amenities.map((service) => {
                    const today = new Date();
                    const currentWeekday = Weekdays[today.getDay()]
                      .slice(0, 3)
                      .toLowerCase();

                    let startTime = convertTo12Hour(
                      service[currentWeekday + "_in_time"]
                    );
                    let endTime = convertTo12Hour(
                      service[currentWeekday + "_out_time"]
                    );
                    return (
                      <div
                        className="box box1"
                        onClick={() => {
                          setSelectedAmenityId(service.id);
                          setMembershipModalIsOpen(true);
                        }}
                      >
                        <div className="text">
                          <h2 className="topic-heading">{service.name}</h2>
                          <h2 className="topic">
                            {startTime} - {endTime}
                          </h2>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="container">
                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h2 className="recent-Articles">Registered Vehicles</h2>
                      <div className="d-flex justify-content-around">
                        <button
                          className="btn-red"
                          style={{ paddingLeft: 16, paddingRight: 16 }}
                          onClick={() => {
                            navigate("/add-vehicle", {
                              state: { navigateBack: true },
                            });
                          }}
                        >
                          Add Vehicle
                        </button>
                        {/* <button className="view">View All</button> */}
                      </div>
                    </div>

                    <div className="report-body table-container">
                      <table
                        style={{
                          width: "100%",
                          textAlign: "center",
                        }}
                      >
                        <thead>
                          <tr>
                            <th style={{ width: "10%" }}>Make</th>
                            <th style={{ width: "20%" }}>Model</th>
                            <th style={{ width: "32%" }}>Number Plate</th>
                            <th style={{ width: "19%" }}>Color</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.map((vehicle, index) =>
                            vehicle.user_id == user.id ? (
                              <tr>
                                <td>{vehicle.make}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.number_plate}</td>
                                <td className="visitor-table-request-visited">
                                  {vehicle.color}
                                </td>
                                <td>
                                  {/* <div className="visitor-schedule-action-container">
                                  <a>
                                    <img
                                      src="./images/more_vert.png"
                                      height="24px"
                                      width="24px"
                                    />
                                  </a>
                                </div> */}
                                  <div className="dropdown-container">
                                    <i className="fa fa-ellipsis-v dropdown-icon" />
                                    <ul className="dropdown-menu text-left">
                                      <li
                                        key={vehicle.id + "edit"}
                                        onClick={() => {
                                          navigate(
                                            `/edit-vehicle/${vehicle.id}`
                                          );
                                        }}
                                      >
                                        Edit
                                      </li>
                                      <li
                                        key={vehicle.id + "delete"}
                                        onClick={() => {
                                          setSelectedVehicleId(vehicle.id);
                                          openModal();
                                        }}
                                      >
                                        Delete
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
                    </div>
                  </div>
                </div>

                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h2 className="recent-Articles">Visitor Requests</h2>
                      <button className="view">View All</button>
                    </div>

                    <div className="report-body">
                      {visits && visits.length > 0 ? (
                        <table>
                          <tbody>
                            <tr>
                              <th>Request Id</th>
                              <th>Name</th>
                              <th>Reason</th>
                              <th>In-Time/Out-Time</th>
                              <th>Status</th>
                              <th style={{ width: "5%" }}></th>
                            </tr>
                            {visits.length > 0 &&
                              visits.map((v) => {
                                let iDateString = v.in_time;
                                const idate = new Date(iDateString + "Z");
                                const localInDate = idate.toLocaleString();

                                let oDateString = v.out_time;
                                const odate = new Date(oDateString + "Z");
                                const localOutDate = odate.toLocaleString();
                                return (
                                  <tr>
                                    <td>{v.id}</td>
                                    <td>
                                      {v.visitor.fname} {v.visitor.lname}
                                    </td>
                                    <td>{v.reason}</td>
                                    <td>
                                      {localInDate}-{localOutDate}
                                    </td>
                                    <td>
                                      {v.accepted != 0
                                        ? v.accepted == 1
                                          ? "Accepted"
                                          : "Rejected"
                                        : "Requested"}
                                    </td>
                                    <td>
                                      <div className="dropdown-container">
                                        <i className="fa fa-ellipsis-v dropdown-icon" />
                                        <ul className="dropdown-menu text-left">
                                          <li
                                            key={v.id + "accept"}
                                            onClick={() => {
                                              setSelectedVisitId(v.id);
                                              setAcceptModalIsOpen(true);
                                            }}
                                          >
                                            Accept
                                          </li>
                                          <li
                                            key={v.id + "decline"}
                                            onClick={() => {
                                              setSelectedVisitId(v.id);
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
                              })}
                          </tbody>
                        </table>
                      ) : (
                        "No requests yet."
                      )}
                    </div>
                  </div>
                </div>
                {/* 
                <div className="report">
                  <div className="report-container">
                    <div className="report-header d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Service Requests</h1>
                      <button className="view">View All</button>
                    </div>

                    <div className="report-body">
                      <table style={{ width: "100%", textAlign: "center" }}>
                        <thead>
                          <tr>
                            <th style={{ width: "25%" }}>Request Id</th>
                            <th style={{ width: "35%" }}>Type</th>
                            <th style={{ width: "35%" }}>Status</th>
                            <th style={{ width: "5%" }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Electricity</td>
                            <td className="visitor-table-request-visited">
                              In-Progress
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Plumbing</td>
                            <td className="visitor-table-request-visited">
                              In-Progress
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Guest</td>
                            <td className="visitor-table-request-requested">
                              Requested
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>4</td>
                            <td>Guest</td>
                            <td className="visitor-table-request-requested">
                              Requested
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>5</td>
                            <td>Housekeeping</td>
                            <td className="visitor-table-request-approved">
                              Completed
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>6</td>
                            <td>Delivery</td>
                            <td className="visitor-table-request-approved">
                              Completed
                            </td>
                            <td>
                              <div className="visitor-schedule-action-container">
                                <a>
                                  <img
                                    src="./images/more_vert.png"
                                    height="24px"
                                    width="24px"
                                  />
                                </a>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div> */}

                {/* <div className="report">
                  <div className="report-container">
                    <div className=" d-flex justify-content-between align-items-center">
                      <h1 className="recent-Articles">Request Access for Amenity</h1>
                    </div>
                    <RequestAccess user={user}/>
                    
                  </div>
                </div> */}
                <div className="report">
                  <div className="report-container">
                    <AmenityAccess user={user} amenities={amenities} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">Dashboard</div>
        )}
      </div>
    );
  }
}

export default ResidentDashboard;
