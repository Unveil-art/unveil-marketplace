import Delete from "@/components/svg/Delete";
import React from "react";

const CreateForm = () => {
  return (
    <div className="w-full lg:w-[700px] space-y-[15px] lg:space-y-5">
      {/* Basic info */}
      <div className="bg-[#F9F7F2] p-5 lg:pb-[30px] rounded-[10px] space-y-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3">Basic information</p>
        <input type="text" className="input" placeholder="Artwork name" />
        <input type="text" className="input" placeholder="Year of creation" />
      </div>

      {/* Editions */}
      <div className="bg-[#F9F7F2] rounded-[10px] space-y-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3 pt-5 px-5">Editions</p>
        <div className="grid grid-cols-3 pb-[15px] px-5">
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
        <div className="border-t border-[#DBDED6] px-5 py-[15px] flex justify-between">
          <div>
            <p className="mb-[15px]">Sizes</p>
            <div className="flex gap-2 b3 lg:b4">
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                30x40
              </span>
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                30x40
              </span>
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                30x40
              </span>
              <span className="bg-[#DBDED6] px-[10px] rounded-full">+</span>
            </div>
          </div>
          <button className="btn btn-opacity btn-lg">Edit</button>
        </div>
        <div className="border-t border-[#DBDED6] px-5 py-[15px] flex justify-between">
          <div>
            <p className="mb-[15px]">Paper</p>
            <div className="flex gap-2 b3 lg:b4">
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                Hahnemühle German Etching
              </span>
              <span className="bg-[#DBDED6] px-[10px] rounded-full">+</span>
            </div>
          </div>
          <button className="btn btn-opacity btn-lg">Edit</button>
        </div>
        <div className="border-t border-[#DBDED6] px-5 py-[15px] flex justify-between">
          <div>
            <p className="mb-[15px]">Frame</p>
            <div className="flex gap-2 b3 lg:b4">
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                oak, 2mm, white frame, White border 5x10
              </span>
              <span className="bg-[#DBDED6] px-[10px] rounded-full">+</span>
            </div>
          </div>
          <button className="btn btn-opacity btn-lg">Edit</button>
        </div>
        <div className="border-t border-[#DBDED6] px-5 pb-5 lg:pb-[30px] pt-[15px] flex justify-between">
          <div>
            <p className="mb-[15px]">Technique</p>
            <div className="flex gap-2 b3 lg:b4">
              <span className="border rounded-full px-[15px] border-unveilDrakGray">
                Archival pigment print
              </span>
              <span className="bg-[#DBDED6] px-[10px] rounded-full">+</span>
            </div>
          </div>
          <button className="btn btn-opacity btn-lg">Edit</button>
        </div>
      </div>

      {/* Edition pricing */}
      <div className="bg-[#F9F7F2] rounded-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3 pt-5 px-5">Edition pricing</p>
        <div className="flex gap-2 px-5 b3 lg:b4">
          <span className="border rounded-full px-[15px] border-unveilDrakGray">
            30x40
          </span>
          <span className="border rounded-full px-[15px] border-unveilDrakGray">
            30x40
          </span>
          <span className="border rounded-full px-[15px] border-unveilDrakGray">
            30x40
          </span>
        </div>
        <div className="grid grid-cols-6 gap-2 px-5 uppercase b4 my-[15px]">
          <div></div>
          <label htmlFor="paper-select">Paper</label>
          <label htmlFor="frame-select">Frame</label>
          <label htmlFor="technique-select">Technique</label>
          <label htmlFor="pricing-select">Pricing</label>
          <div></div>
        </div>
        <div className="grid grid-cols-6 gap-2 px-5 py-[15px] border-y border-[#DBDED6] ">
          <div>1/1</div>
          <select
            id="paper-select"
            name="paper-select"
            className="truncate select-input"
          >
            <option>Hahnemühle German Etching</option>
          </select>
          <select
            id="frame-select"
            name="frame-select"
            className="truncate select-input"
          >
            <option>oak, 2mm, white frame, White border 5x10</option>
          </select>
          <select
            id="technique-select"
            name="technique-select"
            className="truncate select-input"
          >
            <option>Archival pigment print</option>
          </select>
          <div className="flex items-center gap-[10px] col-span-2">
            <input
              type="text"
              className="input"
              placeholder="Select Price (USD)"
            />
            <div className="cursor-pointer">
              <Delete big />
            </div>
          </div>
          <div></div>
          <div className="col-span-4">
            <div className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="news"
                id="news"
                className="checkbox"
              />
              <label htmlFor="news" className="b3 md:b4">
                Previously sold
              </label>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 px-5 pt-[15px] pb-5 lg:pb-[30px]">
          <div className="hidden lg:block"></div>
          <button className="lg:col-span-3 btn btn-secondary">
            Add edition
          </button>
          <button className="lg:col-span-2 lg:mr-[28px] btn btn-secondary">
            Add Artist proof
          </button>
        </div>
      </div>

      {/* Royalties */}
      <div className="bg-[#F9F7F2] rounded-[10px]">
        <div className="grid grid-cols-2 mb-[15px] px-5 pt-5">
          <p className=" b3">Royalties</p>
          <p className="hidden lg:block b4 leading-[19px] mb-[20px] opacity-80">
            To speculative buyers from flipping your artwork we have a scaling
            system with high royalties for the artist in early stages. The
            period starts when the artwork is sold.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 px-5 py-[15px] border-y border-[#DBDED6]">
          <select
            id="royalty-date-1-select"
            name="royalty-date-1-select"
            className="truncate select-input"
          >
            <option>First 12 months</option>
          </select>
          <select
            id="royalty-percent-1-select"
            name="royalty-percent-1-select"
            className="truncate select-input"
          >
            <option>15%</option>
          </select>
        </div>
        <div className="grid grid-cols-2 gap-2 px-5 py-[15px] border-b border-[#DBDED6]">
          <select
            id="royalty-date-1-select"
            name="royalty-date-1-select"
            className="truncate select-input"
          >
            <option>After 12 months</option>
          </select>
          <select
            id="royalty-percent-1-select"
            name="royalty-percent-1-select"
            className="truncate select-input"
          >
            <option>15%</option>
          </select>
        </div>

        <button className="px-32 mx-5 mt-[15px] mb-5 lg:mb-[30px] btn btn-secondary w-[calc(100%-40px)] ">
          Add date range
        </button>
      </div>

      {/* Collection */}
      <div className="bg-[#F9F7F2]  rounded-[10px] ">
        <div className="mb-[15px] lg:mb-[35px] px-5 pt-5 flex justify-between">
          <p className=" b3">Collection</p>
          <p className="opacity-80 b4">
            Which collection does this artwork belong to?
          </p>
        </div>
        <div className="px-5 border-b pb-[15px] border-[#DBDED6]">
          <select
            id="collection-select"
            name="collection-select"
            className="truncate select-input"
          >
            <option>Select collection</option>
          </select>
        </div>
        <div className="flex gap-[30px] items-center underline-offset-2 decoration-1 px-5 pt-[15px] pb-5 lg:pb-[30px] b3">
          <p>+</p>
          <p className="underline cursor-pointer">Create new collection</p>
        </div>
      </div>
    </div>
  );
};

export default CreateForm;
