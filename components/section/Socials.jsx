import React from "react";

const Socials = ({ title, data }) => {
  return (
    <section className="p-[15px] md:p-10 md:pb-10 pb-[60px]">
      <h2 className="b1">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 group mt-[130px] md:mt-[180px] border-t-[3px] md:border-t-4 border-t-unveilBlack">
        {data.map((item) => (
          <div
            key={item.id}
            className="md:mt-[10px] border-b md:last:border-none border-b-unveilGreen md:border-b-transparent md:border-b-none  md:border-r border-r-unveilDrakGray md:mr-5 md:block flex items-center justify-between"
          >
            <p className="md:pt-6 md:mb-6 py-[17px] b3">{item.heading}</p>
            <h3 className="md:b1 h3 text-[24px]">{item.body}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Socials;
