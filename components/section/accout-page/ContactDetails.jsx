import React from "react";

const ContactDetails = () => {
  return (
    <>
      <form className="ml-[40px] md:ml-[35svw] pr-[15px] md:pr-10 max-w-[640px]">
        <div className="pt-[60px] md:pt-[100px] pb-10 md:pb-20 flex gap-5 items-center">
          <div className="w-[308px] md:h-[308px] aspect-square  bg-bgColor rounded-full"></div>
          <div>
            <p className=":max-w-[200px] mb-2">
              Profile picture (minimally 1500x1500)
            </p>
            <label for="file-upload" class="underline cursor-pointer">
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
        <hr className="mb-[15px] h-[2px] bg-unveilGreen" />

        <div>
          <h3 className="b3 text-[17px] mb-5">Contact information</h3>
          <div>
            <div className="grid grid-cols-2 md:gap-[15px] gap-2 ">
              <input placeholder="First name" className="input" type="text" />
              <input placeholder="Last name" className="input" type="text" />
            </div>
            <input placeholder="Email" className="input" type="email" />
            <div className="flex items-center gap-2 mt-[15px] cursor-pointer">
              <input
                type="checkbox"
                name="news"
                id="news"
                className="checkbox"
              />
              <label htmlFor="news" className="b3 md:b4">
                Keep me up to date on news and exclusive offers
              </label>
            </div>
          </div>
        </div>
        <div className="pt-10">
          <h3 className="b3 text-[17px] mb-5">Wallet address</h3>
          <div>
            <input placeholder="Wallet address" className="input" type="text" />
          </div>
        </div>
        <div className="pt-10">
          <h3 className="b3 text-[17px] mb-5">Quote or oneliner</h3>
          <input
            placeholder="Max 75 characters"
            className="input"
            type="text"
          />
        </div>
        <div className="pt-10">
          <h3 className="b3 text-[17px] mb-5">About artist</h3>
          <textarea
            className="textarea"
            name="about"
            id="about"
            placeholder="Write in 300 characters about you"
          ></textarea>
        </div>
        <div className="pt-10">
          <h3 className="b3 text-[17px] mb-5">Links</h3>
          <input
            placeholder="Instagram"
            className="input mb-2 md:mb-[15px]"
            type="text"
          />
          <input
            placeholder="Twitter"
            className="input mb-2 md:mb-[15px]"
            type="text"
          />
          <input placeholder="Website" className="input" type="text" />
        </div>
        <div className="pt-10">
          <h3 className="b3 text-[17px] mb-5">
            Background colour (for our platform)
          </h3>
          <select className="select-input">
            <option>Black</option>
            <option>White</option>
          </select>
        </div>
        <button
          className="mt-10 mb-10 btn btn-primary btn-lg btn-full md:btn-wide"
          type="submit"
        >
          Save settings
        </button>
      </form>
    </>
  );
};

export default ContactDetails;
