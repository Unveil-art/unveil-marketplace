import { useEffect, useRef, useState } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";
import useDominantColor from "@/hooks/useDominantColor";

const OptionsPopIn = ({ optionsOpen, setOptionsOpen, artwork, setEdition }) => {
  const [editionSizes, setEditionSizes] = useState([]);
  const [nftEditions, setNftEditions] = useState();

  const { color, loading, error } = useDominantColor(artwork.media_url);

  console.log(artwork);
  const el = useRef();

  useAsideAnimation(el, optionsOpen);

  function groupBySize(editions, sizes) {
    return sizes.map((size) => ({
      size: size,
      editions: editions.filter((edition) => edition.size === size),
    }));
  }

  useEffect(() => {
    if (artwork.edition_type !== "NFT_Only") {
      const result = groupBySize(artwork.editions, artwork.size);
      setEditionSizes(result);
    } else {
      setNftEditions(artwork.editions);
    }
  }, []);

  return (
    <section
      ref={el}
      className="fixed z-50 invisible w-full h-screen overflow-hidden"
    >
      <div
        data-lenis-prevent
        className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[330px] sm:w-[380px] max-h-[calc(100vh-40px)] bg-[#ECE8DE] px-5 pt-5 pb-10 z-50 rounded-[20px] h-fit"
      >
        <div
          onClick={() => setOptionsOpen(false)}
          className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
        >
          <div className="-translate-x-[1px]">
            <Close />
          </div>
        </div>

        <h3 className="mb-10 s2">Select edition</h3>

        {editionSizes && (
          <>
            {editionSizes.map((editionSize, i) => (
              <div key={i} className="mb-10 last:mb-0">
                {editionSize.editions.length > 0 && (
                  <>
                    <p className="mb-2 b3">
                      <strong className="!opacity-100 font-[500]">
                        {editionSize.size}
                      </strong>{" "}
                      <span className="opacity-60">
                        Edition of {editionSize.editions.length}
                      </span>
                    </p>
                    <div className="space-y-[5px]">
                      {editionSize.editions.map((edition, i) => (
                        <div
                          key={i}
                          className="flex border bg-[#F9F7F2] overflow-hidden rounded-[10px] border-unveilDrakGray h-[140px] md:h-[166px] "
                        >
                          {/* <ImageColor imageUrl={artwork.media_url} />; */}
                          <div className=" min-w-[100px] max-w-[100px] md:min-w-[120px] md:max-w-[120px] relative p-5 flex justify-center items-center">
                            <img
                              className="object-contain shadow2"
                              src={artwork.media_url}
                              alt={artwork.name}
                            />
                          </div>

                          <div className="relative flex flex-col justify-between w-full pt-5 pb-[15px] px-5 ">
                            <div>
                              <p className="b3">
                                No {i + 1} of {editionSize.editions.length}
                              </p>
                              <p className="b4">€{edition.price}</p>
                            </div>
                            <button
                              // onClick={() =>
                              //   // setEdition({
                              //   //   ...edition,
                              //   //   edition_index: i + 1,
                              //   //   max_editions: nftEditions.length,
                              //   //   media_url: artwork.media_url,
                              //   //   edition_type: artwork.edition_type,
                              //   // })
                              // }
                              className="w-full btn btn-secondary btn-full"
                            >
                              Buy from artist
                            </button>
                            {edition.token_id && (
                              <p className="absolute -bottom-1 left-5 b5">
                                Token ID #{edition.token_id}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </>
        )}
        {nftEditions && (
          <>
            <p className="mb-2 b3 ">
              <strong className="!opacity-100 font-[500]">NFT only</strong>{" "}
              <span className="opacity-60">
                Edition of {nftEditions.length}
              </span>
            </p>
            <div className="space-y-[10px]">
              {nftEditions.map((edition, i) => (
                <div
                  key={i}
                  className="flex border overflow-hidden rounded-[10px] border-unveilDrakGray h-[166px] "
                >
                  <div className="bg-[#9A8183] min-w-[100px] max-w-[100px] md:min-w-[120px] md:max-w-[120px] relative p-5 flex justify-center items-center">
                    <img
                      className="object-contain shadow2"
                      src={artwork.media_url}
                      alt={artwork.name}
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full p-5">
                    <div>
                      <p className="b3">
                        No {i + 1} of {nftEditions.length}
                      </p>
                      <p className="b4">${edition.price} or 0 ETH</p>
                    </div>

                    <button
                      onClick={() =>
                        setEdition({
                          ...edition,
                          edition_index: i + 1,
                          max_editions: nftEditions.length,
                          media_url: artwork.media_url,
                          edition_type: artwork.edition_type,
                          artwork_id: artwork.id,
                        })
                      }
                      className="btn btn-full btn-secondary"
                    >
                      Buy from artist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div
        onClick={() => setOptionsOpen(false)}
        className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
      ></div>
    </section>
  );
};

export default OptionsPopIn;
