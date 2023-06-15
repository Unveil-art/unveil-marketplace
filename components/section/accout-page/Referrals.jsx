import React from "react";
import Oneliner from "../../reusable/Oneliner";
import Invite from "@/components/reusable/Invite";
import Animate from "@/components/reusable/Animate";
const Referrals = () => {
  return (
    <>
      {/* TODO: invite label an other color based on status  */}
      <Animate options={{ alpha: true }}>
        <Oneliner
          mr
          nmb
          gallery={true}
          text="Unveil's Curation Board has selected a collection of top art photography projects for their excellence and stunning visuals."
        />
        <div className="ml-[40px] mt-10 md:ml-[35svw] pr-[15px] md:pr-10 max-w-[640px] pb-10">
          <Invite />
          <form className="mt-10">
            <div className="flex items-center gap-[5px] mb-5">
              <h3 className="b3 text-[17px]">Referral 1</h3>
              <span className="px-2 py-1 rounded-full small text-unveilWhite bg-unveilBlack">
                Accepted
              </span>
            </div>
            <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
            <select className="select-input mb-2 md:mb-[15px]">
              <option>Black</option>
              <option>White</option>
            </select>
            <div className="mb-2 md:mb-[15px] grid grid-cols-5 md:grid-cols-3 gap-2 md:gap-[15px]">
              <input
                placeholder="email"
                className="col-span-3 md:col-span-2 input"
                type="text"
              />
              <button className="col-span-2 btn btn-secondary btn-lg md:col-auto">
                Invite sent
              </button>
            </div>
            <button className="btn-lg btn btn-secondary btn-full">
              Delete referral
            </button>
          </form>

          <hr className="my-10 h-[2px] bg-unveilGreen" />
          <button className="btn-lg btn btn-secondary btn-full">
            Add more
          </button>
        </div>
      </Animate>
    </>
  );
};

export default Referrals;
