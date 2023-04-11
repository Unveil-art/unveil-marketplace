import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    setTimeRemaining(targetDate - new Date());
    const interval = setInterval(() => {
      setTimeRemaining(targetDate - new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTime = (time) => {
    if (time === null) {
      return "";
    }

    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    const daysString = days > 0 ? `${days.toString().padStart(2, "0")}:` : "";
    const hoursString =
      hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const minutesString =
      minutes > 0 ? `${minutes.toString().padStart(2, "0")}:` : "";

    return `${daysString}${hoursString}${minutesString}${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div>
      <div>{formatTime(timeRemaining)}</div>
    </div>
  );
};

export default CountdownTimer;
