import React, { useState, useEffect } from "react";

function ClockFunction() {
  const [dateTime, setDateTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div>
      <h5>{dateTime}</h5>
    </div>
  );
}

export default ClockFunction;
