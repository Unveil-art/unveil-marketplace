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
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const AccountPage = () => {
  const [accountState, setAccountState] = useState(0);
  const { logout } = useContext(Web3Context);
  const { value } = useLocalStorage("token");
  const [user, setUser] = useState();
  const { authenticated } = useIsAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if ("wishlist" in router.query) {
      setAccountState(6);
    } else {
      setAccountState(6);
    }
  }, [router.query]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserMe(value);
      setUser(userData);
    };
    if (value) {
      fetchUser();
    }
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [value]);

  useEffect(() => {
    if (user) {
      if (user.role === "artist") {
        setAccountState(0);
      }
      if (user.role !== "artist") {
        setAccountState(2);
      }
    }
  }, [user]);

  const handleAccountState = (e) => {
    window.scrollTo(0, 0);
    setAccountState(e.target.selectedIndex);
    if (e.target.value === "Logout") {
      logout();
    }
  };

  if (user) {
    return (
      <div className="relative flex pb-5 md:pb-[80px]">
        <ToastContainer />
        <div id="top-sticky-notification-container" />
        <Sidebar
          user={user}
          accountState={accountState}
          setAccountState={setAccountState}
        />
        <section className="mt-[120px] w-full">
          {user.role === "artist" && accountState === 0 && (
            <Title title="Account" />
          )}
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
          {user.role === "artist" && accountState === 4 && (
            <Title title="Referrals" />
          )}
          {user.role === "artist" && accountState === 5 && (
            <Title title="Recognitions" />
          )}
          {accountState === 6 && <Title title="Wishlist" />}
          {accountState === 7 && <Title title="Following" />}
          <div className="block md:hidden  mt-[80px] ml-[40px] md:ml-[35svw] border-unveilBlack border-t-2 mr-[15px]">
            <select
              className="uppercase select"
              onChange={(e) => handleAccountState(e)}
            >
              {user.role === "artist" && <option>Artwork</option>}

              <option>Transactions</option>
              <option>Owned NFTs</option>
              <option>Contact details</option>
              {user.role === "artist" && (
                <>
                  <option>Referrals</option>
                  <option>Recognitions</option>
                </>
              )}
              <option>Wishlist</option>
              <option>Following</option>
              <option>Logout</option>
            </select>
          </div>
          {user.role === "artist" && accountState === 0 && <Artworks />}
          {accountState === 1 && <Transactions />}
          {accountState === 2 && <OwnedNFTs />}
          {accountState === 3 && <ContactDetails user={user} />}
          {user.role === "artist" && accountState === 4 && <Referrals />}
          {user.role === "artist" && accountState === 5 && <Recognitions />}
          {accountState === 6 && <Wishlist />}
          {accountState === 7 && <Following />}
        </section>
      </div>
    );
  }
  if (!user) {
    return <section className="w-full h-screen"></section>;
  }
};

export default AccountPage;
