import React from "react";
import ArtworkListItem from "../../reusable/ArtworkListItem";
import Title from "../../reusable/Title";

const Transactions = ({ children }) => {
  return (
    <>
      <Title title="Transaction overview" />
      {children}
      <div className="ml-[40px] md:ml-[35svw] mb-6 pr-[15px]"></div>
    </>
  );
};

export default Transactions;
