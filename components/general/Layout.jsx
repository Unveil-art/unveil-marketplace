import React from "react";
import Cursor from "./Cursor";

import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Cursor />
      {children}
      <Footer />
    </>
  );
}
