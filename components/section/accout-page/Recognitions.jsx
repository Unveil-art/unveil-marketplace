import React from "react";
import Delete from "../../svg/Delete";

const Recognitions = () => {
  return (
    <div className="ml-[40px] md:ml-[35svw] mb-10 pr-[15px] md:pr-10 overflow-hidden">
      <h2 className="pt-[160px] pb-10">Your recognitions</h2>
      <table className="w-full  max-w-[640px]">
        <thead>
          <tr className="border-b-2 border-unveilBlack b4">
            <td className="pb-2">Type</td>
            <td className="pb-2">Description</td>
            <td className="pb-2 text-right">Year</td>
          </tr>
        </thead>
        <tbody>
          {[1, 1, 1, 1].map((item, i) => (
            <tr
              key={i}
              className="relative border-b border-unveilGreen last:border-none"
            >
              <td className="py-2 l2">Award</td>
              <td className="b4">Nominated for Lorem ipsum</td>
              <td className="text-right b4">2023</td>
              <div className="absolute -translate-y-1/2 -right-[10px] md:-right-4 top-1/2">
                <Delete />
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="pt-[60px] pb-10">Add recognition</h2>
      <form className="space-y-2 md:space-y-[15px] relative max-w-[640px]">
        <select className="select-input" placeholder="Select type*">
          <option>Type1</option>
          <option>Type2</option>
        </select>
        <input
          placeholder="Description*"
          className="input mb-[15px]"
          type="text"
        />
        <select className="select-input" placeholder="Year*">
          <option>2023</option>
          <option>2022</option>
        </select>
        <input placeholder="Add link" className="input mb-[15px]" type="text" />
        <button className="btn btn-secondary btn-full btn-lg">Add</button>
        <div className="md:absolute bottom-0 md:w-40  w-full -right-[calc(10rem+15px)]">
          <p className=" md:leading-[25px] b4">
            <span className="font-semibold">Verifications</span>
            <br /> Adjustable info block about our verifications
          </p>
        </div>
      </form>
    </div>
  );
};

export default Recognitions;
