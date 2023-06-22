import React from "react";
import Image from "next/image";
import Chat from "@/components/reusable/Chat";
import Link from "next/link";

const ItemStatistics = ({ artwork }) => {

  const editions_left = artwork?.editions?.reduce((acc,emm) => acc+(emm.max_copies-emm.sold_copies),0);
  return (
    <div className="relative grid grid-cols-1 mx-0 mt-10 md:grid-cols-5 md:mx-10 md:mt-[100px]">
      <div className="relative md:col-span-2 bg-bgColor py-[120px] hidden md:block w-full">
        <div className=" mx-32 md:sticky md:top-[120px] md:left-[22%]  aspect-[3/4] ">
          <img
            className="object-contain mx-auto shadow2"
            src={artwork.media_url}
            alt={artwork.name}
          />
        </div>
      </div>

      <div className="md:col-span-3">
        <div className="md:mb-[100px] px-[15px] md:pl-10 md:pr-5">
          <p className="s1 md:pb-0">Pricing statistics</p>

          <div className="relative pt-5 md:pt-[80px] flex justify-between gap-5">
            <div className="md:space-y-[6px] w-full md:block grid grid-cols-2 gap-[6px]">
              <div className="rounded-[10px] hover:border-unveilBlack  border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="truncate b5">
                  Total selling volume market volume
                </p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $ 0.00
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Last purchase price</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $ 0.00
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Volume last 30 days</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  $ 0.00
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Highest non-accepted bid</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                $ 0.00
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Unique collectors</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Claimed physical artworks</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0%
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">
                  Price increase since first sale
                </p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  0%
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5 leading-[23px]">Distribution Primary Sale</p>
                <p className="truncate b3 !text-[13px] leading-normal md:b4">
                  97.5% artist, 0% curator
                </p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
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
                <strong className="font-[500]">About specifications</strong>
                <br />
                We believe transparency creates wealth we gain trust by our
                collectors by being transparent.
              </p>
            </div>
          </div>
          <div className="w-[180px] mt-5 md:hidden block">
            <p className="leading-[16px] md:leading-[25px] b4">
              <strong className="font-[500]">About pricing</strong>
              <br />
              We believe transparency creates wealth we gain trust by our
              collectors by being transparent.
            </p>
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
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5">Dimentions (DAB)</p>
                <p className="truncate b4">1920 X 1080</p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5">File size</p>
                <p className="truncate b4">~ 1 MB</p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5">Blockchain</p>
                <p className="truncate b4">Ethereum</p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5">Token standard</p>
                <p className="truncate b4">ERC721</p>
              </div>
              <div className="rounded-[10px] hover:border-unveilBlack border border-bgColorHover md:py-[8px] px-[12px] py-[6px] md:px-[16px] text-left w-full md:w-[250px] lg:w-[290px] 2xl:w-[320px] cursor-pointer">
                <p className="b5">Collection address</p>
                <p className="truncate w-[100px] b4">{artwork?.contract_address?.slice(0,4)}...{artwork?.contract_address?.slice(-4)}</p>
              </div>
              <Link href={`https://etherscan.io/address/${artwork?.contract_address}`} target="_blank">
              <button className="btn mt-3 btn-secondary w-full md:col-span-1 col-span-2 md:w-[250px] lg:w-[290px] 2xl:w-[320px]">
                View on Etherscan
              </button>
              </Link>
            </div>
            <div className="absolute hidden md:block bottom-0 right-0 w-[130px]">
              <p className="b4">
                <strong className="font-[500]">About specifications</strong>
                <br />
                We believe transparency creates wealth we gain trust by our
                collectors by being transparent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemStatistics;
