import React from "react";

const Sidebar = ({ accountState, setAccountState }) => {
  const handleAccountState = (i) => {
    window.scrollTo(0, 0);
    setAccountState(i);
  };
  return (
    <div className="sticky md:flex hidden top-0 flex-col justify-end h-[calc(100vh-40px)] space-y-1 text-unveilDrakGray left-10 s2 w-0 mb-10">
      <p
        onClick={() => handleAccountState(0)}
        className={`${
          accountState === 0 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Artwork
      </p>
      <p
        onClick={() => handleAccountState(1)}
        className={`${
          accountState === 1 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Transactions
      </p>
      <p
        onClick={() => handleAccountState(2)}
        className={`${
          accountState === 2 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Owned NFTs
      </p>
      <p
        onClick={() => handleAccountState(3)}
        className={`${
          accountState === 3 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Contact details
      </p>
      <p
        onClick={() => handleAccountState(4)}
        className={`${
          accountState === 4 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Membership
      </p>
      <p
        onClick={() => handleAccountState(5)}
        className={`${
          accountState === 5 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Referrals
      </p>
      <p
        onClick={() => handleAccountState(6)}
        className={`${
          accountState === 6 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Recognitions
      </p>
      <p
        onClick={() => handleAccountState(7)}
        className={`${
          accountState === 7 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Wishlist
      </p>
      <p
        onClick={() => handleAccountState(8)}
        className={`${
          accountState === 8 ? "text-unveilBlack" : ""
        } cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Followed artists
      </p>
      <p
        className={` cursor-pointer hover:text-unveilBlack unveilTransition whitespace-nowrap`}
      >
        Logout
      </p>
    </div>
  );
};

export default Sidebar;
