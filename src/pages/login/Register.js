import React, { useState, useEffect } from "react";
import { register } from '../../services/services'
import { useNavigate } from 'react-router-dom';
import { validateCity, validateCountry, validateEmail, validateFirstName, validateLastName, validatePassword, validatePhone, validateState, validateStreet, validateZip } from "../../utils/validation";
// import { setUserData } from "../actions";
// import { useHistory } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [userType, setUserType] = useState(1);
  const [Email, setEmail] = useState("");
  const [UserPassword, setPassword] = useState ("");
  const [Fname, setFname] = useState ("");
  const [Lname, setLname] = useState ("");
  const [PhoneNo, setPhone] = useState (null);
  const [DOB, setDob] = useState (null);
  const [country, setCountry] = useState("");
  const [homeState, setHomeState] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [errMsgs, setErrMsgs] = useState({})

  const handleUserType = (event) => {
    setUserType(event.target.value);
  };

  // const userData = useSelector(state => state.user.userData)
  // const dispatch = useDispatch()

  const registerUser = async (e) => {
    e.preventDefault();
    let valid = true;
    for (const key in errMsgs) {
      if(errMsgs[key] && key!='lname'){
        valid = false
      }
    }
    if(!Email || !UserPassword || !Fname || !PhoneNo || !country || !homeState || !city || !street || !zipcode || (userType==1 && !Lname) || userType==1 && !DOB){
      alert('All fields marked with * are mandatory!')
    }else{
      if(valid){
        let data = {
          email:Email,
          password: UserPassword,
          first_name: Fname,
          last_name: Lname,
          user_type: userType,
          phone: PhoneNo,
          dob: userType==1?DOB:'',
          country: country,
          state: homeState,
          city: city,
          street: street,
          zipcode: zipcode
        }
        register(data).then(res=> {
          if(res.status==200){
            navigate('/login');
            alert('Successfully registered! Login to continue.')
          }else if (res.status ==400){
            alert('Email already registered. Login to continue.')
          }else{
            alert('Error setting up you account.')
          }
        })
      }
    }


    //  e.preventDefault()
    //  let data = {Fname, Lname, Email, UserPassword, PhoneNo, DOB, CardNo, CVV, ExpiryDate}
    // fetch(`/users/register`,{
    //   method: "POST",
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // }).then(res=>res.json()).then(data=>{
    //   if(data.success){
    //     alert(data.message)
    //     history.push('/login')
    //   }else{
    //     setErrMsgs(data.message)
    //   }
    // })
  };

  function chkLen(e,l){
    if(e.target.value.length>l) e.target.value = e.target.value.slice(0,l)
  }

   return (
     <div className="login-page pt-50 register">
       <div className="login-body">
        <div className="login-form">
        <h1 className="login-title text-start">Register</h1>
          <form className="register-form" id="register-form">
            <div className="personal-info">
              <h2 className="text-start">Personal Information</h2>
              
              <div className="row-inputs">

                <div className="lInput">
                  <select id="user-type" onChange={handleUserType}>
                    <option value={1} >Customer</option>
                    <option value={2} >Vendor</option>
                  </select>
                </div>

                <div className="lInput">
                  <input
                    className=""
                    type="text"
                    placeholder={userType==1?"First name*":'Name'}
                    onChange = { (e) => validateFirstName(e, setFname, errMsgs, setErrMsgs)}
                    required
                  />
                  <p className="error-msg">{errMsgs['fname']?errMsgs['fname']:''}</p>
                </div>

                {/* last name for customer */}
                {userType==1?                  
                  <div className="lInput">
                    <input
                      className=""
                      type="text"
                      placeholder="Last name"
                      onChange = { (e) => validateLastName(e, setLname, errMsgs, setErrMsgs)}
                    />
                    <p className="error-msg">{errMsgs['lname']?errMsgs['lname']:''}</p>
                  </div>
                :''}

                <div className="lInput">
                  <input
                    className="email"
                    type="email"
                    placeholder="Email*"
                    onChange = { (e) => validateEmail(e, setEmail, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['email']?errMsgs['email']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="password"
                    type="password"
                    placeholder="Password*"
                    onChange = { (e) => validatePassword(e, setPassword, errMsgs, setErrMsgs)}
                    required
                  />
                  <p className="error-msg">{errMsgs['password']?errMsgs['password']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className=""
                    type="number"
                    placeholder="Phone Number*"
                    maxlength="10"
                    onInput={(e)=>chkLen(e,10)}
                    onChange = { (e) => validatePhone(e, setPhone, errMsgs, setErrMsgs)}
                    required
                  />
                  <p className="error-msg">{errMsgs['phone']?errMsgs['phone']:''}</p>
                </div>
                {userType==1?
                <div className="lInput">
                  <p className="dob text-left">Date of Birth*</p>
                  <input
                    className=""
                    type="date"
                    placeholder="Date of birth*"
                    onChange = { (e) => {
                      setDob (e.target.value);
                    }}
                    required
                  />
                </div>
                :''}

              </div>
              
              <div className="address-header"><p className="dob text-left">Address*</p></div>
              <div className="row-inputs">
                <div className="lInput">
                  <input
                    className="country"
                    type="text"
                    placeholder="Country*"
                    onChange = { (e) => validateCountry(e, setCountry, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['country']?errMsgs['country']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="state"
                    type="text"
                    placeholder="State*"
                    onChange = { (e) => validateState(e, setHomeState, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['state']?errMsgs['state']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="city"
                    type="text"
                    placeholder="City*"
                    onChange = { (e) => validateCity(e, setCity, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['city']?errMsgs['city']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="street"
                    type="text"
                    placeholder="Street Address*"
                    onChange = { (e) => validateStreet(e, setStreet, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['street']?errMsgs['street']:''}</p>
                </div>
                <div className="lInput">
                  <input
                    className="zipcode"
                    type="text"
                    placeholder="Zip*"
                    onChange = { (e) => validateZip(e, setZipCode, errMsgs, setErrMsgs)}
                    required
                  /> 
                  <p className="error-msg">{errMsgs['zipcode']?errMsgs['zipcode']:''}</p>
                </div>
                
              </div>
            </div>
            
            <button type="submit" onClick={registerUser} className="login-btn">Register</button>
          </form>
          <div className="login-signup-now text-start" data-uia="login-signup-now">
                  {`Already a member? `}
                  <a className=" " target="_self" href="/login">Sign In</a>
          </div>
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