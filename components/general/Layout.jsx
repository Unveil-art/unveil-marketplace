import React from "react";

import Cursor from "./Cursor";
import Footer from "./Footer";
import Navbar from "./Navbar";
import useMagic from "@/hooks/useMagic";
import useLocalStorage from "@/hooks/useLocalStorage";
import Head from "@/components/general/Head";
import AskEmail from "./AskEmail";

export default function Layout({ children }) {
  const { value } = useLocalStorage("token");

  return (
    <>
      <Head />
      <Navbar value={value} />
      <AskEmail />
      {children}
      <Cursor />
      <Footer />
    </>
  );
}
