import React from "react";

const Transactions = () => {
  return (
    <>
      <div className="ml-[40px] md:ml-[35svw] mb-6 md:pr-10 pr-[15px] ">
        <table className="w-full mt-[100px]">
          <tr>
            <th className="font-normal b3 text-[17px] text-left py-5">
              Bored Tree
            </th>
            <th></th>
            <th className="font-normal b3 text-[17px] text-left py-5">From</th>
            <th className="font-normal b3 text-[17px] text-right py-5">To</th>
          </tr>
          {[1, 1, 1, 1].map((item, i) => (
            <tr className="border-t border-bgBlackOpacity " key={i}>
              <td className="py-5 md:w-28 l2">10/10/2022</td>
              <td className="py-5 md:w-64">Transfer</td>
              <td className="py-5">Alexander Sporre</td>
              <td className="py-5 text-right">Julian Mollema</td>
            </tr>
          ))}
        </table>

        <table className="w-full mt-[100px]">
          <tr>
            <th className="font-normal b3 text-[17px] text-left py-5">
              Artpiece Y
            </th>
            <th></th>
            <th className="font-normal b3 text-[17px] text-left py-5">From</th>
            <th className="font-normal b3 text-[17px] text-right py-5">To</th>
          </tr>
          {[1, 1, 1, 1].map((item, i) => (
            <tr className="border-t border-bgBlackOpacity" key={i}>
              <td className="py-5 md:w-28 l2">10/10/2022</td>
              <td className="py-5 md:w-64">Transfer</td>
              <td className="py-5">Alexander Sporre</td>
              <td className="py-5 text-right">Julian Mollema</td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
};

export default Transactions;
