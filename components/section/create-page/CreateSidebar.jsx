import React, { useEffect, useState } from "react";
import Image from "next/image";

const CreateSidebar = ({
  errors,
  register,
  artwork,
  description,
  setDescription,
}) => {
  const [image, setImage] = useState(null);
  const [detailImage1, setDetailImage1] = useState(null);
  const [detailImage2, setDetailImage2] = useState(null);
  const [soundbite, setSoundBite] = useState(null);

  useEffect(() => {
    if (artwork) {
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
    <div className="w-full lg:w-[400px] space-y-[15px] lg:space-y-5 mt-5 lg:mt-[120px]">
      {/* Image */}
      <div className="bg-[#F9F7F2] relative p-5 pb-[30px] rounded-[10px] space-y-[10px]">
        <div className="py-[50px] justify-center flex">
          <div
            className={`${
              image ? "mx-20" : "w-[150px] h-[200px]"
            } relative shadow  bg-unveilWhite`}
          >
            {artwork && !image && (
              <img
                className="object-contain h-full w-fit"
                src={artwork.media_url}
                alt="Selected"
              />
            )}
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
          htmlFor="main-image"
          className="block text-center cursor-pointer btn btn-secondary btn-full btn-lg"
        >
          {image && <p>{image.name}</p>}
          {!image && !artwork && <p>Upload image</p>}
          {!image && artwork && <p>Change image</p>}
        </label>
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
      <div className="bg-[#F9F7F2] pb-[30px] rounded-[10px]">
        <p className="px-5 pt-5 pb-[35px]">Detail shot 1</p>
        <div className="flex relative items-center border-t border-[#DBDED6] py-[15px] px-5 gap-[10px]">
          <label
            htmlFor="detail-shot-image-1"
            className="border cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
          >
            {!detailImage1 && (
              <>
                {!artwork && (
                  <>
                    <div className="absolute z-10 w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                    <div className="absolute z-10 w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                  </>
                )}
              </>
            )}
            {artwork && (
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
            )}
            {!artwork && (
              <input
                accept="image/*"
                type="file"
                hidden
                name="detailShotImage1"
                id="detail-shot-image-1"
                {...register("detailShotImage1", {
                  required: "Required",
                  onChange: (e) => {
                    handleImageChange(e, setDetailImage1);
                  },
                })}
              />
            )}

            {detailImage1 && (
              <Image
                src={URL.createObjectURL(detailImage1)}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            )}
            {!detailImage1 && artwork && (
              <Image
                src={artwork.detail_shots[0].image_url}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            )}
          </label>
          <div className="w-full">
            {detailImage1 && (
              <>
                <p className="truncate b3">{detailImage1.name}</p>
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
                <p className="b3">Add image</p>
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
                <p className="b3">Change image</p>
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
            defaultValue={artwork ? artwork.detail_shots[0].caption : null}
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
            {...register("detailShotCaption1", {
              required: "Required",
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
              {soundbite && <p className="truncate b3">{soundbite.name}</p>}
              {!soundbite && !artwork.detail_shots[0].audio_url && (
                <p className="b3">Upload soundbite</p>
              )}
              {!soundbite && artwork.detail_shots[0].audio_url && (
                <p className="b3">Change soundbite</p>
              )}
            </label>
          )}
          {!artwork && (
            <label
              htmlFor="soundbite"
              className="block cursor-pointer text-center my-[15px] btn btn-secondary btn-full btn-lg"
            >
              {soundbite && <p className="truncate b3">{soundbite.name}</p>}
              {!soundbite && <p className="b3">upload soundbite</p>}
            </label>
          )}
          <input
            onChange={(e) => handleImageChange(e, setSoundBite)}
            accept="audio/*"
            type="file"
            hidden
            name="detailShotSound1"
            id="soundbite"
            {...register("detailShotSound1", {
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
                {!artwork && (
                  <>
                    <div className="absolute z-10 w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                    <div className="absolute z-10 w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                  </>
                )}
              </>
            )}
            {artwork && (
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
            )}
            {!artwork && (
              <input
                accept="image/*"
                type="file"
                hidden
                name="detailShotImage2"
                id="detail-shot-2"
                {...register("detailShotImage2", {
                  required: "required",
                  onChange: (e) => {
                    handleImageChange(e, setDetailImage2);
                  },
                })}
              />
            )}
            {detailImage2 && (
              <div className="relative z-20 w-full h-full">
                <Image
                  src={URL.createObjectURL(detailImage2)}
                  alt="Selected"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
            {!detailImage2 && artwork && (
              <Image
                src={artwork.detail_shots[1].image_url}
                alt="Selected"
                layout="fill"
                objectFit="cover"
              />
            )}
          </label>
          <div>
            {detailImage2 && (
              <>
                <p className="truncate b3">{detailImage2.name}</p>
                <p
                  onClick={() => handleRemoveImage(setDetailImage2)}
                  className="underline cursor-pointer underline-offset-2 b4 decoration-1"
                >
                  Remove
                </p>
              </>
            )}
            {!detailImage2 && !artwork && (
              <>
                <p className="b3">Add image</p>
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
            {!detailImage2 && artwork && (
              <>
                <p className="b3">Change image</p>
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
            defaultValue={artwork ? artwork.detail_shots[1].caption : null}
            className="bg-bgColor rounded-[10px] w-full h-[120px] mt-5 p-2 focus:bg-bgColorHover focus:outline-none"
            {...register("detailShotCaption2", {
              required: "Required",
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
