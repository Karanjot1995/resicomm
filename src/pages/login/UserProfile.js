import React, { useState, useEffect } from "react";
import { getUser, register, updateUser } from "../../services/services";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import "./login.scss";
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
// import { setUserData } from "../actions";
// import { useHistory } from "react-router-dom";

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
    // let selected = window.location.pathname.replace("/", "");
    // setUserType(selected);
    // console.log();
    setFname(user.fname);
    setLname(user.lname);
    setFullPhone(user.phone);
    setFname(user.fname);
    setLoading(false);
    setDob(user.dob);
    setLicenseNumber(user.license_number);
    setCountryCodeAndPhone();
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
    return (
      <div className="pt-50 resident profile" id="visitor">
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
                                  <option value="" disabled>
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
                          {/* <div className="d-flex justify-content-center">
                          <div className="d-grid">
                            <label for="vehicle_number">Gender:</label>
                            <select id="vehicle_number" name="vehicle_number">
                              <option value="">Select Gender</option>
                              <option value="M" selected>
                                Male
                              </option>
                              <option value="F">Female</option>
                              <option value="O">Other</option>
                            </select>
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-flex">
                            <div className="d-inline">
                              <label for="apartment_number">
                                Date of Birth:
                              </label>
                              <input
                                type="text"
                                id="apartment_number"
                                name="apartment_number"
                                value="07/16/1997"
                              />
                            </div>
                          </div>
                        </div>
                        <br /> */}
                          <div className="d-flex">
                            <div className="d-inline">
                              <label for="apartment_number">Building:</label>
                              <input
                                disabled="true"
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
                                <label for="apartment_number">
                                  Apt. Number:
                                </label>
                                <input
                                  disabled="true"
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
                          {/* <div className="d-flex">
                          <div className="d-inline">
                            <label for="apartment_number">City:</label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="Arlington"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-grid">
                            <label for="vehicle_number">State:</label>
                            <select
                              id="vehicle_number"
                              name="vehicle_number"
                              className="mt-8"
                            >
                              <option value="">Select State</option>
                              <option value="AL">Alabama</option>
                              <option value="AK">Alaska</option>
                              <option value="AZ">Arizona</option>
                              <option value="AR">Arkansas</option>
                              <option value="CA">California</option>
                              <option value="CO">Colorado</option>
                              <option value="CT">Connecticut</option>
                              <option value="DE">Delaware</option>
                              <option value="DC">District Of Columbia</option>
                              <option value="FL">Florida</option>
                              <option value="GA">Georgia</option>
                              <option value="HI">Hawaii</option>
                              <option value="ID">Idaho</option>
                              <option value="IL">Illinois</option>
                              <option value="IN">Indiana</option>
                              <option value="IA">Iowa</option>
                              <option value="KS">Kansas</option>
                              <option value="KY">Kentucky</option>
                              <option value="LA">Louisiana</option>
                              <option value="ME">Maine</option>
                              <option value="MD">Maryland</option>
                              <option value="MA">Massachusetts</option>
                              <option value="MI">Michigan</option>
                              <option value="MN">Minnesota</option>
                              <option value="MS">Mississippi</option>
                              <option value="MO">Missouri</option>
                              <option value="MT">Montana</option>
                              <option value="NE">Nebraska</option>
                              <option value="NV">Nevada</option>
                              <option value="NH">New Hampshire</option>
                              <option value="NJ">New Jersey</option>
                              <option value="NM">New Mexico</option>
                              <option value="NY">New York</option>
                              <option value="NC">North Carolina</option>
                              <option value="ND">North Dakota</option>
                              <option value="OH">Ohio</option>
                              <option value="OK">Oklahoma</option>
                              <option value="OR">Oregon</option>
                              <option value="PA">Pennsylvania</option>
                              <option value="RI">Rhode Island</option>
                              <option value="SC">South Carolina</option>
                              <option value="SD">South Dakota</option>
                              <option value="TN">Tennessee</option>
                              <option value="TX" selected>
                                Texas
                              </option>
                              <option value="UT">Utah</option>
                              <option value="VT">Vermont</option>
                              <option value="VA">Virginia</option>
                              <option value="WA">Washington</option>
                              <option value="WV">West Virginia</option>
                              <option value="WI">Wisconsin</option>
                              <option value="WY">Wyoming</option>
                            </select>
                            <br />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div className="d-inline">
                            <label for="building_number">Zip:</label>
                            <input
                              type="text"
                              id="building_number"
                              name="building_number"
                              value="76013"
                            />
                          </div>
                        </div>
                        <br /> */}
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
