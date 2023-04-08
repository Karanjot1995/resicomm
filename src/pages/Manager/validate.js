export const validateEmail = (e, setEmployee, employee, errMsgs, setErrMsgs) => {
    let value = e.target.value;
    setEmployee({ ...employee, email: value });
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(value.length == 0 || regex.test(value) === false){
      setErrMsgs({ ...errMsgs, 'email': "Please enter valid email (eg. abc@abc.com)." })
    }else{
      setErrMsgs({ ...errMsgs, 'email': '' })
    }
  }
  
  export const validatePassword = (e, setEmployee, employee, errMsgs, setErrMsgs) =>{
    let value = e.target.value
    setEmployee({ ...employee, password: value });
    if(!value || value.length<6){
      setErrMsgs({ ...errMsgs, 'password': "Password should be at least 6 characters long." })
    }else{
      setErrMsgs({ ...errMsgs, 'password': '' })
    }
  }

  
  export const validateFirstName = (e, setEmployee, employee, errMsgs, setErrMsgs) =>{
    let value = e.target.value
    setEmployee({ ...employee, fname: value });
    if(!value || value.length<2){
      setErrMsgs({ ...errMsgs, 'fname': "Enter valid first name." })
    }else{
      setErrMsgs({ ...errMsgs, 'fname': '' })
    }
  }
  
  export const validateLastName = (e, setEmployee, employee, errMsgs, setErrMsgs) =>{
    let value = e.target.value
    setEmployee({ ...employee, lname: value });
    if(!value || value.length<2){
      setErrMsgs({ ...errMsgs, 'lname': "Enter valid last name." })
    }else{
      setErrMsgs({ ...errMsgs, 'lname': '' })
    }
  }
  
  
  
  
  export const validatePhone = (e, setEmployee, employee, errMsgs, setErrMsgs) =>{
    let value = e.target.value
    setEmployee({ ...employee, phone: value });
    if(!value || value.length<10){
      setErrMsgs({ ...errMsgs, 'phone': "Enter valid phone number." })
    }else{
      setErrMsgs({ ...errMsgs, 'phone': '' })
    }
  }
  
