import { useEffect, useRef, useState } from "react";
import { useAsideAnimation } from "../../hooks/animations/useAsideAnimation";
import Close from "../svg/Close";

const OptionsPopIn = ({ optionsOpen, setOptionsOpen, artwork }) => {
  const [editionSizes, setEditionSizes] = useState([]);
  const [nftEditions, setNftEditions] = useState();

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
        className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 w-[280px] sm:w-[380px] max-h-[calc(100vh-40px)] bg-[#ECE8DE] px-5 pt-5 pb-10 z-50 rounded-[20px] h-fit"
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
                      <strong className="!opacity-100">
                        {editionSize.size}
                      </strong>{" "}
                      <span className="opacity-60">
                        Edition of {editionSize.editions.length}
                      </span>
                    </p>
                    <div className="space-y-[10px]">
                      {editionSize.editions.map((edition, i) => (
                        <div
                          key={i}
                          className="flex border overflow-hidden rounded-[10px] border-unveilDrakGray h-[166px] "
                        >
                          <div className="bg-[#9A8183] w-[120px] relative p-5 flex justify-center items-center">
                            <img
                              className="object-contain frame-1"
                              src={artwork.media_url}
                              alt={artwork.name}
                            />
                          </div>
                          <div className="flex flex-col justify-between p-5 ">
                            <div>
                              <p className="b3">
                                No {i + 1} of {editionSize.editions.length}
                              </p>
                              <p>€{edition.price}</p>
                            </div>
                            <button className="btn btn-secondary btn-full">
                              Buy from artist
                            </button>
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
            <p className="mb-2 b3">
              <strong className="!opacity-100">NFT only</strong>Edition of{" "}
              {nftEditions.length}
              <span className="opacity-60">edtion</span>
            </p>
            <div className="space-y-[10px]">
              {nftEditions.map((edition, i) => (
                <div
                  key={i}
                  className="flex border overflow-hidden rounded-[10px] border-unveilDrakGray h-[166px] "
                >
                  <div className="bg-[#9A8183] w-[120px]"></div>
                  <div className="flex flex-col justify-between p-5 ">
                    <div>
                      <p className="b3">
                        No {i + 1} of {nftEditions.length}
                      </p>
                      <p>€{edition.price}</p>
                    </div>
                    <button className="btn btn-secondary btn-full">
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
