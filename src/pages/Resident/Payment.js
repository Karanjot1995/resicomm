import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import {
  addPayment,
  addVehicle,
  getAmenityDetails,
  getEvents,
  getPayments,
  getUser,
  getVehicleDetails,
  joinMembership,
  leaveMembership,
  updateVehicleDetails,
} from "../../services/services";
import "./ResidentDashboard/resident.scss";
import Modal from "react-modal";
// import "../../App.scss";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";
import { Colors } from "../../utils/colors";
import {
  validateAccountNumber,
  validateCardCVC,
  validateCardCvc,
  validateCardExpiry,
  validateCardNumber,
  validateEmail,
  validateIFSC,
  validateLastName,
  validateName,
  validatePassword,
  validateUPI,
} from "../../utils/validation";

function Payment(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [amenity_id, setAmenity_id] = useState(props.amenity_id);
  const [building, setBuilding] = useState(props.building);
  const [paymentDetails, setPaymentDetails] = useState({
    payment_method: "Credit/Debit Card",
  });
  const [amenityDetails, setAmenityDetails] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [errMsgs, setErrMsgs] = useState({});
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [payPalEmail, setPayPalEmail] = useState("");
  const [payPalPsssword, setPayPalPassword] = useState("");
  const [upi, setUpi] = useState("");

  useEffect(() => {
    if (amenity_id != "") {
      initData();
    }
  }, []);

  const initData = () => {
    let data = {
      amenity_id: amenity_id,
    };

    getAmenityDetails(data)
      .then((response) => {
        if (response.status == 200) {
          setAmenityDetails(response.amenity_details);
          setPaymentDetails({
            ...paymentDetails,
            payment_amount: parseFloat(
              response.amenity_details.membership_price
            ).toFixed(2),
            user_id: user.id,
            payment_type: response.amenity_details.name.toLowerCase(),
          });
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createPayment = async (e) => {
    e.preventDefault();
    if (validate()) {
      setPaymentLoading(true);
      const payment_date = new Date().toISOString().slice(0, 10);

      const currentDate = new Date();

      const expiryDate = new Date();
      expiryDate.setDate(currentDate.getDate() + 29);
      const expiry_date = expiryDate.toISOString().slice(0, 10);

      setPaymentDetails({
        ...paymentDetails,
        last_four_digits: cardNumber.slice(-4),
        payment_date: payment_date,
        expiry_date: expiry_date,
      });

      let data = {
        ...paymentDetails,
        last_four_digits: cardNumber.slice(-4),
        payment_date: payment_date,
        expiry_date: expiry_date,
      };

      addPayment(data)
        .then((response) => {
          if (response.status == 200) {
            if (amenity_id != "") {
              let data = { membership_id: amenity_id, user_id: user.id };
              joinMembership(data)
                .then((res) => {
                  if (res.status == 200) {
                    alert(response.message);
                    handleReload();
                  } else {
                    alert("Failed!");
                  }
                })
                .catch((error) => {
                  console.error("Error removing membership:", error);
                });
            } else {
              alert(response.message);
            }
            //   handleReload();
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleReload = () => {
    // setLoading(true);
    getUserDetails();
  };

  const getUserDetails = () => {
    let data = { user_id: user.id };
    getUser(data)
      .then((res) => {
        if (res.status == 200) {
          localStorage.setItem("user", JSON.stringify(res.user_details));
          setUser(JSON.stringify(res.user_details));
          setPaymentLoading(false);
          props.onRequestClose();
          //   initData();
          //   window.location.reload();
        } else {
          alert(res.message);
        }
      })
      .catch((error) => {
        console.error("Error getting user details:", error);
      });
  };

  const validate = () => {
    let valid = true;
    for (const key in errMsgs) {
      if (errMsgs[key] && key != "randomKey") {
        valid = false;
      }
    }

    if (paymentDetails.payment_method == "Credit/Debit Card") {
      if (!cardNumber) {
        alert("Enter a valid card number!");
      } else if (!cardExpiry) {
        alert("Enter a valid card expiry!");
      } else if (!cardCvc) {
        alert("Enter a valid card cvc!");
      } else {
      }
    } else if (paymentDetails.payment_method == "Net Banking") {
      if (!bankName) {
        alert("Enter a valid bank name!");
      } else if (!accountNumber) {
        alert("Enter a valid account number!");
      } else if (!ifsc) {
        alert("Enter a valid IFSC code!");
      } else {
      }
    } else if (paymentDetails.payment_method == "PayPal") {
      if (!payPalEmail) {
        alert("Enter a valid email!");
      } else if (!payPalPsssword) {
        alert("Enter a valid password!");
      } else {
      }
    } else {
      if (!upi) {
        alert("Enter a valid UPI ID!");
      } else {
      }
    }

    return valid;
  };

  const getPaymentMethodView = () => {
    if (paymentDetails.payment_method == "Credit/Debit Card") {
      return (
        <div>
          <p className="text-left">Card Information:</p>
          <form className="register-form" id="register-form">
            <div className="lInput w-48">
              {/* <label>
                <b>Last Name:</b>
              </label> */}
              <input
                className=""
                type="text"
                maxLength={16}
                id="cardNumber"
                placeholder="1234 1234 1234 1234"
                onChange={(e) => {
                  validateCardNumber(e, setCardNumber, errMsgs, setErrMsgs);
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["cardNumber"] ? errMsgs["cardNumber"] : ""}
              </p>
            </div>
            <div className="lInput w-48">
              {/* <label>
                <b>Last Name:</b>
              </label> */}
              <input
                className=""
                type="text"
                id="cardExpiry"
                placeholder="MM/YY"
                maxLength={5}
                onChange={(e) =>
                  validateCardExpiry(e, setCardExpiry, errMsgs, setErrMsgs)
                }
                required
              />
              <p className="error-msg">
                {errMsgs["cardExpiry"] ? errMsgs["cardExpiry"] : ""}
              </p>
            </div>
            <div className="lInput w-48">
              {/* <label>
                <b>Last Name:</b>
              </label> */}
              <input
                className=""
                type="text"
                id="cardCvc"
                placeholder="CVC"
                maxLength={3}
                onChange={(e) =>
                  validateCardCvc(e, setCardCvc, errMsgs, setErrMsgs)
                }
                required
              />
              <p className="error-msg">
                {errMsgs["cardCvc"] ? errMsgs["cardCvc"] : ""}
              </p>
            </div>
            <button
              className="btn-primary"
              type="submit"
              onClick={createPayment}
            >
              Pay {amenityDetails.membership_price}
            </button>
          </form>
        </div>
      );
    } else if (paymentDetails.payment_method == "Net Banking") {
      return (
        <div>
          <p className="text-left">Banking Information:</p>
          <form className="register-form" id="register-form">
            <div className="lInput w-48">
              <input
                className=""
                type="text"
                id="bankName"
                placeholder="Bank Name"
                onChange={(e) => {
                  validateName(e, setBankName, errMsgs, setErrMsgs);
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["name"] ? errMsgs["name"] : ""}
              </p>
            </div>
            <div className="lInput w-48">
              <input
                className=""
                type="text"
                id="accountNumber"
                placeholder="Account Number"
                onChange={(e) => {
                  validateAccountNumber(
                    e,
                    setAccountNumber,
                    errMsgs,
                    setErrMsgs
                  );
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["accountNumber"] ? errMsgs["accountNumber"] : ""}
              </p>
            </div>
            <div className="lInput w-48">
              <input
                className=""
                type="text"
                id="ifscCode"
                placeholder="IFSC Code"
                onChange={(e) => {
                  validateIFSC(e, setIfsc, errMsgs, setErrMsgs);
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["ifsc"] ? errMsgs["ifsc"] : ""}
              </p>
            </div>
            <button
              className="btn-primary"
              type="submit"
              onClick={createPayment}
            >
              Pay {amenityDetails.membership_price}
            </button>
          </form>
        </div>
      );
    } else if (paymentDetails.payment_method == "PayPal") {
      return (
        <div>
          <p className="text-left">PayPal Credentials:</p>
          <form className="register-form" id="register-form">
            <div className="lInput w-48">
              <input
                className=""
                type="text"
                id="payPalEmail"
                placeholder="Email"
                onChange={(e) => {
                  validateEmail(e, setBankName, errMsgs, setErrMsgs);
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["email"] ? errMsgs["email"] : ""}
              </p>
            </div>
            <div className="lInput pb-2 mx-3">
              <input
                className="password"
                id="payPalPassword"
                type="password"
                placeholder="Password*"
                onChange={(e) =>
                  validatePassword(e, setPayPalPassword, errMsgs, setErrMsgs)
                }
                required
              />
              <p className="error-msg">
                {errMsgs["password"] ? errMsgs["password"] : ""}
              </p>
            </div>
            <button
              className="btn-primary"
              type="submit"
              onClick={createPayment}
            >
              Pay {amenityDetails.membership_price}
            </button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <p className="text-left">UPI Details:</p>
          <form className="register-form" id="register-form">
            <div className="lInput w-48">
              <input
                className=""
                type="text"
                id="upi"
                placeholder="UPI ID"
                onChange={(e) => {
                  validateUPI(e, setUpi, errMsgs, setErrMsgs);
                }}
                required
              />
              <p className="error-msg">
                {errMsgs["upi"] ? errMsgs["upi"] : ""}
              </p>
            </div>
            <button
              className="btn-primary"
              type="submit"
              onClick={createPayment}
            >
              Pay {amenityDetails.membership_price}
            </button>
          </form>
        </div>
      );
    }
  };

  if (loading) {
    return <div>{loading && <Loader />}</div>;
  } else {
    return (
      <div className="pt-50 resident" id="visitor">
        <div
          className="container"
          id="resident-dashboard-payment-modal"
          style={{ width: "100%" }}
        >
          <div className="container">
            <div className="report">
              <div className="report-container">
                <div className="visitor-box-container">
                  <div className="box1">
                    <div className="text d-flex">
                      <h1 className="red">
                        Payment for {amenityDetails.name} Amenity
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="d-flex column">
                  <div className="card text-center  mt-5 rounded w-50">
                    <div className="report-body text-left">
                      <div className="d-flex justify-content-between">
                        <div>
                          <h2>${amenityDetails.membership_price}</h2>
                          <p>For Period:</p>
                        </div>
                        <i
                          class="fa fa-file-text-o"
                          style={{ fontSize: 40, color: Colors.fadedOrange }}
                          aria-hidden="true"
                        ></i>
                      </div>
                      <br />
                      <ul style={{ listStyleType: "none" }}>
                        <li>
                          <div className="d-flex container row">
                            <div
                              style={{
                                width: "30%",
                              }}
                            >
                              <b>To:</b>
                            </div>
                            <div
                              style={{
                                textAlign: "left",
                                paddingLeft: "10%",
                              }}
                            >
                              ResiComm
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex container row">
                            <div
                              style={{
                                width: "30%",
                              }}
                            >
                              <b>From:</b>
                            </div>
                            <div
                              style={{
                                textAlign: "left",
                                paddingLeft: "10%",
                              }}
                            >
                              {user.fname} {user.lname}
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex container row">
                            <div
                              style={{
                                width: "30%",
                              }}
                            >
                              <b>Payment For:</b>
                            </div>
                            <div
                              style={{
                                textAlign: "left",
                                paddingLeft: "10%",
                              }}
                            >
                              asdasd
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="card text-center mt-4 rounded w-50">
                    {paymentLoading ? (
                      <Loader />
                    ) : (
                      <div className="report-body">
                        <h3 className="text-left">Select a payment method:</h3>
                        <br />
                        <div className="d-flex row gap-2 justify-content-center">
                          <button
                            className={
                              paymentDetails.payment_method ==
                              "Credit/Debit Card"
                                ? "btn-outline-black p-2 pe-5"
                                : "btn-outline-grey p-2 pe-5"
                            }
                            onClick={() => {
                              if (
                                paymentDetails.payment_method !=
                                "Credit/Debit Card"
                              ) {
                                setErrMsgs({});
                                setCardNumber("");
                                setCardExpiry("");
                                setCardCvc("");
                                setPaymentDetails({
                                  ...paymentDetails,
                                  payment_method: "Credit/Debit Card",
                                });
                              }
                            }}
                          >
                            <span className="d-flex column text-left">
                              <i class="fa fa-credit-card align-self-start"></i>
                              Card
                            </span>
                          </button>
                          <button
                            className={
                              paymentDetails.payment_method == "Net Banking"
                                ? "btn-outline-black p-2"
                                : "btn-outline-grey p-2"
                            }
                            onClick={() => {
                              if (
                                paymentDetails.payment_method != "Net Banking"
                              ) {
                                setPaymentDetails({
                                  ...paymentDetails,
                                  payment_method: "Net Banking",
                                });
                              }
                            }}
                          >
                            <span className="d-flex column text-left">
                              <i class="fa fa-university align-self-start"></i>
                              Net Banking
                            </span>
                          </button>
                          <button
                            className={
                              paymentDetails.payment_method == "PayPal"
                                ? "btn-outline-black p-2"
                                : "btn-outline-grey p-2"
                            }
                            onClick={() => {
                              if (paymentDetails.payment_method != "PayPal") {
                                setPaymentDetails({
                                  ...paymentDetails,
                                  payment_method: "PayPal",
                                });
                              }
                            }}
                          >
                            <span className="d-flex column text-left pe-4">
                              <i class="fa fa-paypal align-self-start"></i>
                              PayPal
                            </span>
                          </button>
                          <button
                            className={
                              paymentDetails.payment_method == "UPI"
                                ? "btn-outline-black p-2"
                                : "btn-outline-grey p-2"
                            }
                            onClick={() => {
                              if (paymentDetails.payment_method != "UPI") {
                                setPaymentDetails({
                                  ...paymentDetails,
                                  payment_method: "UPI",
                                });
                              }
                            }}
                          >
                            <span className="d-flex column text-left pe-5">
                              <i class="fa fa-money align-self-start"></i>
                              UPI
                            </span>
                          </button>
                        </div>
                        <div className="pt-3 pb-3">
                          <div>{getPaymentMethodView()}</div>
                        </div>
                      </div>
                    )}
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

export default Payment;
