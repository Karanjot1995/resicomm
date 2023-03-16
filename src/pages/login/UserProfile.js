import React, { useState, useEffect } from "react";
import { register } from "../../services/services";
import { useNavigate } from "react-router-dom";
import "../../App.scss";
import "./login.scss";
import {
  validateCity,
  validateCountry,
  validateEmail,
  validateFirstName,
  validateLastName,
  validateName,
  validatePassword,
  validatePhone,
  validateState,
  validateStreet,
  validateZip,
} from "../../utils/validation";
// import { setUserData } from "../actions";
// import { useHistory } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("resident");
  const [Email, setEmail] = useState("");
  const [UserPassword, setPassword] = useState("");
  const [name, setName] = useState("");
  const [PhoneNo, setPhone] = useState(null);
  const [DOB, setDob] = useState(null);
  const [country, setCountry] = useState("");
  const [homeState, setHomeState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [errMsgs, setErrMsgs] = useState({});

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  useEffect(() => {
    let selected = window.location.pathname.replace("/", "");
    setUserType(selected);
    console.log();
  });

  const changeType = (e) => {
    window.location.href = e.target.value;
  };
  return (
    <div className="pt-50 resident" id="visitor">
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
                        <div class="d-flex justify-content-center">
                          <div class="d-inline">
                            <label for="apartment_number">First Name:</label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="John"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div class="d-inline">
                            <label for="building_number">Last Name:</label>
                            <input
                              type="text"
                              id="building_number"
                              name="building_number"
                              value="Doe"
                            />
                          </div>
                        </div>
                        <br />
                        <div class="d-flex justify-content-center">
                          <div class="d-inline">
                            <label for="apartment_number">Phone Number:</label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="62375375264"
                            />
                          </div>
                        </div>
                        <br />
                        <div class="d-flex justify-content-center">
                          <div class="d-grid">
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
                          <div class="d-flex">
                            <div class="d-inline">
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
                        <br />
                        <div class="d-flex">
                          <div class="d-inline">
                            <label for="apartment_number">
                              Street Address:
                            </label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="410 Kerby St."
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div class="d-flex">
                            <div class="d-inline">
                              <label for="apartment_number">Apt. Number:</label>
                              <input
                                type="text"
                                id="apartment_number"
                                name="apartment_number"
                                value="195"
                              />
                            </div>
                          </div>
                        </div>

                        <br />
                        <div class="d-flex">
                          <div class="d-inline">
                            <label for="apartment_number">City:</label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="Arlington"
                            />
                          </div>
                          &nbsp; &nbsp; &nbsp; &nbsp;
                          <div class="d-grid">
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
                          <div class="d-inline">
                            <label for="building_number">Zip:</label>
                            <input
                              type="text"
                              id="building_number"
                              name="building_number"
                              value="76013"
                            />
                          </div>
                        </div>
                        <br />
                        <hr class="hr-rounded" />
                        <br />
                        <div class="d-flex justify-content-center">
                          <div class="d-inline">
                            <label for="apartment_number">
                              Driving License Number:
                            </label>
                            <input
                              type="text"
                              id="apartment_number"
                              name="apartment_number"
                              value="D36FG5HJW2QFNHGFDE32"
                            />
                          </div>
                        </div>
                        <br />
                        <hr class="hr-rounded" />
                        <br />

                        <button
                          type="submit"
                          class="btn-primary"
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

export default UserProfile;
