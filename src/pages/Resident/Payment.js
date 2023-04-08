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
  leaveMembership,
  updateVehicleDetails,
} from "../../services/services";
import "./ResidentDashboard/resident.scss";
import Modal from "react-modal";
// import "../../App.scss";
import { Weekdays } from "../../utils/constants";
import { convertTo12Hour } from "../../utils/utils";
import { Colors } from "../../utils/colors";

function Payment(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [amenity_id, setAmenity_id] = useState(props.amenity_id);
  const [building, setBuilding] = useState(props.building);
  const [paymentDetails, setPaymentDetails] = useState({
    payment_method: "Credit/Debit Card",
  });
  const [amenityDetails, setAmenityDetails] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [vehicleDetails, setVehicleDetails] = useState({});

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
            payment_amount: response.amenity_details.membership_price,
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

  const createPayment = () => {
    const payment_date = new Date().toISOString().slice(0, 10);

    const currentDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(currentDate.getDate() + 30);
    const expiry_date = expiryDate.toISOString.slice(0, 10);
    setPaymentDetails({
      ...paymentDetails,
      payment_date: payment_date,
      expiry_date: expiry_date
    });
    console.log("paymentDetails is " + paymentDetails);
    // addPayment(paymentDetails)
    //   .then((response) => {
    //     if (response.status == 200) {
    //       alert(response.message);
    //       //   handleReload();
    //     } else {
    //       alert(response.message);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  const handleReload = () => {
    setLoading(true);
    // getUserDetails();
  };

  const getPaymentMethodView = () => {
    if (paymentDetails.payment_method == "Credit/Debit Card") {
      return (
        <div>
          <p className="text-left">Card Information:</p>
          <form>
            <label>
              <input
                type="text"
                //   value={cardNumber}
                placeholder="1234 1234 1234 1234"
                onChange={(e) => {
                  setPaymentDetails({
                    ...paymentDetails,
                    last_four_digits: e.target.value.slice(-4),
                  });
                }}
                maxLength={16}
                required
              />
            </label>
            <label>
              <input
                type="text"
                //   value={expiry}
                //   onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
                required
              />
            </label>
            <label>
              <input
                type="text"
                //   value={cvv}
                //   onChange={(e) => setCvv(e.target.value)}
                placeholder="CVC"
                maxLength={3}
                required
              />
            </label>
            <button
              className="btn-primary"
              onClick={() => {
                if (true) {
                  createPayment();
                  //   updateVehicle();
                } else {
                  //   addNewVehicle();
                }
              }}
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
          <form>
            <div>
              <input
                type="text"
                id="bankName"
                placeholder="Bank Name"
                //   value={bankName}
                //   onChange={(event) => setBankName(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="accountNumber"
                placeholder="Account Number"
                //   value={accountNumber}
                //   onChange={(event) => setAccountNumber(event.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="ifscCode"
                placeholder="IFSC Code"
                //   value={ifscCode}
                //   onChange={(event) => setIfscCode(event.target.value)}
                required
              />
            </div>
            <button
              className="btn-primary"
              onClick={() => {
                if (true) {
                  createPayment();
                  //   updateVehicle();
                } else {
                  //   addNewVehicle();
                }
              }}
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
          <form>
            <label>
              <input
                type="text"
                //   value={expiry}
                //   onChange={(e) => setExpiry(e.target.value)}
                placeholder="Email"
                maxLength={5}
                required
              />
            </label>
            <label>
              <input
                type="text"
                //   value={cvv}
                //   onChange={(e) => setCvv(e.target.value)}
                placeholder="Password"
                maxLength={3}
                required
              />
            </label>
            <button
              className="btn-primary"
              onClick={() => {
                if (true) {
                  createPayment();
                  //   updateVehicle();
                } else {
                  //   addNewVehicle();
                }
              }}
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
          <form>
            <label>
              <input
                type="text"
                //   value={cvv}
                //   onChange={(e) => setCvv(e.target.value)}
                placeholder="UPI ID"
                required
              />
            </label>
            <button
              className="btn-primary"
              onClick={() => {
                if (true) {
                  createPayment();
                  //   updateVehicle();
                } else {
                  //   addNewVehicle();
                }
              }}
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
                    <div className="report-body">
                      <h3 className="text-left">Select a payment method:</h3>
                      <br />
                      <div className="d-flex row gap-2 justify-content-center">
                        <button
                          className={
                            paymentDetails.payment_method == "Credit/Debit Card"
                              ? "btn-outline-black p-2 pe-5"
                              : "btn-outline-grey p-2 pe-5"
                          }
                          onClick={() => {
                            if (
                              paymentDetails.payment_method !=
                              "Credit/Debit Card"
                            ) {
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
                      <div className="pt-3 pb-3">{getPaymentMethodView()}</div>
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
}

export default Payment;
