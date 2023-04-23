import React, { useState, useEffect } from "react";
import {
  Weekdays,
  customStyles,
  membershipCustomStyles,
} from "../../utils/constants";
import { deleteEvent, updateAmenity } from "../../services/services";
import Loader from "../../components/loader/Loader";
import Modal from "react-modal";
import EventDetails from "../Manager/EventDetails.js";

Modal.setAppElement(document.getElementById("manager-dashboard"));

function ManagerType(props) {
  const [loading, setLoading] = useState(true);
  const [amenityDetails, setAmenityDetails] = useState(props.amenityDetails);
  const [events, setEvents] = useState(props.events);
  const [locationDetails, setLocationDetails] = useState(props.locationDetails);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [eventModalIsOpen, setEventModalIsOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const updateTimings = () => {
    updateAmenity(amenityDetails)
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

  useEffect(() => {
    if (amenityDetails && events) {
      setLoading(false);
    }
  }, [amenityDetails, events]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const showDeleteEventDialog = () => {
    let data = { id: selectedEventId };
    deleteEvent(data)
      .then((res) => {
        if (res.status == 200) {
          alert(res.message);
          setSelectedEventId(null);
          props.onUpdate();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error deleting request:", error);
      });
  };

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else {
    return (
      <div className="container" id="manager-dashboard">
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
              <button onClick={() => showDeleteEventDialog()}>Delete</button>
            </div>
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
              onUpdate={() => {
                setEventModalIsOpen(false);
                props.onUpdate();
              }}
              onRequestClose={() => {
                setEventModalIsOpen(false);
              }}
            />
          </Modal>
        )}
        <div className="main">
          <div className="report_Container">
            {/* <div className="report_Header">
            <h1 className="recent_Articles">Recent Reports</h1>
          </div> */}
            <div className="report-body">
              <div className="manage-timing">
                <h3>Manage Timings</h3>
                <br />
                <table
                  style={{
                    width: "100%",
                    textAlign: "center",
                    border: "none",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Weekday</th>
                      <th style={{ width: "20%" }}>From</th>
                      <th style={{ width: "20%" }}>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amenityDetails &&
                      Weekdays.map((day, index) => {
                        let dayString = day.slice(0, 3).toLowerCase();

                        return (
                          <tr>
                            <td
                              style={{
                                border: "none",
                              }}
                            >
                              <b> {day}</b>
                            </td>
                            <td
                              style={{
                                border: "none",
                              }}
                            >
                              {" "}
                              <input
                                className="w-25"
                                key={"start_" + index}
                                value={amenityDetails[dayString + "_in_time"]}
                                onChange={(e) => {
                                  setAmenityDetails({
                                    ...amenityDetails,
                                    [dayString + "_in_time"]: e.target.value,
                                  });
                                  // setStart(e.target.value);
                                }}
                                type="time"
                              />
                            </td>
                            <td
                              style={{
                                border: "none",
                              }}
                            >
                              {" "}
                              <input
                                className="w-25"
                                key={"end_" + index}
                                value={amenityDetails[dayString + "_out_time"]}
                                onChange={(e) => {
                                  setAmenityDetails({
                                    ...amenityDetails,
                                    [dayString + "_out_time"]: e.target.value,
                                  });
                                }}
                                type="time"
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div className="d-flex justify-content-between">
                  <div></div>
                  <button onClick={updateTimings} className="view">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div className="report">
            <div className="report-container">
              <div className="report-header d-flex justify-content-between align-items-center">
                <h2 className="text-left">Upcoming Events</h2>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn-red"
                    style={{ paddingLeft: 16, paddingRight: 16 }}
                    onClick={() => {
                      setSelectedEventId("");
                      setEventModalIsOpen(true);
                    }}
                  >
                    Create Event
                  </button>
                  {/* <button className="view">View All</button> */}
                </div>
              </div>

              <div className="container table-container">
                {events.length === 0 ? (
                  <div>
                    <h3 className="text-left">No Upcoming Eventss</h3>
                  </div>
                ) : (
                  <table style={{ marginTop: "4vh" }} className="table-striped">
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
                      {events.map((event, index) => {
                        let iDateString = event.start_time;
                              const idate = new Date(iDateString + "Z");
                              const localSDate = idate.toLocaleString();

                              let oDateString = event.end_time;
                              const odate = new Date(oDateString + "Z");
                              const locaEDate = odate.toLocaleString();
                        return (<tr>
                          <td>{event.name}</td>
                          <td className="text-justify">
                            {event.description.length > 100 ? event.description.slice(0, 100)+"..." : event.description}
                          </td>
                          <td>{locationDetails[event.location]["address"]}</td>
                          <td>{localSDate}</td>
                          <td>{locaEDate}</td>
                          <td className="text-center">
                            <div className="dropdown-container">
                              <i className="text-center fa fa-ellipsis-v dropdown-icon" />
                              <ul className="dropdown-menu text-left">
                                <li
                                  key={event.id + "edit"}
                                  onClick={() => {
                                    setSelectedEventId(event.id);
                                    setEventModalIsOpen(true);
                                    // props.onViewEventCick(event.id);
                                  }}
                                >
                                  View
                                </li>
                                <li
                                  key={event.id + "edit"}
                                  onClick={() => {
                                    setSelectedEventId(event.id);
                                    openModal();
                                    // props.onViewEventCick(event.id);
                                  }}
                                >
                                  Delete
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>)
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManagerType;
