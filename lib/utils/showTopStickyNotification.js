import React from "react";
import ReactDOM from 'react-dom'

import TopStickyNotification from "@/components/notification/TopStickyNotification";

export const showTopStickyNotification = (type, message) => {
  const element = document.getElementById("top-sticky-notification-container")
  if(element) {
    ReactDOM.render(
      <TopStickyNotification type={type} message={message} />,
      element
    )
  }
}