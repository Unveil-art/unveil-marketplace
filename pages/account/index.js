import React, { useState } from "react";

import Sidebar from "../../components/section/accout-page/Sidebar";
import Artworks from "../../components/section/accout-page/Artworks";
import Transactions from "../../components/section/accout-page/Transactions";

const AccountPage = () => {
  const [accountState, setAccountState] = useState(0);

  const handleAccountState = (e, i) => {
    window.scrollTo(0, 0);
    setAccountState(e.target.selectedIndex);
  };

  return (
    <main className="relative flex ">
      <Sidebar accountState={accountState} setAccountState={setAccountState} />
      <section className="mt-[100px] w-full">
        {accountState === 0 && (
          <Artworks>
            <div className="block md:hidden ml-[40px] md:ml-[35svw] border-unveilBlack border-t-2 mr-[15px]">
              <select
                className="select"
                onChange={(e) => handleAccountState(e)}
              >
                <option>Artwork</option>
                <option>Transactions</option>
                <option>Owned NFTs</option>
                <option>Contact details</option>
                <option>Membership</option>
                <option>Referrals</option>
                <option>Recognitions</option>
                <option>Wishlist</option>
                <option>Followed artists</option>
                <option>Logout</option>
              </select>
            </div>
          </Artworks>
        )}
        {accountState === 1 && (
          <Transactions>
            <div className="block md:hidden ml-[40px] md:ml-[35svw] border-unveilBlack border-t-2 mr-[15px]">
              <select
                className="select"
                onChange={(e) => handleAccountState(e)}
              >
                <option>Artwork</option>
                <option>Transactions</option>
                <option>Owned NFTs</option>
                <option>Contact details</option>
                <option>Membership</option>
                <option>Referrals</option>
                <option>Recognitions</option>
                <option>Wishlist</option>
                <option>Followed artists</option>
                <option>Logout</option>
              </select>
            </div>
          </Transactions>
        )}
      </section>
    </main>
  );
};

export default AccountPage;
