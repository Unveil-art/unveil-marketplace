import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import clsx from 'clsx'
import PropTypes from 'prop-types'


const TopStickyNotification = ({ type, message }) => {

  const [closeTimeout, setCloseTimeout] = useState(null)

  const closeSnackBar = () => {
    clearTimeout(closeTimeout);
    ReactDOM.unmountComponentAtNode(document.getElementById('top-sticky-notification-container'));
  };
  
  const beginCloseTimeout = () => {
    const timeout = setTimeout(() => closeSnackBar(), 3000)
    setCloseTimeout(timeout)
  }

  useEffect(() => {
    beginCloseTimeout()
  }, [])

  return (
    <div className={clsx(
      `z-[9999] fixed top-0 flex justify-center items-center w-full h-9 fadeInBottom fadeOutBottom`,
      type === "error" && `bg-[#7A1E24]`,
      type !== "error" && `bg-[#141414]`
    )}>
      <p className='text b3 text-unveilWhite'>{message}</p>
    </div>
  );
}

TopStickyNotification.propTypes = {
  type: PropTypes.oneOf(['success', 'error']),
  message: PropTypes.string.isRequired,
};

export default TopStickyNotification