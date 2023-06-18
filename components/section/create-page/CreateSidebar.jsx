import React, { useEffect, useState } from "react";
import Image from "next/image";

const CreateSidebar = ({
  errors,
  register,
  artwork,
  description,
  editionType,
  setDescription,
  frame,
}) => {
  const [image, setImage] = useState(null);
  const [detailImage1, setDetailImage1] = useState(null);
  const [detailImage2, setDetailImage2] = useState(null);
  const [soundbite, setSoundBite] = useState(null);

  useEffect(() => {
    if (artwork && artwork.detail_shots[0]) {
      setDescription(artwork.detail_shots[0].caption);
    }
  }, []);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e, setState, image) => {
    const file = e.target.files[0];
    setState(file);
  };

  const handleRemoveImage = (setState) => {
    setState(null);
  };

  return (
    <div className="w-full lg:min-w-[400px lg:max-w-[400px] space-y-[15px] lg:space-y-5 mt-5 lg:mt-[120px]">
      {/* Image */}
      <div className="bg-[#F9F7F2] shadow3 relative p-5 pb-[30px] rounded-[10px] space-y-[10px]">
        <div className="py-[50px] justify-center flex">
          <div
            className={`  ${
              image && !artwork ? "mx-20 " : "w-[150px] h-[200px]"
            } ${!image && artwork ? "w-[unset] h-[unset] mx-20 " : ""}
             ${
               image && editionType === "NFT_Only"
                 ? "shadow2 p-0 border-none"
                 : ""
             }   
            ${frame.size === "2mm" ? "border-[3px]" : ""}
            ${frame.size === "3mm" ? "border-[4px]" : ""}
            ${frame.size === "5mm" ? "border-[5px]" : ""}
            ${frame.colour === "Black" ? "border-unveilBlack" : ""}
            ${frame.colour === "White" ? "border-unveilCreme" : ""}
            ${frame.border === "None" ? "p-0" : ""}
            ${frame.border === "5x10" ? "p-2" : ""}
            ${frame.border === "10x20" ? "p-4" : ""}
            ${
              editionType === "NFT_Only"
                ? "border-none !p-0 border-unveilGreen"
                : ""
            }
            bg-unveilWhite relative shadow2`}
          >
            {artwork && !image && (
              <img
                className={` object-contain h-full w-fit`}
                src={artwork.media_url}
                alt="Selected"
              />
            )}
            {image && (
              <img
                className={` object-contain h-full w-fit`}
                src={URL.createObjectURL(image)}
                alt="Selected"
              />
            )}
          </div>
        </div>
        {!artwork && (
          <label
            htmlFor="main-image"
            className="block text-center cursor-pointer btn btn-secondary btn-full btn-lg"
          >
            {image && <p>{image.name}</p>}
            {!image && !artwork && <p>Upload image</p>}
          </label>
        )}
        {artwork && (
          <input
            accept="image/*"
            type="file"
            hidden
            name="mainImage"
            id="main-image"
            {...register("mainImage", {
              onChange: (e) => {
                handleImageChange(e, setImage, true);
              },
            })}
          />
        )}
        {!artwork && (
          <input
            accept="image/*"
            type="file"
            hidden
            name="mainImage"
            id="main-image"
            {...register("mainImage", {
              required: "Required",
              onChange: (e) => {
                handleImageChange(e, setImage);
              },
            })}
          />
        )}

        {image && (
          <p
            onClick={() => handleRemoveImage(setImage)}
            className="underline cursor-pointer underline-offset-2 b3 decoration-1"
          >
            Remove
          </p>
        )}
        <p
          className={`text-red-500 opacity-0 absolute b5 bottom-2 left-5 ${
            errors.mainImage?.message ? "opacity-100" : ""
          }`}
        >
          {errors.mainImage?.message}
        </p>
      </div>

      {/* detail shot 1 */}
      <div className="bg-[#F9F7F2] shadow3 pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px] text-[13px] md:text-[16px]">
          Detail shot 1
        </p>
        <div className="flex relative items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <label
            htmlFor="detail-shot-image-1"
            className="border hover:bg-bgColor unveilTransition cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
          >
            {!detailImage1 && (
              <>
                {!artwork?.detail_shots[0]?.image_url && (
                  <>
                    <div className="absolute z-10 w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                    <div className="absolute z-10 w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                  </>
                )}
              </>
            )}
            <input
              accept="image/*"
              type="file"
              hidden
              name="detailShotImage1"
              id="detail-shot-image-1"
              {...register("detailShotImage1", {
                onChange: (e) => {
                  handleImageChange(e, setDetailImage1);
                },
              })}
            />

            {detailImage1 && (
              <Image
                src={URL.createObjectURL(detailImage1)}
                alt="Selected"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            )}
            {!detailImage1 && artwork && (
              <>
                {artwork.detail_shots[0]?.image_url && (
                  <Image
                    src={artwork.detail_shots[0].image_url}
                    alt="Selected"
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </>
            )}
          </label>
          <div className="w-full">
            {detailImage1 && (
              <>
                <p className="truncate w-[200px] b3">{detailImage1.name}</p>
                <p
                  onClick={() => handleRemoveImage(setDetailImage1)}
                  className="underline cursor-pointer underline-offset-2 b4 decoration-1"
                >
                  Remove
                </p>
              </>
            )}
            {!detailImage1 && !artwork && (
              <>
                <p className="text-[13px] md:text-[16px] b3">Add image</p>
                <p className="b4">(minimally 2000px)</p>
                <p
                  className={`text-red-500 opacity-0 b5 ${
                    errors.detailShotImage1?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.detailShotImage1?.message}
                </p>
              </>
            )}
            {!detailImage1 && artwork && (
              <>
                <p className="text-[13px] md:text-[16px]  b3">Change image</p>
                <p className="b4">(minimally 2000px)</p>
                <p
                  className={`text-red-500 opacity-0 b5 ${
                    errors.detailShotImage1?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.detailShotImage1?.message}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="border-y border-[#DBDED6] relative py-[15px] px-5 gap-[10px]">
          <label htmlFor="detail-shot-caption-1">Caption</label>
          <textarea
            name="detailShotCaption1"
            id="detail-shot-caption-1"
            value={description}
            placeholder="Add caption (max 300 char)"
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-[15px] focus:bg-bgColorHover focus:outline-none"
            {...register("detailShotCaption1", {
              maxLength: 300,
              onChange: (e) => {
                handleDescription(e);
              },
            })}
          ></textarea>
          <p
            className={`text-red-500 opacity-0 b5 absolute bottom-0 left-5 ${
              errors.detailShotCaption1?.message ? "opacity-100" : ""
            }`}
          >
            {errors.detailShotCaption1?.message}
          </p>
        </div>
        <div className="px-5 pt-[15px] relative">
          <p>Add soundbite (optional)</p>

          {artwork && (
            <label
              htmlFor="soundbite"
              className="block cursor-pointer text-center my-[15px] btn btn-secondary btn-full btn-lg"
            >
              {soundbite && (
                <p className="truncate w-[300px] b3">{soundbite.name}</p>
              )}
              {artwork.detail_shots && (
                <>
                  {!soundbite && !artwork.detail_shots[0]?.audio_url && (
                    <p className="b3">Upload soundbite</p>
                  )}
                </>
              )}
              {artwork.detail_shots[0] && (
                <>
                  {!soundbite && artwork.detail_shots[0].audio_url && (
                    <p className="b3">Change soundbite</p>
                  )}
                </>
              )}
            </label>
          )}
          {!artwork && (
            <label
              htmlFor="soundbite"
              className="block cursor-pointer text-center my-[15px] btn btn-secondary btn-full btn-lg"
            >
              {soundbite && (
                <p className="text-[13px] md:text-[16px] truncate b3">
                  {soundbite.name}
                </p>
              )}
              {!soundbite && (
                <p className="text-[13px] md:text-[16px] b3">
                  upload soundbite
                </p>
              )}
            </label>
          )}
          <input
            onChange={(e) => handleImageChange(e, setSoundBite)}
            type="file"
            hidden
            accept="audio/*"
            name="detailShotSound1"
            id="soundbite"
            {...register("detailShotSound1", {
              validate: (value) => {
                if (value.length === 0) {
                  return true; // Pass validation if no file is selected
                } else if (value[0]) {
                  const fileType = value[0].type;
                  return (
                    (fileType && fileType.includes("audio/")) ||
                    "Please upload an audio file"
                  );
                }
                return "Please upload a file";
              },
              onChange: (e) => {
                handleImageChange(e, setSoundBite);
              },
            })}
          />

          <p
            className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-5 ${
              errors.detailShotSound1?.message ? "opacity-100" : ""
            }`}
          >
            {errors.detailShotSound1?.message}
          </p>
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

      <p className="b4 leading-[22px]  w-[80%]">
        To speculative buyers from flipping your artwork we have a scaling
        system with high royalties for the artist in early stages
      </p>

      {/* detail shot 2 */}
      <div className="bg-[#F9F7F2] shadow3 pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px] text-[13px] md:text-[16px]">
          Detail shot 2
        </p>
        <div className="flex items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <label
            htmlFor="detail-shot-2"
            className="border hover:bg-bgColor unveilTransition cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
          >
            {!detailImage2 && (
              <>
                {!artwork?.detail_shots[1]?.image_url && (
                  <>
                    <div className="absolute z-10 w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                    <div className="absolute z-10 w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                  </>
                )}
              </>
            )}

            <input
              accept="image/*"
              type="file"
              hidden
              name="detailShotImage2"
              id="detail-shot-2"
              {...register("detailShotImage2", {
                onChange: (e) => {
                  handleImageChange(e, setDetailImage2);
                },
              })}
            />

            {detailImage2 && (
              <Image
                src={URL.createObjectURL(detailImage2)}
                alt="Selected"
                fill={true}
                style={{ objectFit: "cover" }}
              />
            )}
            {!detailImage2 && artwork && (
              <>
                {artwork.detail_shots[1]?.image_url && (
                  <Image
                    src={artwork.detail_shots[1].image_url}
                    alt="Selected"
                    fill={true}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </>
            )}
          </label>
          <div>
            {detailImage2 && (
              <>
                <p className="truncate w-[200px] b3">{detailImage2.name}</p>
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
                <p className="text-[13px] md:text-[16px] b3">Add image</p>
                <p className="b4">(minimally 2000px)</p>
                <p
                  className={`text-red-500 opacity-0 b5 ${
                    errors.detailShotImage2?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.detailShotImage2?.message}
                </p>
              </>
            )}
            {!detailImage2 && artwork?.detail_shots[1]?.image_url && (
              <>
                <p className="text-[13px] md:text-[16px] b3">Change image</p>
                <p className="b4">(minimally 2000px)</p>
                <p
                  className={`text-red-500 opacity-0 b5 ${
                    errors.detailShotImage2?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.detailShotImage2?.message}
                </p>
              </>
            )}
          </div>
        </div>
        <div className="border-t relative border-[#DBDED6] pt-[15px] px-5 gap-[10px]">
          <label htmlFor="detail-shot-caption-1">Caption</label>

          <textarea
            name="detailShotCaption2"
            id="detail-shot-caption-1"
            placeholder="Add caption (max 300 char)"
            defaultValue={
              artwork && artwork.detail_shots
                ? artwork.detail_shots[1]?.caption
                : null
            }
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-[15px] focus:bg-bgColorHover focus:outline-none"
            {...register("detailShotCaption2", {
              maxLength: 300,
            })}
          ></textarea>
          <p
            className={`text-red-500 opacity-0 b5 absolute left-5 -bottom-4 ${
              errors.detailShotCaption2?.message ? "opacity-100" : ""
            }`}
          >
            {errors.detailShotCaption2?.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateSidebar;
