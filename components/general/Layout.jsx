import React from "react";

import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import useMagic from "@/hooks/useMagic";
import useLocalStorage from "@/hooks/useLocalStorage";
import Head from "@/components/general/Head";

export default function Layout({ children }) {
  const { magic_connect } = useMagic();
  const { value } = useLocalStorage("token");

  return (
    <>
      <Head />
      <Navbar value={value} magic_connect={magic_connect} />
      {children}
      <Cursor />
      <Footer />
    </>
  );
}
