import React from "react";

const CreateForm = () => {
  return (
    <form className="w-[700px] space-y-5">
      <div className="bg-[#F9F7F2] p-5 rounded-[10px] space-y-[10px]">
        <p className="mb-[10px] b3">Basic information</p>
        <input type="text" className="input" placeholder="Artwork name" />
        <input type="text" className="input" placeholder="Year of creation" />
      </div>
      <div className="bg-[#F9F7F2] p-5 rounded-[10px] space-y-[10px]">
        <p className="mb-[10px] b3">Editions</p>
        <div className="grid grid-cols-3 pb-[15px]">
          <div>
            <input
              className="radio-block left"
              type="radio"
              name="type"
              id="nft-print"
            />
            <label htmlFor="nft-print">NFT backed by print</label>
          </div>
          <div>
            <input className="radio-block" type="radio" name="type" id="nft" />
            <label htmlFor="nft">NFT Only</label>
          </div>
          <div>
            <input
              className="radio-block right"
              type="radio"
              name="type"
              id="print"
            />
            <label htmlFor="print">Print only</label>
          </div>
        </div>
      </div>

      <div className="bg-[#F9F7F2] p-5 rounded-[10px] space-y-[10px]">
        <div className="mb-[10px] flex justify-between">
          <p className="b3">Editions</p>
          <p className="opacity-60 b4">
            Which collection does this artwork belong to?
          </p>
        </div>
        <div className="grid grid-cols-3 pb-[15px]"></div>
      </div>
    </form>
  );
};

export default CreateForm;
