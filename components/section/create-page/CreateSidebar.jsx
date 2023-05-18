import React, { useState } from "react";
import Image from "next/image";

const CreateSidebar = () => {
  const [image, setImage] = useState(null);
  const [detailImage1, setDetailImage1] = useState(null);
  const [detailImage2, setDetailImage2] = useState(null);
  const [soundbite, setSoundBite] = useState(null);

  const handleImageChange = (e, setState) => {
    const file = e.target.files[0];
    setState(file);
  };

  const handleRemoveImage = (setState) => {
    setState(null);
  };

  return (
    <div className="w-full lg:w-[400px] space-y-[15px] lg:space-y-5 mt-5 lg:mt-[120px]">
      {/* Image */}
      <div className="bg-[#F9F7F2] p-5 pb-[30px] rounded-[10px] space-y-[10px]">
        <div className="py-[50px] justify-center flex">
          <div
            className={`${
              image ? "mx-20" : "w-[150px] h-[200px]"
            } relative shadow  bg-unveilWhite`}
          >
            {image && (
              <img
                className="object-contain h-full w-fit"
                src={URL.createObjectURL(image)}
                alt="Selected"
              />
            )}
          </div>
        </div>
        <label
          htmlFor="image"
          className="block text-center cursor-pointer btn btn-secondary btn-full btn-lg"
        >
          {image && <p>{image.name}</p>}
          {!image && <p>upload image</p>}
        </label>
        <input
          onChange={(e) => handleImageChange(e, setImage)}
          accept="image/*"
          type="file"
          hidden
          name="image"
          id="image"
        />
        {image && (
          <p
            onClick={() => handleRemoveImage(setImage)}
            className="underline cursor-pointer underline-offset-2 b3 decoration-1"
          >
            Remove
          </p>
        )}
      </div>

      {/* detail shot 1 */}
      <div className="bg-[#F9F7F2] pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px]">Detail shot 1</p>
        <div className="flex items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <label
            htmlFor="detail-shot-1"
            className="border cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
          >
            {!detailImage1 && (
              <>
                <div className="absolute w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                <div className="absolute w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
              </>
            )}

            <input
              onChange={(e) => handleImageChange(e, setDetailImage1)}
              accept="image/*"
              type="file"
              hidden
              name="detail-shot-1"
              id="detail-shot-1"
            />
            {detailImage1 && (
              <Image
                src={URL.createObjectURL(detailImage1)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            )}
          </label>
          <div>
            {detailImage1 && (
              <>
                <p className="b3">{detailImage1.name}</p>
                <p
                  onClick={() => handleRemoveImage(setDetailImage1)}
                  className="underline cursor-pointer underline-offset-2 b4 decoration-1"
                >
                  Remove
                </p>
              </>
            )}
            {!detailImage1 && (
              <>
                <p className="b3">Add image</p>
                <p className="b4">(minimally 2000px)</p>
              </>
            )}
          </div>
        </div>
        <div className="border-y border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <p>Caption</p>

          <textarea
            name="detail-shot-caption-1"
            id="detail-shot-caption-1"
            placeholder="Add caption (max 300 char)"
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
          ></textarea>
        </div>
        <div className="px-5 pt-[15px]">
          <p>Add soundbite (optional)</p>

          <label
            htmlFor="soundbite"
            className="block cursor-pointer text-center my-[15px] btn btn-secondary btn-full btn-lg"
          >
            {soundbite && <p>{soundbite.name}</p>}
            {!soundbite && <p>upload soundbite</p>}
          </label>
          <input
            onChange={(e) => handleImageChange(e, setSoundBite)}
            accept="audio/*"
            type="file"
            hidden
            name="soundbite"
            id="soundbite"
          />

          {soundbite && (
            <p
              onClick={() => handleRemoveImage(setSoundBite)}
              className="underline cursor-pointer underline-offset-2 b3 decoration-1"
            >
              Remove
            </p>
          )}
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
          <label
            htmlFor="detail-shot-2"
            className="border cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
          >
            {!detailImage2 && (
              <>
                <div className="absolute w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                <div className="absolute w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
              </>
            )}

            <input
              onChange={(e) => handleImageChange(e, setDetailImage2)}
              accept="image/*"
              type="file"
              hidden
              name="detail-shot-2"
              id="detail-shot-2"
            />
            {detailImage2 && (
              <Image
                src={URL.createObjectURL(detailImage2)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            )}
          </label>
          <div>
            {detailImage2 && (
              <>
                <p className="b3">{detailImage2.name}</p>
                <p
                  onClick={() => handleRemoveImage(setDetailImage2)}
                  className="underline cursor-pointer underline-offset-2 b4 decoration-1"
                >
                  Remove
                </p>
              </>
            )}
            {!detailImage2 && (
              <>
                <p className="b3">Add image</p>
                <p className="b4">(minimally 2000px)</p>
              </>
            )}
          </div>
        </div>
        <div className="border-t border-[#DBDED6] pt-[15px] px-5 gap-[10px]">
          <p>Caption</p>

          <textarea
            name="detail-shot-caption-1"
            id="detail-shot-caption-1"
            placeholder="Add caption (max 300 char)"
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreateSidebar;
