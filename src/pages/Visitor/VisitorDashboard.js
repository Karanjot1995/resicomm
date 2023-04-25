import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import "./visitor.scss";
import "./../../App.scss";
import "./visitor.scss";
import {
  deleteVehicle,
  deleteVisitRequest,
  getServices,
  getVehicles,
  getVisitRequests,
} from "../../services/services";
import Modal from "react-modal";
import {
  Weekdays,
  customStyles,
  membershipCustomStyles,
} from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";
import Loader from "../../components/loader/Loader";
import Membership from "../Resident/Membership";
import EventDetails from "../Manager/EventDetails";
import Payment from "../Resident/Payment";
import AmenityAccess from "../Resident/ResidentDashboard/AmenityAccess";

Modal.setAppElement(document.getElementById("visitor-dashboard"));

function VisitorDashboard() {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenityId, setSelectedAmenityId] = useState(null);
  const [membershipModalIsOpen, setMembershipModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [visits, setVisits] = useState([]);
  const [paymentModalIsOpen, setPaymentModalisOpen] = useState(false);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    setLoading(true);
    let guest_id = user.id;
    getServices().then((res) => setAmenities(res));
    getVehicles().then((res) => {
      setVehicles(res);
    });
    getVisitRequests({ guest_id }).then((res) => {
      setVisits(res.data);
      setLoading(false);
    });
  }, []);

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
        console.error("Error resetting password:", error);
      });
  };

  const showDeleteRequestDialog = () => {
    let data = { request_id: selectedRequestId };
    deleteVisitRequest(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedRequestId(null);
          handleReload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
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

  const changeType = (e) => {
    window.location.href = e.target.value;
  };

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else {
    return (
      <div className="pt-50 resident" id="visitor">
        <div>
          <div className="container">
            <div className="main" id="visitor-dashboard">
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
              {modalIsOpen && (
                <Modal
                  isOpen={modalIsOpen}
                  onAfterClose={() => {
                    setSelectedVehicleId(null);
                    setSelectedRequestId(null);
                    setIsOpen(false);
                  }}
                  onHide={() => {
                    setSelectedVehicleId(null);
                    setSelectedRequestId(null);
                    setIsOpen(false);
                  }}
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
                    <button
                      onClick={() => {
                        if (selectedRequestId != null) {
                          showDeleteRequestDialog();
                        } else {
                          showDeleteVehicleDialog();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
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
              <div className="report-container">
                <div className="report-header d-flex justify-content-between align-items-center">
                  {/* <button
                  className="view"
                  onClick={() => navigate("/create-request")}
                >
                  Create a visit request
                </button> */}
                </div>
              </div>
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
                    <AmenityAccess
                      user={user}
                      amenities={amenities}
                    />
                  </div>
                </div>
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
                                <td className="">{vehicle.color}</td>
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
                      <h2 className="recent-Articles">Visitation Requests</h2>
                      <button
                        className="view"
                        onClick={() => navigate("/create-request")}
                      >
                        Create a visit request
                      </button>
                      {/* <button className="view">View All</button> */}
                    </div>

                    <div className="report-body">
                      {visits.length > 0 ? (
                        <table>
                          <tbody>
                            <tr>
                              <th>Request Id</th>
                              <th>Resident</th>
                              <th>Building-Apartment Unit</th>
                              <th>In-Time/Out-Time</th>
                              <th>Status</th>
                              <th></th>
                            </tr>
                            {visits.map((v) => {
                              let property_details =
                                v.resident.property_details;

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
                                    {v.resident.fname} {v.resident.lname}
                                  </td>
                                  <td>
                                    {v.resident.property_details
                                      ? v.resident.property_details.building +
                                        "-" +
                                        v.resident.apt
                                      : ""}
                                  </td>
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
                                    <div className="visitor-schedule-action-container d-flex">
                             
                                    {v.accepted != 0 &&  <button
                                        className="driving-instructions"
                                        onClick={() =>
                                          navigate("/driving-instructions", {
                                            state: {
                                              destination: property_details,
                                            },
                                          })
                                        }
                                      >
                                        Driving Instructions
                                      </button>}

                                      <div className="dropdown-container ps-2 pe-2">
                                        <i className="fa fa-ellipsis-v dropdown-icon" />
                                        <ul className="dropdown-menu text-left">
                                          <li
                                            key={v.id + "edit"}
                                            onClick={() => {
                                              navigate(`/edit-request/${v.id}`);
                                            }}
                                          >
                                            Edit
                                          </li>
                                          <li
                                            key={v.id + "delete"}
                                            onClick={() => {
                                              setSelectedRequestId(v.id);
                                              openModal();
                                            }}
                                          >
                                            Delete
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      ) : (
                        "No visitation requests yet!"
                      )}
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
}

export default VisitorDashboard;
