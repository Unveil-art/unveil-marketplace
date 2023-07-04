import React, { useState } from "react";
import Loader from "@/components/svg/Loader";
import Image from "next/image";
import { uploadImage, putUserMe } from "lib/backend";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import Animate from "@/components/reusable/Animate";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";

const ContactDetails = ({ user }) => {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const { value } = useLocalStorage("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    setLoading(true);

    let profileURL = "";
    if (image) {
      profileURL = await uploadImage(value, values.profileUrl[0]);
      profileURL = profileURL.data;
    } else if (user.profileUrl) {
      profileURL = user.profileUrl;
    }
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      walletAddress: user.walletAddress,
      profileUrl: profileURL,
      description: values.description,
      oneLiner: values.oneLiner,
      instagram: values.instagram,
      twitter: values.twitter,
      website: values.website,
      theme: values.theme,
    };

    try {
      await putUserMe(value, data);
      setLoading(false);
      // toast.success("Success");
      showTopStickyNotification("success", "Success")
    } catch (err) {
      setLoading(false);
      console.error(err);
      // toast.error(err.message);
      showTopStickyNotification("error", err.message)
    }
  };

  return (
    <>
      <Animate options={{ alpha: true }}>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10 max-w-[640px]"
        >
          <div className=" pt-[80px] md:pt-[160px] pb-10 md:pb-20 flex gap-5 items-center">
            <div className="w-[308px] md:h-[308px] relative overflow-hidden aspect-square  bg-bgColor rounded-full">
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  priority
                />
              )}
              {!image && user.profileUrl && (
                <Image
                  src={user.profileUrl}
                  alt="Selected"
                  fill={true}
                  style={{ objectFit: "cover" }}
                  priority
                />
              )}
            </div>
            <div>
              <p className="max-w-[200px] mb-2 b3">
                {image && <>{image.name}</>}
                {!image && <>Profile picture (minimally 1500x1500)</>}
              </p>
              {!image && (
                <label for="profileUrl" className="underline cursor-pointer ">
                  {user.profileUrl && <>Change image</>}
                  {!user.profileUrl && <>Add image</>}
                </label>
              )}
              {image && (
                <p
                  onClick={() => setImage(null)}
                  className="underline cursor-pointer b3"
                >
                  Remove
                </p>
              )}
              <input
                accept="image/*"
                type="file"
                hidden
                name="profileUrl"
                id="profileUrl"
                {...register("profileUrl", {
                  onChange: (e) => {
                    handleImageChange(e);
                  },
                })}
              />
            </div>
          </div>
          <hr className="mb-[15px] h-[1px] bg-unveilGreen" />
          <div>
            <h3 className="b3 text-[17px] mb-5">Contact information</h3>
            <div>
              <div className="grid grid-cols-2 mb-[15px] md:gap-x-[15px] gap-x-2 ">
                <div className="relative">
                  <input
                    defaultValue={user.firstName ? user.firstName : ""}
                    placeholder="First name"
                    className="input"
                    type="text"
                    name="firstName"
                    {...register("firstName", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.firstName?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.firstName?.message}
                  </p>
                </div>

                <div className="relative">
                  <input
                    defaultValue={user.lastName ? user.lastName : ""}
                    placeholder="Last name"
                    className="input"
                    type="text"
                    name="lastName"
                    {...register("lastName", {
                      required: "Required",
                    })}
                  />
                  <p
                    className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                      errors.lastName?.message ? "opacity-100" : ""
                    }`}
                  >
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>
              <div className="relative">
                <input
                  defaultValue={user.email ? user.email : ""}
                  placeholder="Email"
                  className="input"
                  name="email"
                  type="text"
                  {...register("email", {
                    required: "Required",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Invalid email",
                    },
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.email?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.email?.message}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <h3 className="b3 text-[17px] mb-5">Wallet address</h3>
            <div className="relative">
              <div
                onClick={() => {
                  navigator.clipboard.writeText(
                    user.walletAddress?.toLowerCase()
                  );
                  // toast.info("WalletAddress Copied");
                  showTopStickyNotification("success", "WalletAddress Copied")
                }}
                className="input cursor-pointer bg-bgColor md:text-[16px] text-unveilGrey rounded-[8px] md:rounded-[10px] px-5 py-3 md:py-4 text-[13px]"
              >
                {user.walletAddress?.toLowerCase()}
              </div>
            </div>
          </div>
          <div className="pt-10">
            <h3 className="b3 text-[17px] mb-5">Quote or oneliner</h3>
            <input
              defaultValue={user.oneLiner ? user.oneLiner : ""}
              placeholder="Max 75 characters"
              className="input"
              type="text"
              {...register("oneLiner")}
            />
          </div>
          <div className="relative pt-10">
            <h3 className="b3 text-[17px] mb-5">About me</h3>
            <textarea
              data-lenis-prevent
              defaultValue={user.description ? user.description : ""}
              className="textarea"
              id="about"
              placeholder="Write in 300 characters about you"
              name="description"
              {...register("description", {
                required: "Required",
              })}
            ></textarea>
            <p
              className={`text-red-500 opacity-0 b5 absolute -bottom-3 left-0 ${
                errors.description?.message ? "opacity-100" : ""
              }`}
            >
              {errors.description?.message}
            </p>
          </div>
          <div className="pt-10">
            <h3 className="b3 text-[17px] mb-5">Links</h3>
            <input
              placeholder="Instagram"
              defaultValue={user.instagram ? user.instagram : ""}
              className="input mb-2 md:mb-[15px]"
              type="text"
              {...register("instagram")}
            />
            <input
              placeholder="Twitter"
              defaultValue={user.twitter ? user.twitter : ""}
              className="input mb-2 md:mb-[15px]"
              type="text"
              {...register("twitter")}
            />
            <input
              {...register("website")}
              defaultValue={user.website ? user.website : ""}
              placeholder="Website"
              className="input"
              type="text"
            />
          </div>
          <div className="flex mt-[15px] items-center gap-2 cursor-pointer">
            <input type="checkbox" name="news" id="news" className="checkbox" />
            <label htmlFor="news" className="b3 md:b4">
              Keep me up to date on news and exclusive offers
            </label>
          </div>
          <div className="pt-10">
            <h3 className="b3 text-[17px] mb-5">
              Background colour (for our platform)
            </h3>
            <select
              defaultValue={user.theme ? user.theme : ""}
              {...register("theme")}
              className="select-input"
            >
              <option>Black</option>
              <option>White</option>
            </select>
          </div>
          <button
            className="flex items-center justify-center mt-10 mb-10 btn btn-primary btn-lg btn-full md:btn-wide"
            type="submit"
          >
            {loading && (
              <div className="h-[25px] animate-spin flex items-center">
                <Loader color="#F6F4ED" />
              </div>
            )}
            {!loading && <>Save settings</>}
          </button>
        </form>
      </Animate>
    </>
  );
};

export default ContactDetails;
