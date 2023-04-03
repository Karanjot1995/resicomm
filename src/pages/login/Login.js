import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import Register from "./Register";
import { useSelector, useDispatch } from "react-redux";
import { resendVerification, signIn, testlogin } from "../../services/services";
import { validateEmail, validatePassword } from "../../utils/validation";
import "./login.scss";
import "./../../App.scss";
import Modal from "react-modal";
// import { useFormik } from 'formik';
// import { setIsLogged } from '../../actions/actions'

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement(document.getElementById("login"));


function Login({setIsLoggedIn, setUser}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [errMsgs, setErrMsgs] = useState({});

  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    
  });


  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if(urlParams.get('email') && urlParams.get('hash')){
      let email = urlParams.get('email');
      let hash = urlParams.get('hash');
      fetch(`http://localhost/resicomm-server/index.php/verify?email=${email}&hash=${hash}`);
      window.location.href="/login"
    }
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
  // const validateEmail = (e) => {
  //   let userEmail = e.target.value;
  //   setEmail(userEmail)
  //   const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   if(userEmail.length == 0 || regex.test(userEmail) === false){
  //     setErrMsgs({ ...errMsgs, 'email': "Invalid Email." })
  //   }else{
  //     setErrMsgs({ ...errMsgs, 'email': '' })
  //   }
  // }

  // const validatePassword = (e) =>{
  //   let pass = e.target.value
  //   setPassword(pass)
  //   if(!pass || pass.length<4){
  //     setErrMsgs({ ...errMsgs, 'password': "Password should be at least 4 characters long." })
  //   }else{
  //     setErrMsgs({ ...errMsgs, 'password': '' })
  //   }
  // }

  const login = async (e) => {
    e.preventDefault();
    // setIsLoggedIn(true)
    let data = { email: email, password: password };
    let valid = true;
    if (!email || !password) {
      valid = false;
    }
    
    if(!valid){
      alert('All fields are mandatory!')
    }else{
      if(!errMsgs['email'] && !errMsgs['password']){
        signIn(data).then(res=> {
          if(res.status==200){
            localStorage.setItem('user', JSON.stringify(res.user))
            // dispatch(setIsLogged())
            setIsLoggedIn(localStorage.getItem('user'))
            setUser(res.user)
            // navigate('/home');
            let user_type = res.user["type"];
            let isVerified = res.user["verified"] == 0 ? false : true;
            console.log("is verified is " + isVerified);
            if (isVerified === false) {
              openModal();
            } else {
              switch (user_type) {
                case "user":
                  navigate("/resident");
                  break;
                case "resident":
                  navigate("/resident");
                  break;
                case "manager":
                  navigate("/home");
                  break;
                case "visitor":
                  navigate("/home");
                  break;
                case "employee":
                  navigate("/home");
                  break;
                default:
                  navigate("/home");
                  break;
              }
            }
          } else {
            alert("Invalid username/password");
          }
        });
      }
    }
  };

  const resendEmail = async (e) => {
    // setIsLoggedIn(true)
    let data = { email: email };
    resendVerification(data).then((res) => {
      closeModal();
      if (res.status == 200) {
        alert(res.message);
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="login-page pt-50">
      <div className="login-body">
        <div className="login-form">
          <div className="form-container">
            <div id="login">
              {modalIsOpen && (
                <Modal
                  isOpen={modalIsOpen}
                  onAfterOpen={afterOpenModal}
                  onRequestClose={closeModal}
                  style={customStyles}
                  contentLabel="Example Modal"
                >
                  <h2>Email Not Verified</h2>
                  <br></br>
                  <p>Please verify your email to proceed!</p>
                  <br></br>
                  <div className="text-right">
                    <button onClick={closeModal}>Close</button>
                    &ensp;&ensp;&ensp;&ensp;
                    <button onClick={resendEmail}>Resend Email</button>
                  </div>
                </Modal>
              )}
            </div>
            <h1 className="login-title text-start">Sign In</h1>
            <div className="lInput">
              <input
                className="email"
                type="email"
                placeholder="Email..."
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
              <input
                className="password"
                type="password"
                placeholder="Password..."
                onChange={(e) =>
                  validatePassword(e, setPassword, errMsgs, setErrMsgs)
                }
                required
              />
              <p className="error-msg">
                {errMsgs["password"] ? errMsgs["password"] : ""}
              </p>
            </div>
            <div className="remember">
              <input type="checkbox" name="remember" /> Remember me
            </div>

            <button onClick={login} className="login-btn">
              Sign In
            </button>
            <div
              className="login-signup-now text-start"
              data-uia="login-signup-now"
            >
              <a className=" " target="_self" href="/forgot-password">
                Forgot Password?
              </a>
            </div>
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

export default Login;
