import React from "react";

const Newsletter = () => {
  return (
    <section className="grid mb-5 md:mb-10 grid-cols-1 md:grid-cols-2 px-[15px] md:px-10">
      <h2 className="pb-[120px] h3 max-w-[220px] md:max-w-[390px]">
        Never miss a special edition
      </h2>
      <div className="flex flex-col justify-between">
        <form className="flex flex-col gap-[8px] md:gap-5 md:flex-row">
          <input
            className="input"
            type="text"
            placeholder="Enter your email address"
          />
          <button
            type="submit"
            className="w-full px-14 btn md:w-fit btn-primary"
          >
            Send
          </button>
        </form>
        <p className="mt-5 l2">Updates, offers & more</p>
      </div>
    </section>
  );
};

export default Newsletter;
