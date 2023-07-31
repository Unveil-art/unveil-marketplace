import React, { useEffect, useState, useContext, useRef } from "react";
import Wishlist from "../../svg/Wishlist";
import OptionsPopIn from "@/components/pop-in/OptionsPopIn";
import EditionPopIn from "@/components/pop-in/EditionPopIn";
import MakeOfferPopIn from "@/components/pop-in/MakeOfferPopin";
import {
  addToWishlist,
  artworkInWishlist,
  getArtistRecognitions,
  getArtistStats,
  getCurrentExchangeRateETHUSD,
  removeFromWishlist,
} from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Loader from "@/components/svg/Loader";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";
import Wallet from "@/components/svg/Wallet";
import Account from "@/components/svg/Account";
import Search from "@/components/svg/Search";
import MasterCardName from "@/components/svg/MasterCardName";
import VisaBlack from "@/components/svg/VisaBlack";
import ApplePay from "@/components/svg/ApplePay";
import GooglePay from "@/components/svg/GooglePay";
import Ideal from "@/components/svg/Ideal";
import MetaMask from "@/components/svg/MetaMask";
import Check2 from "@/components/svg/Check2";
import { StepContext } from "@/contexts/StepContext";
import { useIntersection } from "@/hooks/useIntersection";
import Image from "next/image";
import { useWindowSize } from "@/hooks/useWindowSize";
import Torus from "@/components/svg/Torus";
import Link from "next/link";
import { Freshchat } from "reactjs-freshchat";
import "reactjs-freshchat/dist/index.css";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import CountdownTimer from "@/components/reusable/CountdownTimer";

