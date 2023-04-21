import React from "react";

const UpcomingDrop = () => {
  return (
    <section className="grid gird-cols-1 md:grid-cols-2">
      <div className="w-full aspect-square bg-bgColor"></div>
      <div className="flex flex-col justify-between p-10 pt-20 md:pt-10 pb-20 md:pb-[60px] bg-[#E2CBAB]">
        <p className="text-center md:text-left l2">Upcoming drop</p>
        <h3 className="md:text-left text-center h4 md:h3 mt-[15px]">
          Paul Cupido
          <br /> Lorem ipsum dolor
        </h3>
      </div>
    </section>
  );
};

export default UpcomingDrop;
