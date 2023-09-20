import React, { useEffect, useState, useRef } from "react";
import Chat from "@/components/reusable/Chat";
import Link from "next/link";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";
import { useLenis } from "@studio-freight/react-lenis";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap } from "gsap";

const ItemStatistics = ({ artwork }) => {
  const [dimension, setDimension] = useState("1920 X 1080");

  //Pop-in states
  const [totalVolume, setTotalVolume] = useState(false);
  const [lastPrice, setLastPrice] = useState(false);
  const [lastVolume, setLastVolume] = useState(false);
  const [highest, setHighest] = useState(false);
  const [unique, setUnique] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [increase, setIncrease] = useState(false);
  const [distribution, setDistribution] = useState(false);
  const [editions, setEditions] = useState(false);

  const [dimensionOpen, setDimensionOpen] = useState(false);
  const [fileSize, setFileSize] = useState(false);
  const [blockchain, setBlockchain] = useState(false);
  const [token, setToken] = useState(false);
  const [address, setAddress] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const art = useRef(null);
  const artContainer = useRef(null);
  const query = gsap.utils.selector(artContainer);

  useEffect(() => {
    const getImageDimension = (url) => {
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        setDimension(parseInt(img.width) + " X " + parseInt(img.height));
      };
    };
    if (artwork.media_url) {
      getImageDimension(artwork.media_url);
    }
  }, [artwork]);

  const editions_left = artwork?.editions?.reduce(
    (acc, emm) => acc + (emm.max_copies - emm.sold_copies),
    0
  );
  let isAnimationDone = true;

  useLenis(({ scroll }) => {
    const cover = query(".gsap-cover");
    let offsetBottom;

    if (cover.length) {
      if (art.current && artContainer.current) {
        const artRect = art.current.getBoundingClientRect();
        const artContainerRect = artContainer.current.getBoundingClientRect();
        const artBottom = artRect.bottom - artContainerRect.top;
        const artContainerBottom =
          artContainerRect.bottom - artContainerRect.top;

        if (isDesktop) {
          offsetBottom = 160;
        } else {
          offsetBottom = 152;
        }

        if (artBottom + offsetBottom === artContainerBottom) {
          if (!isAnimationDone) {
            gsap.fromTo(
              cover,
              {
                xPercent: 200,
                z: 10,
              },
              {
                duration: 0.3,
                xPercent: 0,
                z: 0,
              }
            );
          }
          isAnimationDone = true;
        } else {
          if (isAnimationDone) {
            gsap.to(cover, {
              duration: 0.5,
              xPercent: 200,
              z: 10,
            });
          }
          isAnimationDone = false;
        }
      }
    }
  }, []);

  return (
    <div className="relative grid grid-cols-1 mx-0 mt-10 md:grid-cols-6 gap-y-10 md:mx-10 md:mt-[100px] pb-[80px] md:pb-[160px]">
      <div
        className="relative md:col-span-3 bg-bgColor min-h-[1420px] pt-[120px] md:pb-[160px] pb-[152px] md:block w-full"
        ref={artContainer}
      >
        <div
          className={`mx-auto max-w-[204px] md:max-w-[265px] sticky top-[120px] ${
            artwork.edition_type !== "NFT_Only" ? "frame-2" : ""
          }`}
        >
          <div
            className="flex items-center h-full justify-center p-2.5"
            ref={art}
          >
            <img
              className="object-contain mx-auto shadow2"
              src={artwork.media_url}
              alt={artwork.name}
            />
          </div>
        </div>
        {artwork.edition_type !== "NFT_Only" && (
          <div>
            <div className="absolute bottom-[120px] z-[-1] left-[49.9%] transform -translate-x-1/2 max-w-[266px] md:max-w-[344px] w-full">
              <img
                src="/images/frame-foam.jpg"
                alt="frame foam"
                className="frame-brown"
              />
            </div>
            <div className="absolute bottom-[120px] z-[1] left-[49.9%] transform -translate-x-1/2 w-full overflow-hidden">
              <div className="w-full h-full gsap-cover max-w-[266px] md:max-w-[344px] mx-auto">
                <img src="/images/frame-cover.jpg" alt="frame cover" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:col-span-3">
        <div className="md:mb-[100px] px-[15px] md:pl-10 md:pr-5">
          <p className="s1 md:pb-0">Pricing statistics</p>
          <div className="w-[180px] mt-5 md:hidden block">
            <p className="leading-[16px] md:leading-[25px] b4">
              <strong className="font-[500]">About pricing</strong>
              <br />
              We believe transparency creates wealth we gain trust by our
              collectors by being transparent.
            </p>
          </div>

          <div className="relative pt-5 md:pt-[80px] flex justify-between gap-5">
            <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
              <div
                onClick={() => setTotalVolume((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack  border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="truncate b5">
                  Total selling volume market volume
                </p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $0.00
                </p>
              </div>
              <div
                onClick={() => setLastPrice((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Last purchase price</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $0.00
                </p>
              </div>
              <div
                onClick={() => setLastVolume((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Volume last 30 days</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $0.00
                </p>
              </div>
              <div
                onClick={() => setHighest((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Highest non-accepted bid</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $0.00
                </p>
              </div>
              <div
                onClick={() => setUnique((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Unique collectors</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0
                </p>
              </div>
              <div
                onClick={() => setClaimed((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Claimed physical artworks</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0%
                </p>
              </div>
              <div
                onClick={() => setIncrease((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">
                  Price increase since first sale
                </p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0%
                </p>
              </div>
              <div
                onClick={() => setDistribution((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Distribution Primary Sale</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0% artist, 0% curator
                </p>
              </div>
              <div
                onClick={() => setEditions((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5 leading-[23px]">Editions left</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  {editions_left}
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack col-span-2 md:col-span-1 flex overflow-hidden bg-bgColor text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <Chat
                  chatBtn={true}
                  title="Get advice"
                  text="Our art advisor is just one click away"
                />
              </div>
            </div>

            <div className="absolute bottom-0 right-0 w-[130px] md:block hidden">
              <p className="b4">
                <strong className="font-[500]">Provenance</strong>
                <br />
                We deeply value transparency and provenance, ensuring every
                piece of art has a clear and traceable history, fostering trust
                in our platform.
              </p>
            </div>
          </div>

          <p className="pb-5 s1 md:pb-0 mt-[100px]">Specifications</p>
          <div className="w-[180px] md:hidden block">
            <p className="b4">
              <strong className="font-[500]">About pricing</strong>
              <br />
              We believe transparency creates wealth we gain trust by our
              collectors by being transparent.
            </p>
          </div>
          <div className="relative pt-5 md:pt-[80px] flex justify-between gap-5">
            <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
              {artwork.edition_type !== "NFT_Only" && (
                <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                  <p className="b5">Print material (PAB)</p>
                  <p className="truncate b4">
                    {artwork.technique.map((item, i) => (
                      <span key={i}>
                        {item}
                        {i < artwork.technique.length - 1 && <>, </>}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              <div
                onClick={() => setDimensionOpen((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5">Dimensions (DAB)</p>
                <p className="truncate b4">{dimension}</p>
              </div>
              <div
                onClick={() => setFileSize((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5">File size</p>
                <p className="truncate b4">0MB</p>
              </div>
              <div
                onClick={() => setBlockchain((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5">Blockchain</p>
                <p className="truncate b4">Ethereum</p>
              </div>
              <div
                onClick={() => setToken((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5">Token standard</p>
                <p className="truncate b4">ERC721</p>
              </div>
              <div
                onClick={() => setAddress((prev) => !prev)}
                className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer"
              >
                <p className="b5">Collection address</p>
                <p className="truncate w-[100px] b4">
                  {artwork?.contract_address?.slice(0, 4)}...
                  {artwork?.contract_address?.slice(-4)}
                </p>
              </div>
              <Link
                href={`https://etherscan.io/address/${artwork?.contract_address}`}
                target="_blank"
              >
                <button className="btn md:mt-3 md:h-fit h-full btn-secondary w-full md:col-span-1 col-span-2 md:w-[250px] lg:w-[290px] 2xl:w-[320px]">
                  View on Etherscan
                </button>
              </Link>
            </div>
            <div className="absolute hidden md:block bottom-0 right-0 w-[130px]">
              <p className="b4">
                <strong className="font-[500]">Provenance</strong>
                <br />
                We deeply value transparency and provenance, ensuring every
                piece of art has a clear and traceable history, fostering trust
                in our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MoreInfoPopIn
        open={totalVolume}
        setOpen={setTotalVolume}
        text="This is the total value volume of sales for this artpiece."
        title="$0"
        subtitle="Total selling volume"
      />

      {/* lastPrice pop-in */}
      <MoreInfoPopIn
        open={lastPrice}
        setOpen={setLastPrice}
        text="This is the last price someone paid for this artpiece,"
        title="$0"
        subtitle="Last purchase price"
      />

      {/* lastVolume pop-in */}
      <MoreInfoPopIn
        open={lastVolume}
        setOpen={setLastVolume}
        text="In the last 30 days this is the volume of sales for this artpiece."
        title="$0"
        subtitle="Volume last 30 days"
      />

      {/* highest pop-in */}
      <MoreInfoPopIn
        open={highest}
        setOpen={setHighest}
        text="This is the highest non-accepted bid on this art piece."
        title="$0"
        subtitle="Highest non-accepted bid"
      />

      {/* unique pop-in */}
      <MoreInfoPopIn
        open={unique}
        setOpen={setUnique}
        text="This is the amount of unique collectors owning this art piece."
        title="0"
        subtitle="Unique collectors"
      />

      {/* claimed pop-in */}
      <MoreInfoPopIn
        open={claimed}
        setOpen={setClaimed}
        text="0% of the NFTs have been printed of this artwork."
        title="0%"
        subtitle="Claimed physical artworks"
      />

      {/* increase pop-in */}
      <MoreInfoPopIn
        open={increase}
        setOpen={setIncrease}
        text="Over time, the price has rose 0% of the initial selling price."
        title="0%"
        subtitle="Price increase since first sale"
      />

      {/* distribution pop-in */}
      <MoreInfoPopIn
        open={distribution}
        setOpen={setDistribution}
        text="82.5% of the selling price will go to the artist and 5% to the curator"
        title="0% artist, 0% curator"
        subtitle="Distribution Primary Sale"
      />

      {/* editions pop-in */}
      <MoreInfoPopIn
        open={editions}
        setOpen={setEditions}
        text={`${editions_left} editions of the total of ${artwork.editions.length} editions are still available directly from the artist.`}
        title={editions_left}
        subtitle="Editions left on primary market"
      />

      {/* dimensionOpen pop-in */}
      <MoreInfoPopIn
        open={dimensionOpen}
        setOpen={setDimensionOpen}
        text={`The dimension of the artpiece uploaded is ${dimension} pixels`}
        title={dimension}
        subtitle="Dimensions"
      />

      {/* fileSize pop-in */}
      <MoreInfoPopIn
        open={fileSize}
        setOpen={setFileSize}
        text="The size of the artwork is 0MB."
        title="0MB"
        subtitle="File size"
      />

      {/* blockchain pop-in */}
      <MoreInfoPopIn
        open={blockchain}
        setOpen={setBlockchain}
        text="This is the blockchain of our smart contract."
        title="Ethereum"
        subtitle="Blockchain"
      />

      {/* token pop-in */}
      <MoreInfoPopIn
        open={token}
        setOpen={setToken}
        text="This is the token standard of our smart contract."
        title="ERC-721"
        subtitle="Token standard"
      />

      {/* address pop-in */}
      <MoreInfoPopIn
        open={address}
        setOpen={setAddress}
        text={`${artwork?.contract_address} is the address which is the address of the collection`}
        title={` ${artwork?.contract_address?.slice(
          0,
          4
        )}...${artwork?.contract_address?.slice(-4)}`}
        subtitle="Collection address"
      />
    </div>
  );
};

export default ItemStatistics;