const GalleryHero = ({ artwork, dominantColor }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [edition, setEdition] = useState(null);
  const [inWishlist, setInWishList] = useState(false);
  const [loading, setLoading] = useState(false);
  const { value: token } = useLocalStorage("token");
  const [recognitions, setRecognitions] = useState([]);
  const [stats, setStats] = useState({});
  const [exchangeRate, setExchangeRate] = useState(1900);
  const [orientation, setOrientation] = useState(false);
  const { width } = useWindowSize();
  const [offerOpen, setOfferOpen] = useState(false);

  // Popin states
  const [collectionOpen, setCollectionOpen] = useState(false);
  const [curatorOpen, setCuratorOpen] = useState(false);
  const [soldAsOpen, setSoldAsOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [royaltyOpen, setRoyaltyOpen] = useState(false);
  const [sizesOpen, setSizedOpen] = useState(false);
  const [addressOpen, setAddressOpen] = useState(false);
  const [recognitionsOpen, setRecognitionsOpen] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  // Handle nav color
  const { setColor } = useContext(StepContext);
  const el = useRef();
  const { isIntersecting } = useIntersection(el, "-200px");

  useEffect(() => {
    if (artwork.edition_type === "NFT_Only")
      if (isIntersecting) {
        setColor(true);
      } else {
        setColor(false);
      }
  }, [isIntersecting]);

  const notifyError = (message) => showTopStickyNotification("error", message);

  const init = async () => {
    try {
      const data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(data.USD);
    } catch (err) {
      console.log(err);
    }
  };

  const getUSD = (eth) => {
    return (eth * exchangeRate).toFixed(2);
  };

  const addWishlist = async () => {
    try {
      setLoading(true);
      if (token && artwork.id) {
        await addToWishlist(token, artwork.id);
        await checkWishlist(token, artwork.id);
      } else {
        notifyError("User Not Logged In");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.data?.message)
        notifyError(err?.response?.data?.message);
    }
  };

  const removeWishlist = async () => {
    try {
      setLoading(true);
      if (token && artwork.id) {
        await removeFromWishlist(token, artwork.id);
        await checkWishlist(token, artwork.id);
      } else {
        notifyError("User Not Logged In");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      if (err?.response?.data?.message)
        notifyError(err?.response?.data?.message);
    }
  };

  const checkWishlist = async (token, artwork_id) => {
    const data = await artworkInWishlist(token, artwork_id);
    setInWishList(data);
  };

  useEffect(() => {
    console.log(artwork);
    init();
  }, []);

  useEffect(() => {
    if (artwork.id && token) {
      checkWishlist(token, artwork.id);
    }
  }, [artwork, token]);

  useEffect(() => {
    const img = document.createElement("img");

    img.onload = function () {
      if (this.width > this.height) {
        setOrientation(true);
      } else if (this.width < this.height) {
        setOrientation(false);
      } else {
        setOrientation(false);
      }
    };

    img.src = artwork.media_url;
  }, [artwork.media_url]);

  // Owner name to string
  let displayName;
  if (artwork.owner.firstName && artwork.owner.lastName) {
    displayName = `${artwork.owner.firstName} ${artwork.owner.lastName}`;
  } else if (artwork.owner.firstName) {
    displayName = artwork.owner.firstName;
  } else if (artwork.owner.lastName) {
    displayName = artwork.owner.lastName;
  } else {
    displayName = artwork.owner.email;
  }

  // Edition type to string
  let displaySoldAs;
  if (artwork.edition_type === "NFT_Only") {
    displaySoldAs = "Digital";
  } else if (artwork.edition_type === "Print_Only") {
    displaySoldAs = "Physical";
  } else {
    displaySoldAs = "Physical / Physical";
  }

  // Royalties to string
  let firstPercentage, afterPercentage;
  artwork.royalties.forEach((item) => {
    if (item.from.includes("First")) {
      firstPercentage = item.percentage;
    }
    if (item.from.includes("After")) {
      afterPercentage = item.percentage;
    }
  });

  let displayRoyalties = "";
  if (firstPercentage && afterPercentage) {
    displayRoyalties = `From ${firstPercentage}% to ${afterPercentage}%`;
  } else if (firstPercentage) {
    displayRoyalties = `From ${firstPercentage}%`;
  } else if (afterPercentage) {
    displayRoyalties = `To ${afterPercentage}%`;
  }

  let arr = artwork.frame[0].split(", ");

  let frameObject = {
    frame: "",
    size: "",
    color: "",
    border: "",
  };
  if (artwork.edition_type !== "NFT_Only") {
    frameObject = {
      frame: arr[0],
      size: arr[1],
      color: arr[2].split(" ")[0],
      border: arr[3].split(" ")[2],
    };
  }

  const getRecognitions = async (artist_id) => {
    const data = await getArtistRecognitions(artist_id);
    setRecognitions(data);
  };
  const getStats = async (artist_id) => {
    const data = await getArtistStats(artist_id);
    setStats(data);
  };

  useEffect(() => {
    if (artwork.owner_id) {
      getRecognitions(artwork.owner_id);
      getStats(artwork.owner_id);
    }
  }, [artwork]);

  const _recognitions = recognitions
    .map(
      ({ description, recognition_type }) =>
        description + " (" + recognition_type + ")"
    )
    .join(", ");
  // Find the lowest price
  const prices = artwork.editions.map((edition) => edition.price);
  const lowestPrice = Math.min(...prices);

  return (
    <>
      {showSupport && (
        <Freshchat
          token="4e15aa79-e9f2-4795-b236-62a30db78e31"
          open={true}
          ic_styles={{
            backgroundColor: "#F9F7F2",
            color: "#000000",
          }}
        />
      )}
      <section className="relative grid grid-cols-1 md:grid-cols-5">
        <div
          ref={el}
          style={{ backgroundColor: dominantColor }}
          className={`h-[65svh] unveilTransition md:h-screen overflow-hidden md:sticky  top-0 flex items-center justify-center md:col-span-3 `}
        >
          <div className={`h-full  aspect-[3/4] mb-1`}>
            <div
              className={`${
                orientation
                  ? " mx-10 md:mx-20 w-[calc(100%-70px)] md:w-[calc(100%-160px)] "
                  : " mx-20 md:mx-32  w-[calc(100%-160px)] md:w-[calc(100%-256px)]"
              } ${width < 768 ? "shadow2" : "shadow1"}
                relative h-full z-20`}
            >
              <Image
                fill={true}
                alt={artwork.name}
                src={artwork.media_url}
                style={{ objectFit: "contain", zIndex: 20 }}
              />
            </div>
          </div>
          {/* <div
              className={`shadow1 relative h-full mx-auto bg-unveilWhite w-fit
            ${frameObject.size === "2mm" ? "border-[3px]" : ""}
            ${frameObject.size === "3mm" ? "border-[4px]" : ""}
            ${frameObject.size === "5mm" ? "border-[5px]" : ""}
            ${frameObject.colour === "Black" ? "border-unveilBlack" : ""}
            ${frameObject.colour === "Wood" ? "border-[#D8B589]" : ""}
            ${frameObject.colour === "White" ? "border-unveilCreme" : ""}
            ${frameObject.border === "None" ? "p-0" : ""}
            ${frameObject.border === "5x10" ? "p-2" : ""}
            ${frameObject.border === "10x20" ? "p-4" : ""}`}
            >
              <img
                fill={true}
                style={{ objectFit: "cover" }}
                src={artwork.media_url}
                alt={artwork.name}
              />
            </div> */}
        </div>
        <div className="md:col-span-2 ">
          <div className="md:mb-[100px] my-10 md:mt-[180px] text-center px-[15px] md:pl-10 md:pr-5">
            {/* <p className="pb-5 l2 md:pb-0">{displayName}</p> */}
            {artwork.edition_type && (
              <>
                {artwork.edition_type === "NFT_Backed_by_print" && (
                  <span className="nft-print">nft + print</span>
                )}
                {artwork.edition_type === "NFT_Only" && (
                  <span className="nft">nft</span>
                )}
                {artwork.edition_type === "Print_Only" && (
                  <span className="print">print</span>
                )}
              </>
            )}
            <h1 className="h3 mt-5 mb-3">{artwork.name}</h1>
            <p className="hidden md:block">
              From ${parseFloat(getUSD(lowestPrice)).toFixed()} (
              {lowestPrice.toFixed(2)} ETH)
            </p>
            <div className="pt-10 md:pt-[100px]">
              <div className="pb-10 md:pb-16">
                <Link href={`/people/${artwork.owner.id}`}>
                  <div
                    className="flex items-center mb-4"
                    data-cursor="View artist"
                    data-cursor-color="#b2b4ae"
                  >
                    {artwork.owner.profileUrl && (
                      <div className="mr-3.5 w-10 h-10 rounded-full overflow-hidden relative">
                        <Image
                          src={artwork.owner.profileUrl}
                          alt={displayName}
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    )}
                    <div className="text-left">
                      <h2 className="b5">Artist</h2>
                      <h2 className="b4 font-medium">{displayName}</h2>
                    </div>
                  </div>
                </Link>
                <div className="">
                  <ul className="l1">
                    {recognitions.length > 0 && (
                      <li className="flex items-center mb-1 last:mb-0">
                        <span className="mr-2 inline-block">
                          <Check2 />
                        </span>
                        <span>
                          {displayName} has over {recognitions.length}{" "}
                          recognitions
                        </span>
                      </li>
                    )}
                    {stats?.sales > 0 && (
                      <li className="flex items-center mb-1 last:mb-0">
                        <span className="mr-2 inline-block">
                          <Check2 />
                        </span>
                        <span>
                          Has made {stats.sales} sales by {stats.collectors}{" "}
                          collectors
                        </span>
                      </li>
                    )}
                    <li className="flex items-center mb-1 last:mb-0">
                      <span className="mr-2 inline-block">
                        <Check2 />
                      </span>
                      <span>2 reviews by experts</span>
                      {/* Hardcoded */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative flex justify-between gap-5">
                <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
                  <div className="rounded-[10px] unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] ">
                    <p className="b5 leading-[23px]">Collection</p>
                    <p className="truncate b3 !text-[13px] leading-normal  md:b4">
                      {artwork.collection.title}
                    </p>
                  </div>
                  <div className="rounded-[10px] unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] ">
                    <p className="b5 leading-[23px]">Editions</p>
                    <p className="truncate b3 !text-[13px] leading-normal  md:b4">
                      55 ediions claimed
                      {/* Hardcoded */}
                    </p>
                  </div>
                  {artwork.collection.curator_id && (
                    <div
                      onClick={() => setCuratorOpen((prev) => !prev)}
                      className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                    >
                      <p className="b5 leading-[23px]">Curator</p>
                      <p className="truncate b3 !text-[13px] leading-normal md:b4">
                        {artwork.collection.curator_id}
                      </p>
                    </div>
                  )}

                  <div
                    onClick={() => setSoldAsOpen((prev) => !prev)}
                    className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                  >
                    <p className="b5 leading-[23px]">Sold as</p>
                    <p className="truncate b3 !text-[13px] leading-normal md:b4">
                      {displaySoldAs}
                    </p>
                  </div>
                  {/* <div
                  onClick={() => setPaymentOpen(true)}
                  className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                >
                  <p className="b5 leading-[23px]">Payment</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4">
                    ETH, Credit/Debit Card
                  </p>
                </div> */}
                  {artwork.edition_type !== "NFT_Only" && (
                    <div
                      onClick={() => setSizedOpen((prev) => !prev)}
                      className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                    >
                      <p className="b5 leading-[23px]">Available sizes</p>
                      <p className="truncate b3 !text-[13px] leading-normal md:b4">
                        {artwork.size.map((item, i) => (
                          <span key={i}>
                            {item}
                            {i < artwork.size.length - 1 && <>, </>}
                          </span>
                        ))}
                      </p>
                    </div>
                  )}

                  <div
                    onClick={() => setRoyaltyOpen((prev) => !prev)}
                    className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                  >
                    <p className="b5 leading-[23px]">Creator royalty</p>
                    <p className="truncate b3 !text-[13px] leading-normal md:b4">
                      {artwork.royalties[0]?.percentage}%
                      {artwork.royalties[1]?.percentage ? ", " : ""}{" "}
                      {artwork.royalties[1]?.percentage
                        ? artwork.royalties[1]?.percentage
                        : ""}
                      {artwork.royalties[1]?.percentage ? "%" : ""}
                    </p>
                  </div>
                  <div
                    onClick={() => setAddressOpen((prev) => !prev)}
                    className="rounded-[10px] cursor-pointer hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px]"
                  >
                    <p className="b5 leading-[23px]">
                      Creator & royalty address
                    </p>
                    <p className="truncate b3 !text-[13px] leading-normal md:b4 w-[100px]">
                      {artwork.owner.walletAddress.slice(0, 4).toLowerCase()}...
                      {artwork.owner.walletAddress.slice(-4).toLowerCase()}
                    </p>
                  </div>
                  {_recognitions && (
                    <div className="rounded-[10px]  unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] ">
                      <p className="b5 leading-[23px]">Recognitions</p>
                      <p className="truncate b3 !text-[13px] leading-normal md:b4">
                        {_recognitions}
                      </p>
                    </div>
                  )}

                  <button
                    disabled={loading}
                    onClick={() => {
                      if (inWishlist) {
                        removeWishlist();
                      } else {
                        addWishlist();
                      }
                    }}
                    className={`rounded-[10px]  unveilTransition hover:bg-bgColor col-span-2 md:justify-start justify-center items-center flex gap-2 h-[56px] md:h-[68px] border border-unveilBlack md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer`}
                  >
                    {loading ? (
                      <div className="animate-spin">
                        <Loader color="#141414" />
                      </div>
                    ) : (
                      <Wishlist fill={inWishlist ? "#F66666" : "#141414"} />
                    )}
                    <p className="b4">
                      {inWishlist ? "Added" : "Add"} to wishlist
                    </p>
                  </button>

                  <div className="flex flex-col justify-start p-4 md:p-5 items-start col-span-2 unveilTransition w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] !mt-5 md:!mt-9 bg-[#1511000D] rounded-lg">
                    <p className="mb-8 md:mb-6">Buyer Guarantee</p>

                    <div className="flex flex-col items-start justify-center w-full mb-5 md:mb-6">
                      <div className="flex items-center justify-center space-x-3">
                        {/* icon */}
                        <Wallet width={14} height={14} />
                        <p className="l1">Secure payments</p>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        {/* icon */}
                        <Account width={14} height={14} />
                        <p className="l1">All artists are verified by Unveil</p>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        {/* icon */}
                        <Search width={14} height={14} />
                        <p className="l1">Artwork history is always visible</p>
                      </div>
                    </div>

                    {/* button divs */}
                    <div className="flex flex-col space-y-1.5 md:space-y-2.5 w-full justify-center items-center">
                      <Link
                        href="https://learn.unveil.art"
                        target="_blank"
                        className="btn btn-secondary btn-full !py-3 md:!py-2"
                      >
                        Learn more
                      </Link>
                      <button
                        onClick={() => {
                          setShowSupport(true);
                        }}
                        className="flex justify-center items-center btn btn-secondary btn-full !py-3 md:!py-2 gap-x-1"
                      >
                        Chat with us{" "}
                        <div className="w-2 h-2 bg-[#83D61A] rounded-full" />
                      </button>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentOpen(true)}
                    className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                  >
                    <p className="b5 leading-[23px]">
                      Accepted Payments Methods
                    </p>

                    <div className="flex justify-start items-center w-full space-x-2.5 grayscale">
                      <MasterCardName />
                      <VisaBlack />
                      <ApplePay />
                      <GooglePay />
                      <Ideal />
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentOpen(true)}
                    className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer"
                  >
                    <p className="b5 leading-[23px]">Approved wallets</p>

                    <div className="flex justify-start items-center w-full space-x-2.5 grayscale">
                      <MetaMask />
                      <Torus />
                    </div>
                  </div>
                </div>
                <div
                  className={`md:block hidden group hover:scale-105 unveilTransition w-[160px] border bg-unveilWhite border-bgColorHover rounded-[10px] overflow-hidden fixed bottom-5 right-5 z-20 h-fit ${
                    optionsOpen ? "translate-x-[200%]" : ""
                  }`}
                >
                  {artwork?.collection.live_time && (
                    <div className="absolute top-2 h5 left-1/2 transform -translate-x-1/2">
                      <CountdownTimer
                        targetDate={new Date(artwork?.collection.live_time)}
                      />
                    </div>
                  )}
                  <div className="aspect-[2/3] flex justify-center items-center m-[35px] relative">
                    <img
                      className="object-contain shadow2 group-hover:scale-90 unveilTransition"
                      src={artwork.media_url}
                      alt={artwork.name}
                    />
                  </div>
                  <div
                    onClick={() => setOptionsOpen(!optionsOpen)}
                    className="py-3 uppercase cursor-pointer  bg-unveilBlack text-unveilWhite l1 tracking-[0.18rem]"
                  >
                    Select edition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setOptionsOpen(!optionsOpen)}
          className="fixed bottom-0 left-0 z-20 flex w-full bg-unveilBlack md:hidden"
        >
          <div className="w-8 aspect-[3/4] flex justify-center items-center m-1">
            <img
              className="object-cover shadow2"
              src={artwork.media_url}
              alt={artwork.name}
            />
          </div>
          <p className="text-unveilWhite  py-[15px] text-center w-full pr-10 l1 uppercase tracking-[0.18rem] ">
            Select edition
          </p>
        </div>
      </section>
      <OptionsPopIn
        setEdition={setEdition}
        edition={edition}
        artwork={artwork}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        dominantColor={dominantColor}
        setOfferOpen={setOfferOpen}
      />
      {offerOpen && (
        <MakeOfferPopIn
          edition={edition}
          setEdition={setEdition}
          offerOpen={offerOpen}
          setOfferOpen={setOfferOpen}
        />
      )}

      {!offerOpen && (
        <EditionPopIn
          edition={edition}
          setEdition={setEdition}
          dominantColor={dominantColor}
        />
      )}

      {/* About pop-ins */}
      <MoreInfoPopIn
        open={collectionOpen}
        setOpen={setCollectionOpen}
        title={artwork.collection.title}
        subtitle="Collection"
        text="Text"
      />
      <MoreInfoPopIn
        open={curatorOpen}
        setOpen={setCuratorOpen}
        title={artwork.collection.curator_id}
        subtitle="Curator"
        text="Text"
      />
      <MoreInfoPopIn
        open={soldAsOpen}
        setOpen={setSoldAsOpen}
        title={displaySoldAs}
        subtitle="Sold As"
        text="This art piece is part is available as NFT only which means it’s only available as print."
      />
      <MoreInfoPopIn
        open={paymentOpen}
        setOpen={setPaymentOpen}
        title=" "
        subtitle="Accepted Payments Methods"
        payment
        smallText
        text="At Unveil, we strive to provide a seamless and secure payment experience for our users. In addition to accepting Ethereum (ETH) for NFT purchases, we also offer traditional payment methods such as iDeal and credit cards. We understand that not everyone may be familiar with cryptocurrency transactions, so by accepting these traditional payment methods, we aim to simplify the process and ensure a convenient and secure transaction for all. "
      />
      <MoreInfoPopIn
        open={royaltyOpen}
        setOpen={setRoyaltyOpen}
        subtitle="Curator royalty"
        smallText
        text="In the world of NFTs, royalties are a way for artists to earn a percentage of the sales each time their artwork is resold to a new collector. Unlike traditional art sales, where artists typically only benefit from the initial sale, NFTs allow artists to continue receiving compensation as their work increases in value over time. This unique feature ensures ongoing recognition and rewards for artists as their creations become more popular in the digital art market. At Unveil, we go a step further by giving artists the option to set two different royalty percentages, discouraging immediate resale and fostering a more meaningful relationship between artists and collectors. This approach promotes a fair and sustainable ecosystem that values the contributions of artists and supports their creative journey."
        title={`${artwork.royalties[0]?.percentage}%${
          artwork.royalties[1]?.percentage ? " | " : ""
        } ${
          artwork.royalties[1]?.percentage
            ? artwork.royalties[1]?.percentage
            : ""
        }${artwork.royalties[1]?.percentage ? "%" : ""} `}
      />
      <MoreInfoPopIn
        open={addressOpen}
        setOpen={setAddressOpen}
        title={`${artwork.owner.walletAddress
          .slice(0, 4)
          .toLowerCase()}... ${artwork.owner.walletAddress
          .slice(-4)
          .toLowerCase()}`}
        subtitle="Creator & royalty address"
        text={`${artwork.owner.walletAddress} is the address which is the address of the collection`}
      />

      <MoreInfoPopIn
        open={recognitionsOpen}
        setOpen={setRecognitionsOpen}
        title={_recognitions}
        subtitle="Recognitions"
        text="Text"
      />
    </>
  );
};

export default GalleryHero;
