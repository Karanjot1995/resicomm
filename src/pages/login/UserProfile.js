import React, { useState, useEffect } from "react";
import {
  getLocations,
  getPayments,
  getUser,
  register,
  updateUser,
} from "../../services/services";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import "./login.scss";
import Modal from "react-modal";
import Payment from "./../Resident/Payment";
import {
  validateCity,
  validateCountry,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateLicenseNumber,
  validateName,
  validatePassword,
  validateState,
  validateStreet,
  validateZip,
} from "../../utils/validation";
import { country_code_list } from "../../utils/constants";
import Loader from "../../components/loader/Loader";

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

Modal.setAppElement(document.getElementById("visitor"));

function UserProfile() {
  const navigate = useNavigate();

  // const [userType, setUserType] = useState("resident");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [loading, setLoading] = useState(true);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [PhoneNo, setPhone] = useState("null");
  const [fullPhone, setFullPhone] = useState(null);
  const [DOB, setDob] = useState(null);
  const [errMsgs, setErrMsgs] = useState({});
  const [propertyDetails, setPropertyDetails] = useState({});
  const [paymentList, setPaymentList] = useState([]);
  const [paymentModalIsOpen, setPaymentModalisOpen] = useState(false);

  const validatePhone = (code, phone, setPhone, errMsgs, setErrMsgs) => {
    const countryCode = code;
    const phoneNumber = phone;
    const regex = /^\d{10}$/;

    if (regex.test(phoneNumber)) {
      setPhone(countryCode + " " + phoneNumber);
      setErrMsgs((prevState) => ({ ...prevState, phone: "" }));
    } else {
      setPhone("");
      setErrMsgs((prevState) => ({
        ...prevState,
        phone: "Please enter a valid 10-digit phone number.",
      }));
    }
  };

  useEffect(() => {
    console.log("user is ", JSON.stringify(user));
    setFname(user.fname);
    setLname(user.lname);
    setFullPhone(user.phone);
    setFname(user.fname);
    // setLoading(false);
    setDob(user.dob);
    setLicenseNumber(user.license_number);
    setCountryCodeAndPhone();
    getPaymentDetails();
    getPropertyDetails();
  }, [user]);

  const setCountryCodeAndPhone = () => {
    if (user.phone && user.phone.startsWith("+")) {
      const [country, numberValue] = user.phone.split(" ");
      setCountryCode(country);
      setPhone(numberValue);
    } else {
      setCountryCode("");
      setPhone(fullPhone);
    }
    // console.log(fullPhone);
  };

  function chkLen(e, l) {
    if (e.target.value.length > l) e.target.value = e.target.value.slice(0, l);
  }

  const getPaymentDetails = () => {
    let data = {
      user_id: user.id,
      payment_type: "rent",
    };
    getPayments(data)
      .then((response) => {
        if (response.status == 200) {
          let object = [];
          response.payments.map((item) => {
            object.push(item);
          });
          setPaymentList(object);
          // setLoading(false);
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

  const getPropertyDetails = () => {
    getLocations()
      .then((response) => {
        if (response.status == 200) {
          let object = {};
          response.locations.map((item) => {
            object[item.id] = item;
          });
          setPropertyDetails(object);
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

  const updateUserData = async (e) => {
    e.preventDefault();
    let valid = true;
    for (const key in errMsgs) {
      if (errMsgs[key] && key != "randomKey") {
        valid = false;
      }
    }
    if (!fName) {
      alert("Enter a valid First Name!");
    } else if (!lName) {
      alert("Enter a valid Last Name!");
    } else if (!countryCode) {
      alert("Please select a valid Country Code!");
    } else if (!fullPhone) {
      alert("Enter a valid Phone Number!");
    } else if (!DOB) {
      alert("Enter a valid Date of Birth!");
    } else {
      setLoading(true);
      // if (valid) {
      let data = {
        user_id: user.id,
        first_name: fName,
        last_name: lName,
        phone: fullPhone,
        dob: DOB,
        licenseNumber: licenseNumber,
      };
      updateUser(data)
        .then((response) => {
          setLoading(false);
          console.log(response);
          if (response.status == 200) {
            alert("Profile Successfully Updated");
            getUserDetails();
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error updating user:", error);
        });
    }
  };

  const getUserDetails = () => {
    let data = { user_id: user.id };
    getUser(data)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("user", JSON.stringify(res.user_details));
          setUser(res.user_details);
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error getting user details:", error);
      });
  };

  const changeType = (e) => {
    window.location.href = e.target.value;
  };

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else {
    // const dateStr = paymentList[0]["payment_date"];
    const dateStr =
      paymentList.length === 0 ? "" : paymentList[0]["payment_date"];
    const payment_date = new Date(dateStr);

    let currentDate = new Date();

    // create a new Date object for the given date
    let expDateString =
      paymentList.length === 0 ? "" : paymentList[0]["expiry_date"];
    let formattedExpDate = new Date(expDateString);

    // compare the two dates using getTime() method
    let datePassed = false;
    if (currentDate.getTime() > formattedExpDate.getTime()) {
      datePassed = true;
    }

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ); // get the first day of the current month
    const timeDiff = currentDate.getTime() - firstDayOfMonth.getTime(); // calculate the time difference in milliseconds
    const daysPassed = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return (
      <div className="pt-50 resident profile" id="visitor">
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
              amenity_id={""}
              building={""}
              payment_amount={parseFloat(
                propertyDetails[user.property_id]["amount"]
              ).toFixed(2)}
              onRequestClose={() => {
                setPaymentModalisOpen(false);
                getPaymentDetails();
              }}
            />
          </Modal>
        )}
        <div className="container">
          <div className="main">
            <div className="container">
              <div className="report">
                <div className="report-container">
                  <div className="visitor-box-container">
                    <div className=" box1">
                      <div className="text">
                        <div className="logo">Hi User</div>
                      </div>
                    </div>
                  </div>

                  <div className="report-container">
                    <div className="report-header">
                      <h1 className="recent-Articles">Profile</h1>
                    </div>
                    <div className="card text-center d-flex justify-content-center">
                      <div className="report-body">
                        <form>
                          <div className="d-flex justify-content-center">
                            <div className="d-inline">
                              <label>
                                <b>First Name:</b>
                              </label>
                              <input
                                className=""
                                type="text"
                                placeholder="John"
                                value={fName}
                                onChange={(e) =>
                                  validateFirstName(
                                    e,
                                    setFname,
                                    errMsgs,
                                    setErrMsgs
                                  )
                                }
                                required
                              />
                              <p className="error-msg">
                                {errMsgs["fname"] ? errMsgs["fname"] : ""}
                              </p>
                            </div>
                            &nbsp; &nbsp; &nbsp; &nbsp;
                            <div className="d-inline">
                              <label>
                                <b>Last Name:</b>
                              </label>
                              <input
                                className=""
                                type="text"
                                placeholder="Doe"
                                value={lName}
                                onChange={(e) =>
                                  validateLastName(
                                    e,
                                    setLname,
                                    errMsgs,
                                    setErrMsgs
                                  )
                                }
                                required
                              />
                              <p className="error-msg">
                                {errMsgs["lname"] ? errMsgs["lname"] : ""}
                              </p>
                            </div>
                          </div>
                          <br />
                          <div className="d-flex justify-content-center">
                            <div className="lInput pt-2">
                              <label>
                                <b>Country Code:</b>
                              </label>
                              <div className="phone-wrapper pt-2 w-100">
                                <select
                                  style={{
                                    lineHeight: 50,
                                    padding: "0px 20px",
                                    borderRadius: 4,
                                  }}
                                  defaultValue=""
                                  value={countryCode}
                                  className="country-code exclude"
                                  onChange={(e) => {
                                    setCountryCode(e.target.value);
                                    validatePhone(
                                      e.target.value,
                                      PhoneNo,
                                      setFullPhone,
                                      errMsgs,
                                      setErrMsgs
                                    );
                                  }}
                                  required
                                >
                                  <option value="" disabled={true}>
                                    Select country code
                                  </option>
                                  {country_code_list &&
                                    country_code_list.map((element) => {
                                      return (
                                        <option value={"+" + element.E164}>
                                          +{element.E164} (
                                          {element.country_name})
                                        </option>
                                      );
                                    })}
                                </select>
                              </div>
                              {/* <p className="error-msg">
                    {errMsgs["phone"] ? errMsgs["phone"] : ""}
                  </p> */}
                            </div>
                            <div className="d-inline w-100">
                              <label>
                                <b>Mobile:</b>
                              </label>
                              <input
                                className=""
                                type="number"
                                placeholder="Phone Number*"
                                maxLength="10"
                                value={PhoneNo}
                                onInput={(e) => chkLen(e, 10)}
                                onChange={
                                  (e) => {
                                    setPhone(e.target.value);
                                    validatePhone(
                                      countryCode,
                                      e.target.value,
                                      setFullPhone,
                                      errMsgs,
                                      setErrMsgs
                                    );
                                  }
                                  // validatePhone(e, setPhone, errMsgs, setErrMsgs)
                                }
                                required
                              />
                              <p className="error-msg">
                                {errMsgs["phone"] ? errMsgs["phone"] : ""}
                              </p>
                            </div>
                          </div>
                          <br />
                          {user.type != "visitor" ? (
                            <div className="d-flex">
                              <div className="d-inline">
                                <label htmlFor="apartment_number">
                                  <b>Building:</b>
                                </label>
                                <input
                                  disabled={true}
                                  type="text"
                                  id="apartment_number"
                                  name="apartment_number"
                                  placeholder="410 Kerby St."
                                  value={user.property_details.building}
                                  onFocus={(e) => {
                                    alert(
                                      "Building is assigned by your building manager!"
                                    );
                                  }}
                                />
                              </div>
                              &nbsp; &nbsp; &nbsp; &nbsp;
                              <div className="d-flex">
                                <div className="d-inline">
                                  <label htmlFor="apartment_number">
                                    <b> Apt. Number:</b>
                                  </label>
                                  <input
                                    disabled={true}
                                    type="text"
                                    id="apartment_number"
                                    name="apartment_number"
                                    placeholder="195"
                                    value={user.apt}
                                    onFocus={(e) => {
                                      alert(
                                        "Apartment number is assigned by your building manager!"
                                      );
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="lInput">
                            <label>
                              <b>Date of Birth:</b>
                            </label>
                            <input
                              className="exclude"
                              type="date"
                              value={DOB}
                              placeholder="Date of birth*"
                              onChange={(e) => {
                                setDob(e.target.value);
                              }}
                              required
                            />
                          </div>
                          <br />
                          <hr className="hr-rounded" />
                          <br />
                          <div className="d-flex justify-content-center">
                            <div className="d-inline">
                              <label>
                                <b> Driving License Number:</b>
                              </label>
                              <input
                                className=""
                                maxLength="10"
                                type="text"
                                value={licenseNumber}
                                placeholder="D36FG5HJW2QFNHGFDE32"
                                onChange={(e) =>
                                  validateLicenseNumber(
                                    e,
                                    setLicenseNumber,
                                    errMsgs,
                                    setErrMsgs
                                  )
                                }
                              />
                              <p className="error-msg">
                                {errMsgs["licenseNumber"]
                                  ? errMsgs["licenseNumber"]
                                  : ""}
                              </p>
                            </div>
                          </div>
                          <br />
                          <hr className="hr-rounded" />
                          <br />

                          <button
                            type="submit"
                            onClick={updateUserData}
                            className="btn-primary"
                            value="Submit"
                          >
                            Submit
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  {user.type === "resident" || user.type === "user" ? (
                    <div className="report-container">
                      <div className="report-header">
                        <h1 className="recent-Articles">Rent Details</h1>
                      </div>
                      <div className="card text-center">
                        <div className="report-body text-left">
                          <ul
                            className="text-left"
                            style={{ listStyleType: "none" }}
                          >
                            <li key="rent">
                              <div className="d-flex container row">
                                <div
                                  style={{
                                    width: "10%",
                                  }}
                                >
                                  <b>Monthly Rent:</b>
                                </div>
                                <div
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "10%",
                                  }}
                                >
                                  ${propertyDetails[user.property_id]["amount"]}
                                </div>
                              </div>
                            </li>
                            <li key="dueDate">
                              <div className="d-flex container row">
                                <div
                                  style={{
                                    width: "10%",
                                  }}
                                >
                                  <b>Due Date:</b>
                                </div>
                                <div
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "10%",
                                  }}
                                >
                                  1st of every month
                                </div>
                              </div>
                            </li>
                            <li key="lastPayment">
                              <div className="d-flex container row">
                                <div
                                  style={{
                                    width: "17%",
                                  }}
                                >
                                  <b>Last Payment Received:</b>
                                </div>
                                <div
                                  style={{
                                    textAlign: "left",
                                    paddingLeft: "3%",
                                  }}
                                >
                                  {payment_date.toUTCString().substring(0, 16)}
                                </div>
                              </div>
                            </li>
                          </ul>
                          <br />
                          {datePassed ? (
                            <div className="ms-3">
                              <p style={{ color: "red" }}>
                                You are {daysPassed} days past the due date!
                              </p>
                              <br />
                              <button
                                className="btn-red"
                                style={{ paddingLeft: 16, paddingRight: 16 }}
                                onClick={() => {
                                  setPaymentModalisOpen(true);
                                }}
                              >
                                Pay Rent
                              </button>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
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
    );
  }
}

export default UserProfile;
