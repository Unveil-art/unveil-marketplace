import React from "react";
import Oneliner from "../../reusable/Oneliner";

const Referrals = () => {
  return (
    <>
      <Oneliner
        gallery={true}
        text="Unveil's Curation Board has selected a collection of top art photography projects for their excellence and stunning visuals."
      />
      <div className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10 max-w-[640px] pb-10">
        <form>
          <div className="flex items-center gap-5 mb-5">
            <h3 className="b3 text-[17px]">Referral</h3>
            <span className="px-2 py-1 rounded-full small text-unveilWhite bg-unveilBlack">
              Accepted
            </span>
          </div>
          <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
          <select className="select-input mb-[15px]">
            <option>Black</option>
            <option>White</option>
          </select>
          <div className="mb-[15px] grid grid-cols-3 gap-[15px]">
            <input
              placeholder="email"
              className="col-span-2 input"
              type="text"
            />
            <button className="btn btn-secondary">Invite sent</button>
          </div>
          <button className="py-4 btn btn-secondary btn-full">
            Delete referral
          </button>
        </form>
      </div>
    </>
  );
};

export default Referrals;
