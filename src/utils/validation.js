export const validateEmail = (e, setEmail, errMsgs, setErrMsgs) => {
  let userEmail = e.target.value;
  setEmail(userEmail);
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (userEmail.length == 0 || regex.test(userEmail) === false) {
    setErrMsgs({
      ...errMsgs,
      email: "Please enter valid email (eg. abc@abc.com).",
    });
  } else {
    setErrMsgs({ ...errMsgs, email: "" });
  }
};

export const validateCardNumber = (e, setCardNumber, errMsgs, setErrMsgs) => {
  let cardNumber = e.target.value.replace(/\s/g, "");
  setCardNumber(cardNumber);
  const regex = /^[0-9]{16}$/;
  if (cardNumber.length == 0 || regex.test(cardNumber) === false) {
    setErrMsgs({
      ...errMsgs,
      cardNumber: "Please enter a valid 16-digit card number.",
    });
  } else {
    setErrMsgs({ ...errMsgs, cardNumber: "" });
  }
};

export const validateCardExpiry = (e, setCardExpiry, errMsgs, setErrMsgs) => {
  let expiry = e.target.value;
  setCardExpiry(expiry);
  const regex = /^(0[1-9]|1[0-2])\/(\d{2})$/;
  if (expiry.length === 0 || !regex.test(expiry)) {
    setErrMsgs({
      ...errMsgs,
      cardExpiry: "Please enter a valid expiry date (MM/YY).",
    });
  } else {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let inputYear = parseInt(expiry.substring(3));
    let inputMonth = parseInt(expiry.substring(0, 2));
    if (
      inputYear < (currentYear % 100) ||
      (inputYear === (currentYear % 100) && inputMonth < currentMonth)
    ) {
      setErrMsgs({
        ...errMsgs,
        cardExpiry: "Please enter a future expiry date.",
      });
    } else {
      setErrMsgs({ ...errMsgs, cardExpiry: "" });
    }
  }
};

export const validateCardCvc = (e, setCardCvc, errMsgs, setErrMsgs) => {
  let cvc = e.target.value;
  setCardCvc(cvc);
  const regex = /^[0-9]{3,4}$/;
  if (cvc.length === 0 || !regex.test(cvc)) {
    setErrMsgs({ ...errMsgs, cardCvc: "Please enter a valid CVC." });
  } else {
    setErrMsgs({ ...errMsgs, cardCvc: "" });
  }
};

export const validateAccountNumber = (e, setAccountNumber, errMsgs, setErrMsgs) => {
  let accountNumber = e.target.value;
  setAccountNumber(accountNumber);
  const regex = /^[0-9]{9,18}$/;
  if(accountNumber.length == 0 || regex.test(accountNumber) === false) {
    setErrMsgs({ ...errMsgs, 'accountNumber': "Please enter a valid account number (between 9 and 18 digits)." });
  } else {
    setErrMsgs({ ...errMsgs, 'accountNumber': '' });
  }
}

export const validateIFSC = (e, setIFSC, errMsgs, setErrMsgs) => {
  let ifsc = e.target.value.trim().toUpperCase();
  setIFSC(ifsc);
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  if(ifsc.length === 0 || !regex.test(ifsc)){
    setErrMsgs({ ...errMsgs, 'ifsc': "Please enter a valid IFSC code (eg. SBIN0001234)." });
  } else {
    setErrMsgs({ ...errMsgs, 'ifsc': '' });
  }
}

export const validateUPI = (e, setUpi, errMsgs, setErrMsgs) => {
  let upi = e.target.value;
  setUpi(upi);
  const regex = /^([a-zA-Z0-9\-\_\.]{2,})@([a-zA-Z]{2,})(\.([a-zA-Z]{2,})){1,2}$/;
  if (upi.length === 0 || regex.test(upi) === false) {
    setErrMsgs({ ...errMsgs, 'upi': 'Please enter a valid UPI ID.' });
  } else {
    setErrMsgs({ ...errMsgs, 'upi': '' });
  }
}


export const validatePassword = (e, setPassword, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setPassword(value);
  if (!value || value.length < 6) {
    setErrMsgs({
      ...errMsgs,
      password: "Password should be at least 6 characters long.",
    });
  } else {
    setErrMsgs({ ...errMsgs, password: "" });
  }
};

export const validateConfirmPassword = (
  e,
  setConfirmPassword,
  errMsgs,
  setErrMsgs
) => {
  let value = e.target.value;
  setConfirmPassword(value);
  if (!value || value.length < 6) {
    setErrMsgs({
      ...errMsgs,
      cPassword: "Password should be at least 6 characters long.",
    });
  } else {
    setErrMsgs({ ...errMsgs, cPassword: "" });
  }
};

export const validateFirstName = (e, setFname, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setFname(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, fname: "Enter valid first name." });
  } else {
    setErrMsgs({ ...errMsgs, fname: "" });
  }
};

export const validateLastName = (e, setLname, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setLname(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, lname: "Enter valid last name." });
  } else {
    setErrMsgs({ ...errMsgs, lname: "" });
  }
};

export const validateName = (e, setName, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setName(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, name: "Enter valid last name." });
  } else {
    setErrMsgs({ ...errMsgs, name: "" });
  }
};

export const validatePhone = (e, setPhone, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setPhone(value);
  if (!value || value.length < 10) {
    setErrMsgs({ ...errMsgs, phone: "Enter valid phone number." });
  } else {
    setErrMsgs({ ...errMsgs, phone: "" });
  }
};

export const validateCountry = (e, setCountry, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setCountry(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, country: "Enter valid country." });
  } else {
    setErrMsgs({ ...errMsgs, country: "" });
  }
};

export const validateState = (e, setHomeState, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setHomeState(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, state: "Enter valid state." });
  } else {
    setErrMsgs({ ...errMsgs, state: "" });
  }
};

export const validateCity = (e, setCity, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setCity(value);
  if (!value || value.length < 2) {
    setErrMsgs({ ...errMsgs, city: "Enter valid city." });
  } else {
    setErrMsgs({ ...errMsgs, city: "" });
  }
};

export const validateStreet = (e, setStreet, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setStreet(value);
  if (!value || value.length < 4) {
    setErrMsgs({ ...errMsgs, street: "Enter valid address." });
  } else {
    setErrMsgs({ ...errMsgs, street: "" });
  }
};

export const validateZip = (e, setZipCode, errMsgs, setErrMsgs) => {
  let value = e.target.value;
  setZipCode(value);
  if (!value || value.length < 5) {
    setErrMsgs({ ...errMsgs, zipcode: "Enter Valid Zipcode" });
  } else {
    setErrMsgs({ ...errMsgs, zipcode: "" });
  }
};
