import React, { useState, useEffect } from "react";
import { register } from "../../services/services";
import { useNavigate } from "react-router-dom";
import {
  validateCity,
  validateConfirmPassword,
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
import "font-awesome/css/font-awesome.min.css";
import "./login.scss";
import { country_code_list } from "../../utils/constants";
// import { setUserData } from "../actions";
// import { useHistory } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState("resident");
  const [Email, setEmail] = useState("");
  const [UserPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");
  const [PhoneNo, setPhone] = useState(null);
  const [fullPhone, setFullPhone] = useState(null);
  const [DOB, setDob] = useState(null);
  const [isVisitor, setIsVisitor] = useState(false);
  const [country, setCountry] = useState("");
  const [homeState, setHomeState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [errMsgs, setErrMsgs] = useState({});

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  // const userData = useSelector(state => state.user.userData)
  // const dispatch = useDispatch()

  const selectUserTyper = (type) => {
    setUserType(type);
  };

  const togglePasswordVisibility = () => {
    const passwordInput = document.querySelector(".password");
    const visibilityButton = document.querySelector(".toggle-visibility i");

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      visibilityButton.classList.remove("fa-eye");
      visibilityButton.classList.add("fa-eye-slash");
    } else {
      passwordInput.type = "password";
      visibilityButton.classList.remove("fa-eye-slash");
      visibilityButton.classList.add("fa-eye");
    }
  };

  const validatePhone = (code, phone, setPhone, errMsgs, setErrMsgs) => {
    const countryCode = code;
    const phoneNumber = phone;
    const regex = /^\d{10}$/;

    if (regex.test(phoneNumber)) {
      setPhone(countryCode + phoneNumber);
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
    // fetch("https://countrycode.dev/api/calls")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("data is " + data);
    //     setCountryCode(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching country codes:", error);
    //   });
  }, []);

  const registerUser = async (e) => {
    let data = {
      email: Email,
      password: UserPassword,
      first_name: fName,
      last_name: lName,
      phone: fullPhone,
      dob: DOB,
      isVisitor: isVisitor,
    };
    e.preventDefault();
    let valid = true;
    for (const key in errMsgs) {
      if (errMsgs[key] && key != "name") {
        valid = false;
      }
    }
    if (!fName) {
      alert("Enter a valid First Name!");
    } else if (!lName) {
      alert("Enter a valid Last Name!");
    } else if (!Email) {
      alert("Enter a valid Email!");
    } else if (!UserPassword) {
      alert("Enter a valid Password!");
    } else if (!confirmPassword || !passwordsMatch) {
      alert("Enter a valid Confirm Password!");
    } else if (!countryCode) {
      alert("Please select a valid Country Code!");
    } else if (!fullPhone) {
      alert("Enter a valid Phone Number!");
    } else if (!DOB) {
      alert("Enter a valid Date of Birth!");
    } else {
      // if (valid) {
      let data = {
        email: Email,
        password: UserPassword,
        first_name: fName,
        last_name: lName,
        phone: fullPhone,
        dob: DOB,
        isVisitor: isVisitor,
      };
      register(data)
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            alert("Successfully registered! Verify your email to continue.");
            window.location.href = '/login'
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          console.error("Error registering user:", error);
        });
    }
  };

  function chkLen(e, l) {
    if (e.target.value.length > l) e.target.value = e.target.value.slice(0, l);
  }

  return (
    <div className="login-page pt-50 register">
      <div className="login-body">
        <div className="login-form">
          <h1 className="login-title text-start">Register</h1>
          <form className="register-form" id="register-form">
            <div className="personal-info">
              <div className="">
                <div className="row-inputs">
                  <div className="lInput w-48">
                    <label>
                      <b>First Name:</b>
                    </label>
                    <input
                      className=""
                      type="text"
                      placeholder="John"
                      onChange={(e) =>
                        validateFirstName(e, setFname, errMsgs, setErrMsgs)
                      }
                      required
                    />
                    <p className="error-msg">
                      {errMsgs["fname"] ? errMsgs["fname"] : ""}
                    </p>
                  </div>

                  <div className="lInput w-48">
                    <label>
                      <b>Last Name:</b>
                    </label>
                    <input
                      className=""
                      type="text"
                      placeholder="Doe"
                      onChange={(e) =>
                        validateLastName(e, setLname, errMsgs, setErrMsgs)
                      }
                      required
                    />
                    <p className="error-msg">
                      {errMsgs["lname"] ? errMsgs["lname"] : ""}
                    </p>
                  </div>
                </div>

                <div className="lInput">
                  <label>
                    <b>Email:</b>
                  </label>
                  <input
                    className="email"
                    type="email"
                    placeholder="Email*"
                    onChange={(e) =>
                      validateEmail(e, setEmail, errMsgs, setErrMsgs)
                    }
                    required
                  />
                  <p className="error-msg">
                    {errMsgs["email"] ? errMsgs["email"] : ""}
                  </p>
                </div>
                <div className="lInput">
                  <label>
                    <b>Password:</b>
                  </label>
                  <div className="password-wrapper">
                    <input
                      className="password"
                      type="password"
                      placeholder="Password*"
                      onChange={(e) =>
                        validatePassword(e, setPassword, errMsgs, setErrMsgs)
                      }
                      required
                    />
                    <button
                      type="button"
                      className="toggle-visibility"
                      onClick={() => togglePasswordVisibility()}
                    >
                      <i style={{ color: "black" }} className="fa fa-eye"></i>
                    </button>
                  </div>
                  <p className="error-msg">
                    {errMsgs["password"] ? errMsgs["password"] : ""}
                  </p>
                </div>
                <div className="lInput">
                  <label>
                    <b>Confirm Password:</b>
                  </label>
                  <input
                    className="password"
                    type="password"
                    placeholder="Confirm Password*"
                    onChange={(e) => {
                      setPasswordsMatch(e.target.value === UserPassword);
                      validateConfirmPassword(
                        e,
                        setConfirmPassword,
                        errMsgs,
                        setErrMsgs
                      );
                    }}
                    required
                  />
                  {!confirmPassword ||
                    (!passwordsMatch && (
                      <p
                        style={{
                          color: "red",
                        }}
                      >
                        Passwords don't match
                      </p>
                    ))}
                  <p className="error-msg">
                    {errMsgs["cPassword"] ? errMsgs["cPassword"] : ""}
                  </p>
                </div>
                <div className="lInput">
                  <label>
                    <b>Country Code:</b>
                  </label>
                  <div className="phone-wrapper">
                    <select
                      defaultValue=""
                      className="country-code"
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
                              +{element.E164} ({element.country_name})
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  {/* <p className="error-msg">
                    {errMsgs["phone"] ? errMsgs["phone"] : ""}
                  </p> */}
                </div>
                <div className="lInput">
                  <label>
                    <b>Mobile:</b>
                  </label>
                  <input
                    className=""
                    type="number"
                    placeholder="Phone Number*"
                    maxLength="10"
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
                <div className="lInput">
                  <label>
                    <b>Date of Birth:</b>
                  </label>
                  <input
                    className=""
                    type="date"
                    placeholder="Date of birth*"
                    onChange={(e) => {
                      setDob(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="lInput">
                <div className="user-type">
                  <input
                    type="checkbox"
                    checked={isVisitor}
                    onChange={(e) => {
                      setIsVisitor(e.target.checked);
                    }}
                  />
                  <label>Visitor</label>

                  {/* <input
                    type="radio"
                    checked={userType === "resident"}
                    onChange={() => selectUserTyper("resident")}
                    name="login_type"
                    value="resident"
                  />
                  <label>Resident</label>
                  <input
                    type="radio"
                    checked={userType === "visitor"}
                    onChange={() => selectUserTyper("visitor")}
                    name="login_type"
                    value="visitor"
                  />
                  <label>Visitor</label>
                  <input
                    type="radio"
                    checked={userType === "manager"}
                    onChange={() => selectUserTyper("manager")}
                    name="login_type"
                    value="manager"
                  />
                  <label>Manager</label> */}
                </div>
              </div>
            </div>

            <button type="submit" onClick={registerUser} className="login-btn">
              Register
            </button>
            <div
              className="login-signup-now text-start"
              data-uia="login-signup-now"
            >
              {`Already a member? `}
              <a className=" " target="_self" href="/login">
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
      {/* <h1> {loginStatus}</h1> */}
      {/* <div className="login-wrapper hybrid-login-wrapper">
          <div className="login-wrapper-background">
            <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/c16cf196-e89e-4c46-8cc7-f2eca6fb0762/96d1707b-2053-4344-bac8-fe8e2c980fd8/US-en-20220103-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt=""/>
          </div>
          <div className="nfHeader login-header signupBasicHeader">
            <a href="/" className="svg-nfLogo signupBasicHeader" data-uia="netflix-header-svg-logo">
              <span className="screen-reader-text">Netflix</span>
            </a>
          </div>
          <div className="login-body">
            <div>
              <div className="login-content login-form hybrid-login-form hybrid-login-form-signup" data-uia="login-page-container">
                <div className="hybrid-login-form-main">
                  <h1 data-uia="login-page-title">Sign In</h1>
                  <form method="post" className="login-form" action="">
                    <div data-uia="login-field+container" className="nfInput nfEmailPhoneInput login-input login-input-email">
                      <div className="nfInputPlacement"><div className="nfEmailPhoneControls">
                        <label className="input_id" placeholder="">
                          <input type="text" data-uia="login-field" name="userLoginId" className="nfTextField" id="id_userLoginId" value="" tabindex="0" autocomplete="email" dir=""/>
                          <label for="id_userLoginId" className="placeLabel">Email or phone number</label>
                        </label>
                        <div data-uia="phone-country-selector+container" className="ui-select-wrapper country-select">
                          <a data-uia="phone-country-selector+target" href="#" className="ui-select-wrapper-link">
                            <div className="ui-select-current" placeholder="{&quot;current_selected_country&quot;:&quot;US&quot;}">
                              <span className="country-select-flag nf-flag nf-flag-us"></span>
                              <span className="country-select-code">{`+<!-- -->1`}</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
    </div>
  );
}

export default Register;
