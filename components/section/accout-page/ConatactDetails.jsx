import React from "react";

const ConatactDetails = () => {
  return (
    <>
      <form className="ml-[40px] md:ml-[35vw] pr-[15px] md:pr-10">
        <div className="pt-[100px] pb-20 flex gap-5 items-center">
          <div className="w-[308px] h-[308px] bg-unveilGreen rounded-full"></div>
          <div>
            <p className="max-w-[200px] mb-2">
              Profile picture (minimally 1500x1500)
            </p>
            <label for="file-upload" className="underline cursor-pointer">
              Change image
            </label>
            <input
              className="hidden"
              id="file-upload"
              type="file"
              name="profile_picture"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
        </div>
        <div className="space-y-10">
          <h3 className="b3 text-[17px] mb-8">Contact information</h3>
          <div>
            <div className="grid grid-cols-2 gap-x-[15px] mb-[15px]">
              <input placeholder="First name" className="input" type="text" />
              <input placeholder="Last name" className="input" type="text" />
            </div>
            <input placeholder="Email" className="input" type="email" />
            <div className="flex items-center gap-2 mt-[15px]">
              <input
                type="checkbox"
                name="news"
                id="news"
                className="checkbox"
              />
              <label htmlFor="news" className="b4">
                Keep me up to date on news and exclusive offers
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ConatactDetails;
