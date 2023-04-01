import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Register from "./Register";
import { useSelector, useDispatch } from "react-redux";
import { signIn, testlogin } from '../../services/services'
import { validateEmail, validatePassword } from '../../utils/validation'
// import { useFormik } from 'formik';
// import { setIsLogged } from '../../actions/actions'




function Login({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState ("");
  const [loginStatus, setLoginStatus] = useState("");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [errMsgs, setErrMsgs] = useState({}) 


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
    setIsLoggedIn(true)
    let data = {email:email, password:password}
    let valid = true;
    if(!email || !password){
      valid = false
    }
    
    if(!valid){
      alert('All fields are mandatory!')
    }else{
      if(!errMsgs['email'] && !errMsgs['password']){
        signIn(data).then(res=> {
          console.log(res)
          if(res.status==200){
            localStorage.setItem('user', JSON.stringify(res.data))
            // dispatch(setIsLogged())
            // setIsLoggedIn(localStorage.getItem('user'))
            // navigate('/home');
          }else{
            alert('Invalid username/password')
          }
        })
      } 
    }


  };

   return (
     <div className="login-page pt-50">
       <div className="login-body">
        <div className="login-form">
          <div className="form-container">
            <h1 className="login-title text-start">Sign In</h1>
            <div className="lInput">
              <input
                className="email"
                type="email"
                placeholder="Email..."
                onChange = { (e) => validateEmail(e, setEmail, errMsgs, setErrMsgs)}
                required
              /> 
              <p className="error-msg">{errMsgs['email']?errMsgs['email']:''}</p>
            </div>
            <div className="lInput">
              <input
                className="password"
                type="password"
                placeholder="Password..."
                onChange = { (e) => validatePassword(e, setPassword, errMsgs, setErrMsgs)}
                required
              />
              <p className="error-msg">{errMsgs['password']?errMsgs['password']:''}</p>
            </div>
            <div className="remember">
              <input type="checkbox"  name="remember"/> Remember me

            </div>

            <button onClick={login} className="login-btn">Sign In</button>
            <div className="login-signup-now text-start" data-uia="login-signup-now">
              <a className=" " target="_self" href="/forgot-password">Forgot Password?</a>
            </div>
          </div>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
            {`New here? Sign up now! `}
            <a className=" " target="_self" href="/register">Sign up now</a>
          </div>
        </div>

       </div>
     </div>
   );
}
 
export default Login;