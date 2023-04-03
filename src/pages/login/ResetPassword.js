import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./login.scss";
import "./../../App.scss";
import {
  forgetPassword,
  resetPassword,
  signIn,
  testlogin,
} from "../../services/services";
import {
  validateConfirmPassword,
  validateEmail,
  validatePassword,
} from "../../utils/validation";

function ResetPassword() {
  const navigate = useNavigate();
  const [errMsgs, setErrMsgs] = useState({});
  const [UserPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const hash = searchParams.get("hash");

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

  const resetPasswordAPI = async (e) => {
    // setIsLoggedIn(true)
    if (!UserPassword) {
      alert("Enter a valid Password!");
    } else if (!confirmPassword || !passwordsMatch) {
      alert("Enter a valid Confirm Password!");
    } else {
      let data = { email: email, hash: hash, password: UserPassword };
      resetPassword(data)
        .then((res) => {
          if (res.status == 200) {
            alert(res.message);
            navigate("/login");
          } else {
            alert(res.message);
          }
        })
        .catch((error) => {
          console.error("Error resetting password:", error);
        });
    }
  };

  return (
    <div className="login-page pt-50">
      <div className="login-body">
        <div className="login-form">
          <div className="form-container">
            <h1 className="login-title text-start">Forgot Password</h1>
            <div
              className="login-signup-now text-start"
              data-uia="login-signup-now"
            ></div>
            <div className="lInput text-left">
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
            <div className="lInput text-left">
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
            <button onClick={resetPasswordAPI} className="login-btn">
              Submit
            </button>
          </div>
          <div
            className="login-signup-now text-start"
            data-uia="login-signup-now"
          >
            {`New here? Sign up now! `}
            <a className=" " target="_self" href="/register">
              Sign up now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
