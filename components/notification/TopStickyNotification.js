import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const TopStickyNotification = ({ type, message }) => {
  const [closeTimeout, setCloseTimeout] = useState(null);

  const closeSnackBar = () => {
    clearTimeout(closeTimeout);
    ReactDOM.unmountComponentAtNode(
      document.getElementById("top-sticky-notification-container")
    );
  };

  const beginCloseTimeout = () => {
    const timeout = setTimeout(() => closeSnackBar(), 6000);
    setCloseTimeout(timeout);
  };

  useEffect(() => {
    beginCloseTimeout();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0, transition: { ease: "easeIn" } }}
      exit={{ opacity: 0, y: -100, transition: { ease: "easeOut" } }}
      className={clsx(
        `z-[9999] fixed top-0 flex justify-center items-center w-full h-9`,
        type === "error" && `bg-[#7A1E24]`,
        type !== "error" && `bg-[#141414]`
      )}
    >
      <p className="text b3 text-unveilWhite">{message}</p>
    </motion.div>
  );
};

TopStickyNotification.propTypes = {
  type: PropTypes.oneOf(["success", "error"]),
  message: PropTypes.string.isRequired,
};

export default TopStickyNotification;
