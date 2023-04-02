export const validateEmail = (e, setEmail, errMsgs, setErrMsgs) => {
  let userEmail = e.target.value;
  setEmail(userEmail)
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(userEmail.length == 0 || regex.test(userEmail) === false){
    setErrMsgs({ ...errMsgs, 'email': "Please enter valid email (eg. abc@abc.com)." })
  }else{
    setErrMsgs({ ...errMsgs, 'email': '' })
  }
}

export const validatePassword = (e, setPassword, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setPassword(value)
  if(!value || value.length<6){
    setErrMsgs({ ...errMsgs, 'password': "Password should be at least 6 characters long." })
  }else{
    setErrMsgs({ ...errMsgs, 'password': '' })
  }
}

export const validateConfirmPassword = (e, setConfirmPassword, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setConfirmPassword(value)
  if(!value || value.length<6){
    setErrMsgs({ ...errMsgs, 'cPassword': "Password should be at least 6 characters long." })
  }else{
    setErrMsgs({ ...errMsgs, 'cPassword': '' })
  }
}

export const validateFirstName = (e, setFname, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setFname(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'fname': "Enter valid first name." })
  }else{
    setErrMsgs({ ...errMsgs, 'fname': '' })
  }
}

export const validateLastName = (e, setLname, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setLname(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'lname': "Enter valid last name." })
  }else{
    setErrMsgs({ ...errMsgs, 'lname': '' })
  }
}


export const validateName = (e, setName, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setName(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'name': "Enter valid last name." })
  }else{
    setErrMsgs({ ...errMsgs, 'name': '' })
  }
}




export const validatePhone = (e, setPhone, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setPhone(value)
  if(!value || value.length<10){
    setErrMsgs({ ...errMsgs, 'phone': "Enter valid phone number." })
  }else{
    setErrMsgs({ ...errMsgs, 'phone': '' })
  }
}

export const validateCountry = (e, setCountry, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setCountry(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'country': "Enter valid country." })
  }else{
    setErrMsgs({ ...errMsgs, 'country': '' })
  }
}

export const validateState = (e, setHomeState, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setHomeState(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'state': "Enter valid state." })
  }else{
    setErrMsgs({ ...errMsgs, 'state': '' })
  }
}

export const validateCity = (e, setCity, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setCity(value)
  if(!value || value.length<2){
    setErrMsgs({ ...errMsgs, 'city': "Enter valid city." })
  }else{
    setErrMsgs({ ...errMsgs, 'city': '' })
  }
}

export const validateStreet = (e, setStreet, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setStreet(value)
  if(!value || value.length<4){
    setErrMsgs({ ...errMsgs, 'street': "Enter valid address." })
  }else{
    setErrMsgs({ ...errMsgs, 'street': '' })
  }
}

export const validateZip = (e, setZipCode, errMsgs, setErrMsgs) =>{
  let value = e.target.value
  setZipCode(value)
  if(!value || value.length<5){
    setErrMsgs({ ...errMsgs, 'zipcode': "Enter Valid Zipcode" })
  }else{
    setErrMsgs({ ...errMsgs, 'zipcode': '' })
  }
}