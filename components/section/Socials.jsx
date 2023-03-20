import React from "react";

const Socials = () => {
  return (
    <section className="p-[15px] md:p-10 md:pb-10 pb-[60px]">
      <h2 className="b1">Follow us and stay in the loop</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 group mt-[130px] md:mt-[180px] border-t-[3px] md:border-t-4 border-t-unveilBlack">
        <div className="md:mt-[10px] border-b border-b-unveilGreen md:border-b-transparent md:border-b-none  md:border-r border-r-unveilBlack md:mr-5 md:block flex items-center justify-between">
          <p className="md:pt-6 md:mb-6 py-[17px] b4">Community</p>
          <h3 className="md:b1 h3 text-[24px]">Discord</h3>
        </div>
        <div className="md:mt-[10px] border-b border-b-unveilGreen md:border-b-transparent md:border-b-none  md:border-r border-r-unveilBlack md:mr-5 md:block flex items-center justify-between">
          <p className="md:pt-6 md:mb-6 py-[17px] b4">Community</p>
          <h3 className="md:b1 h3 text-[24px]">Discord</h3>
        </div>
        <div className="md:mt-[10px] border-b border-b-unveilGreen md:border-b-transparent  md:border-r border-r-unveilBlack md:mr-5 md:block flex items-center justify-between">
          <p className="md:pt-6 md:mb-6 py-[17px] b4">Community</p>
          <h3 className="md:b1 h3 text-[24px]">Discord</h3>
        </div>
        <div className="md:mt-[10px] border-b border-b-unveilGreen md:border-b-transparent md:border-b-none md:border-r group-last:border-none border-r-unveilBlack md:mr-5 md:block flex items-center justify-between">
          <p className="md:pt-6 md:mb-6 py-[17px] b4">Community</p>
          <h3 className="md:b1 h3 text-[24px]">Discord</h3>
        </div>
      </div>
    </section>
  );
};

export default Socials;
