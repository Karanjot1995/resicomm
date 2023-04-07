import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { verifyEmail } from "../../services/services";
import "./login.scss";
import "./../../App.scss";

function VerifyEmail() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [errorText, setErrorText] = useState("");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const hash = searchParams.get("hash");

  useEffect(() => {
    console.log("hash is " + hash);
    console.log("email is " + email);

    let data = {
      email: email,
      hash: hash,
    };


  }, []);

  return (
    <div className="verify-container">
      {isLoaded ? (
        isVerified ? (
          <div className="text-center element">
            <h1>{errorText}</h1>
            <h2>Please proceed to login!</h2>
          </div>
        ) : (
          <div className="text-center element">
            <h1>{errorText}</h1>
          </div>
        )
      ) : (
        <div className="text-center element">
          <i className="fa fa-spinner fa-spin verify" />
          <h1>Verifying your email...</h1>
        </div>
      )}
    </div>
  );
}

export default VerifyEmail;
