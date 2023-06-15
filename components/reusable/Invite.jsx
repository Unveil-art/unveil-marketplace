import React from "react";

const Invite = () => {
  return (
    <div className="flex items-center justify-between px-5 py-4 bg-bgColor rounded-[10px]">
      <p>
        You’ve been invited as an artist by Bastiaan Woudt. Accept within 10
        days
      </p>
      <button className="btn btn-secondary">Accept</button>
    </div>
  );
};

export default Invite;
