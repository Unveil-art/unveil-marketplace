import React, { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  const formatTime = (value) => {
    return String(value).padStart(2, "0");
  };

  return (
    <div>
      <span>{formatTime(timeRemaining.days)}:</span>
      <span>{formatTime(timeRemaining.hours)}:</span>
      <span>{formatTime(timeRemaining.minutes)}:</span>
      <span>{formatTime(timeRemaining.seconds)}</span>
    </div>
  );
};

export default CountdownTimer;
