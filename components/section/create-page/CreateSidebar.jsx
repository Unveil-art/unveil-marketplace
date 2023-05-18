import React from "react";

const CreateSidebar = () => {
  return (
    <div className="w-full lg:w-[400px] space-y-[15px] lg:space-y-5 mt-5 lg:mt-[120px]">
      {/* Image */}
      <div className="bg-[#F9F7F2] p-5 pb-[30px] rounded-[10px] space-y-[10px]">
        <div className="py-[50px] justify-center flex">
          <div className="w-[150px] h-[200px] shadow bg-bgColor"></div>
        </div>
        <button className="btn btn-secondary btn-full btn-lg">
          Artwork 2.jpg
        </button>

        <p className="underline cursor-pointer underline-offset-2 b3 decoration-1">
          Remove
        </p>
      </div>

      {/* detail shot 1 */}
      <div className="bg-[#F9F7F2] pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px]">Detail shot 1</p>
        <div className="flex items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <div className="border bg-bgColor border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"></div>
          <div>
            <input type="file" name="detail-shot-1" id="detail-shot-1" />
            <p className="underline cursor-pointer underline-offset-2 b3 decoration-1">
              Remove
            </p>
          </div>
        </div>
        <div className="border-y border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <p>Caption</p>

          <textarea
            name="detail-shot-caption-1"
            id="detail-shot-caption-1"
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
          ></textarea>
        </div>
        <div className="px-5 pt-[15px]">
          <p>Add soundbite (optional)</p>
          <button className="my-[15px] btn btn-secondary btn-full btn-lg">
            soundbite.mp3
          </button>

          <p className="underline cursor-pointer underline-offset-2 b3 decoration-1">
            Remove
          </p>
        </div>
      </div>

      <p className="b4 w-[80%]">
        To speculative buyers from flipping your artwork we have a scaling
        system with high royalties for the artist in early stages
      </p>

      {/* detail shot 2 */}
      <div className="bg-[#F9F7F2] pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px]">Detail shot 2</p>
        <div className="flex items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <div className="border bg-bgColor border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"></div>
          <div>
            <input type="file" name="detail-shot-2" id="detail-shot-2" />
            <p className="underline cursor-pointer underline-offset-2 b3 decoration-1">
              Remove
            </p>
          </div>
        </div>
        <div className="border-t border-[#DBDED6] pt-[15px] px-5 gap-[10px]">
          <p>Caption</p>

          <textarea
            name="detail-shot-caption-1"
            id="detail-shot-caption-1"
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreateSidebar;
