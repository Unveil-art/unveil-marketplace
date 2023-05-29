import React, { useState, useContext, useEffect } from "react";

import Sidebar from "../../components/section/accout-page/Sidebar";
import Artworks from "../../components/section/accout-page/Artworks";
import Transactions from "../../components/section/accout-page/Transactions";
import Title from "../../components/reusable/Title";
import ContactDetails from "../../components/section/accout-page/ContactDetails";
import Referrals from "../../components/section/accout-page/Referrals";
import OwnedNFTs from "../../components/section/accout-page/OwnedNFTs";
import Recognitions from "../../components/section/accout-page/Recognitions";
import Wishlist from "../../components/section/accout-page/Wishlist";
import Following from "../../components/section/accout-page/Following";

import { Web3Context } from "@/contexts/Web3AuthContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getArtworksMe, getUserMe } from "lib/backend";

const AccountPage = () => {
  const [accountState, setAccountState] = useState(0);
  const { logout } = useContext(Web3Context);
  const { value } = useLocalStorage("token");
  const [user, setUser] = useState();

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const userData = await getUserMe(value);
  //     setUser(userData);
  //   };
  //   if (value) {
  //     fetchUser();
  //   }
  // }, [value]);

  const handleAccountState = (e) => {
    window.scrollTo(0, 0);
    setAccountState(e.target.selectedIndex);
    if (e.target.value === "Logout") {
      logout();
    }
  };

  return (
    <div className="relative flex pb-5 md:pb-[80px]">
      <Sidebar accountState={accountState} setAccountState={setAccountState} />
      <section className="mt-[120px] w-full">
        {accountState === 0 && <Title title="Account" />}
        {accountState === 1 && <Title title="Transaction overview" />}
        {accountState === 2 && <Title title="Owned NFTs" />}
        {accountState === 3 && (
          <Title
            truncate
            title={`${user.firstName ? user.firstName : ""} ${
              user.lastName ? user.lastName : ""
            }${!user.firstName && !user.lastName ? user.email : ""} `}
          />
        )}
        {accountState === 4 && <Title title="Referrals" />}
        {accountState === 5 && <Title title="Recognitions" />}
        {accountState === 6 && <Title title="Wishlist" />}
        {accountState === 7 && <Title title="Following" />}
        <div className="block md:hidden  mt-[80px] ml-[40px] md:ml-[35svw] border-unveilBlack border-t-2 mr-[15px]">
          <select
            className="uppercase select"
            onChange={(e) => handleAccountState(e)}
          >
            <option>Artwork</option>
            <option>Transactions</option>
            <option>Owned NFTs</option>
            <option>Contact details</option>
            <option>Referrals</option>
            <option>Recognitions</option>
            <option>Wishlist</option>
            <option>Followed artists</option>
            <option>Logout</option>
          </select>
        </div>
        {accountState === 0 && <Artworks />}
        {accountState === 1 && <Transactions />}
        {accountState === 2 && <OwnedNFTs />}
        {accountState === 3 && <ContactDetails user={user} />}
        {accountState === 4 && <Referrals />}
        {accountState === 5 && <Recognitions />}
        {accountState === 6 && <Wishlist />}
        {accountState === 7 && <Following />}
      </section>
    </div>
  );
};

export default AccountPage;
