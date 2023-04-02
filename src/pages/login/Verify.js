import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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

    fetch("http://localhost:3000/verify?email=" +{email} + "&hash="+{hash})
    .then((response) => {
        setIsLoaded(true);
        if (response.status == 200) {
        setIsVerified(true);
        } else {
            setErrorText(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {isLoaded ? (isVerified ? 
        <h1>Your email has been verified!</h1> : <h1>{errorText}</h1>
      ) : (
        <h1>Verifying your email...</h1>
      )}
    </div>
  );
}

export default VerifyEmail;
