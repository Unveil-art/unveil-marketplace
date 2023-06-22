import React, { useEffect, useState } from "react";
import Wishlist from "../../svg/Wishlist";
import OptionsPopIn from "@/components/pop-in/OptionsPopIn";
import Link from "next/link";
import Image from "next/image";
import EditionPopIn from "@/components/pop-in/EditionPopIn";
import { getArtistRecognitions, getCurrentExchangeRateETHUSD } from "lib/backend";

const GalleryHero = ({ artwork }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [editionOpen, setEditionOpen] = useState(false);
  const [edition, setEdition] = useState(null);
  const [recognitions, setRecognitions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1900);

  const init = async() => {
    try{
      const data = await getCurrentExchangeRateETHUSD();
    setExchangeRate(data.USD);
    }catch(err){
      console.log(err)
    }
  }

  const getUSD = (eth) => {
    return (eth*exchangeRate).toFixed(2)
  }

  useEffect(() => {
    init();
  },[])

  console.log(artwork);

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

  const getRecognitions = async(artist_id)  => {
    const data = await getArtistRecognitions(artist_id);
    setRecognitions(data);
  }
  useEffect(() => {
    if(artwork.owner_id){
      getRecognitions(artwork.owner_id)
    }
  },[artwork]);

  const _recognitions = recognitions.map(({description, recognition_type}) => description+" ("+recognition_type+")").join(", ")
  // Find the lowest price
  const prices = artwork.editions.map((edition) => edition.price);
  const lowestPrice = Math.min(...prices);

  return (
    <>
      <section className="relative grid grid-cols-1 md:grid-cols-5">
        <div className="h-[50svh] md:h-screen md:sticky  top-0 flex items-center justify-center md:col-span-3 bg-bgColor py-[120px]">
          <div className="relative md:px-[20vw] md:w-full w-[40%] md:h-[80%] ">
            <div
              className={`shadow1 mx-auto bg-unveilWhite w-fit
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
                className="object-contain h-full"
                src={artwork.media_url}
                alt={artwork.name}
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-2 ">
          <div className="md:mb-[100px] my-10 md:mt-[180px] md:space-y-10 text-center px-[15px] md:pl-10 md:pr-5">
            <p className="pb-5 l2 md:pb-0">{displayName}</p>
            <h1>{artwork.name}</h1>
            <p className="hidden md:block">From ${getUSD(lowestPrice)}</p>
            <div className="relative pt-10 md:pt-[100px] flex justify-between gap-5">
              <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
                <Link href={`/gallery/collection/${artwork.collection_id}`}>
                  <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                    <p className="b5 leading-[23px]">Collection</p>
                    <p className="truncate b3 !text-[13px] leading-normal  md:b4">
                      {artwork.collection.title}
                    </p>
                  </div>
                </Link>
                {artwork.collection.curator_id && (
                  <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                    <p className="b5 leading-[23px]">Curator</p>
                    <p className="truncate b3 !text-[13px] leading-normal md:b4">
                      {artwork.collection.curator_id}
                    </p>
                  </div>
                )}

                <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5 leading-[23px]">Sold as</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4">
                    {displaySoldAs}
                  </p>
                </div>
                <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5 leading-[23px]">Payment</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4">
                    ETH, Credit/Debit Card
                  </p>
                </div>
                {artwork.edition_type !== "NFT_Only" && (
                  <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
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

                <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5 leading-[23px]">Creator royalty</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4">
                    {artwork.royalties[0]?.percentage}%, {artwork.royalties[1]?.percentage}%
                  </p>
                </div>
                <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5 leading-[23px]">Creator & royalty address</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4 w-[100px]">
                    {artwork.owner.walletAddress.slice(0,4).toLowerCase()}...{artwork.owner.walletAddress.slice(-4).toLowerCase()}
                  </p>
                </div>
                <div className="rounded-[10px] hover:border-unveilBlack unveilTransition border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <p className="b5 leading-[23px]">Recognitions</p>
                  <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  {_recognitions}
                  </p>
                </div>
                <div className="rounded-[10px] hover:bg-bgColor unveilTransition col-span-2 md:justify-start justify-center items-center flex gap-2 h-[38px] md:h-[68px] border border-unveilBlack md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[220px] lg:w-[250px] 2xl:w-[280px] cursor-pointer">
                  <Wishlist />
                  <p className="b4">Add to wishlist</p>
                </div>
              </div>
              <div
                className={`md:block hidden group hover:scale-105 unveilTransition w-[180px] border bg-unveilWhite border-bgColorHover rounded-[10px] overflow-hidden fixed bottom-10 right-10 z-20 h-fit ${
                  optionsOpen ? "translate-x-[200%]" : ""
                }`}
              >
                <div className="aspect-[2/3] flex justify-center items-center m-[35px] relative ">
                  <img
                    className="object-contain shadow2 group-hover:scale-90 unveilTransition"
                    src={artwork.media_url}
                    alt={artwork.name}
                  />
                </div>
                <div
                  onClick={() => setOptionsOpen(!optionsOpen)}
                  className="py-2  uppercase cursor-pointer bg-unveilBlack text-unveilWhite l1 tracking-[0.18rem]"
                >
                  View options
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="md:hidden relative flex items-center justify-center md:col-span-3 bg-bgColor py-[120px]">
          <div className="w-[200px] aspect-[3/4] shadow"></div>
          <div className="absolute rounded-[10px] bg-blur bottom-5 w-[200px] md:py-[8px] px-[12px] py-[6px] md:px-[16px] left-[15px] bg-blur">
            <p className="b4 text-unveilWhite">Unveil AR</p>
            <p className="b5 text-unveilWhite">View in Room</p>
          </div>
        </div> */}

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
          <p className="text-unveilWhite  py-[15px] text-center w-full l1 uppercase tracking-[0.18rem] ">
            View options
          </p>
        </div>
      </section>
      <OptionsPopIn
        setEdition={setEdition}
        edition={edition}
        artwork={artwork}
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
      />
      <EditionPopIn edition={edition} setEdition={setEdition} />
    </>
  );
};

export default GalleryHero;
