import React, { useState, useContext, useEffect } from "react";

import Sidebar from "../../components/section/accout-page/Sidebar";
import Artworks from "../../components/section/accout-page/Artworks";
import Transactions from "../../components/section/accout-page/Transactions";
import Title from "../../components/reusable/Title";
import ContactDetails from "../../components/section/accout-page/ContactDetails";
import Referrals from "../../components/section/accout-page/Referrals";
import OwnedNFTs from "../../components/section/accout-page/OwnedNFTs";
import Offers from "@/components/section/accout-page/Offers";
import Recognitions from "../../components/section/accout-page/Recognitions";
import Wishlist from "../../components/section/accout-page/Wishlist";
import Following from "../../components/section/accout-page/Following";

import { Web3Context } from "@/contexts/Web3AuthContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import { getArtworksMe, getUserMe } from "lib/backend";
import { useRouter } from "next/router";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";
import PrintRequests from "@/components/section/accout-page/PrintRequests";

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
    }
    if ("contact-details" in router.query) {
      setAccountState(3);
    }
    if (user) {
      if (user?.role === "artist" && "wishlist" in router.query) {
        setAccountState(0);
      } else if (
        user?.role === "artist" &&
        !"wishlist" in router.query &&
        !"contact-details" in router.query
      ) {
        setAccountState(6);
      } else if (user?.role === "artist" && "contact-details" in router.query) {
        setAccountState(3);
      }

      if (user?.role !== "artist" && "wishlist" in router.query) {
        setAccountState(2);
      } else if (
        user?.role !== "artist" &&
        !"wishlist" in router.query &&
        !"contact-details" in router.query
      ) {
        setAccountState(6);
      } else if (user?.role !== "artist" && "contact-details" in router.query) {
        setAccountState(3);
      }
    }
  }, [router.query]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserMe(value);
      if(userData.role!=='artist'){
        setAccountState(2);
      }
      setUser(userData);
    };
    if (value) {
      fetchUser();
    }
    const token = localStorage.getItem("token");
    if (!token) router.push("/");
  }, [value]);

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
          {accountState === 8 && <Title title="Offers" />}
          {accountState === 9 && <Title title="Print Requests" />}
          <div className="block md:hidden  mt-[80px] ml-[40px] md:ml-[35vw] border-unveilBlack border-t-2 mr-[15px]">
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
              <option>Offers</option>
              <option>Print Requests</option>
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
          {user.role === "artist" && accountState === 8 && <Offers />}
          {user.role === "artist" && accountState === 9 && (
            <PrintRequests user={user} />
          )}
        </section>
      </div>
    );
  }
  if (!user) {
    return <section className="w-full h-screen"></section>;
  }
};

export default AccountPage;
