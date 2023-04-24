import React, { useState, useEffect } from "react";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";

function CustomDateTimePicker() {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
   
  }, [showCalendar]);

  const handleFocus = () => {
    setShowCalendar(true);
  };

  const handleBlur = () => {
    setShowCalendar(false);
  };

  return (
    <ReactDatetimeClass
      inputProps={{ onFocus: handleFocus, onBlur: handleBlur }}
      open={showCalendar}
    />
  );
}

export default CustomDateTimePicker;
