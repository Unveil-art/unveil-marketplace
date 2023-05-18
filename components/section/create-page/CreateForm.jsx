import Delete from "@/components/svg/Delete";
import React, { useState } from "react";

const CreateForm = () => {
  const [royalties, setRoyalties] = useState([
    { from: "First 12 months", percentage: "15%" },
  ]);

  const defaultRoyalties = { from: "After 12 months", percentage: "15%" };

  const handleSelectChange = (index, name, value) => {
    setRoyalties((prevRoyalties) => {
      const updatedRoyalties = [...prevRoyalties];
      updatedRoyalties[index] = { ...updatedRoyalties[index], [name]: value };
      return updatedRoyalties;
    });
  };

  const handleDeleteRoyalty = (index) => {
    setRoyalties((prevRoyalties) => {
      const updatedRoyalties = [...prevRoyalties];
      updatedRoyalties.splice(index, 1);
      return updatedRoyalties;
    });
  };

  return (
    <div className="w-full lg:w-[700px] space-y-[15px] lg:space-y-5">
      {/* Basic info */}
      <div className="bg-[#F9F7F2] p-5 lg:pb-[30px] rounded-[10px] space-y-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3">Basic information</p>
        <input type="text" className="input" placeholder="Artwork name" />
        <select className="select-input">
          {Array.from(
            { length: new Date().getFullYear() - 1990 + 1 },
            (_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            )
          )}
        </select>
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
        <div className="grid grid-cols-2 border-b border-[#DBDED6] pb-[15px] px-5 pt-5">
          <p className=" b3">Royalties</p>
          <p className="hidden lg:block b4 leading-[19px] mb-[20px] opacity-80">
            To speculative buyers from flipping your artwork we have a scaling
            system with high royalties for the artist in early stages. The
            period starts when the artwork is sold.
          </p>
        </div>

        {royalties.map((item, i) => (
          <div
            key={i}
            className="grid relative grid-cols-2 pr-10 gap-2 px-5 py-[15px] border-b border-[#DBDED6]"
          >
            <select
              value={item.from}
              onChange={(e) => handleSelectChange(i, "from", e.target.value)}
              name="from"
              className="truncate select-input"
            >
              <option value="First month">First month</option>
              <option value="First 2 months">First 2 months</option>
              <option value="First 3 months">First 3 months</option>
              <option value="First 4 months">First 4 months</option>
              <option value="First 5 months">First 5 months</option>
              <option value="First 6 months">First 6 months</option>
              <option value="First 7 months">First 7 months</option>
              <option value="First 8 months">First 8 months</option>
              <option value="First 9 months">First 9 months</option>
              <option value="First 10 months">First 10 months</option>
              <option value="First 11 months">First 11 months</option>
              <option value="First 12 months">First 12 months</option>
              <option value="After 1 month">After 1 month</option>
              <option value="After 2 months">After 2 months</option>
              <option value="After 3 months">After 3 months</option>
              <option value="After 4 months">After 4 months</option>
              <option value="After 5 months">After 5 months</option>
              <option value="After 6 months">After 6 months</option>
              <option value="After 7 months">After 7 months</option>
              <option value="After 8 months">After 8 months</option>
              <option value="After 9 months">After 9 months</option>
              <option value="After 10 months">After 10 months</option>
              <option value="After 11 months">After 11 months</option>
              <option value="After 12 months">After 12 months</option>
            </select>
            <select
              value={item.percentage}
              onChange={(e) =>
                handleSelectChange(i, "percentage", e.target.value)
              }
              name="percentage"
              className="truncate select-input"
            >
              <option value="1%">1%</option>
              <option value="2%">2%</option>
              <option value="3%">3%</option>
              <option value="4%">4%</option>
              <option value="5%">5%</option>
              <option value="6%">6%</option>
              <option value="7%">7%</option>
              <option value="8%">8%</option>
              <option value="9%">9%</option>
              <option value="10%">10%</option>
              <option value="11%">11%</option>
              <option value="12%">12%</option>
              <option value="13%">13%</option>
              <option value="14%">14%</option>
              <option value="15%">15%</option>
            </select>
            <div
              onClick={() => handleDeleteRoyalty(i)}
              className="absolute cursor-pointer -translate-y-1/2 right-[15px] top-1/2"
            >
              <Delete big />
            </div>
          </div>
        ))}

        <button
          onClick={() =>
            setRoyalties((prevItems) => [...prevItems, defaultRoyalties])
          }
          className="px-32 mx-5 mt-[15px] mb-5 lg:mb-[30px] btn btn-secondary w-[calc(100%-40px)] "
        >
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
