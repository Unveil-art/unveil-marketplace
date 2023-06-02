import React from "react";
import Title from "../reusable/Title";
import OneLiner from "../reusable/Oneliner";
import { useRouter } from "next/router";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full pt-[120px]">
      <Title title="Page not found" />
      <OneLiner text="" />
    </div>
  );
};

export default PageNotFound;
