import React, { useEffect, useState } from "react";
import NFTsListItem from "../../reusable/NFTsListItem";
import Animate from "@/components/reusable/Animate";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  getCurrentExchangeRateETHUSD,
  getOwnedNfts,
  getUserMe,
} from "lib/backend";

const OwnedNFTs = () => {
  const { value: token } = useLocalStorage("token");
  const [ownedEditions, setOwnedEditions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);  
  const init = async () => {
    try {
      const _data = await getCurrentExchangeRateETHUSD();
      setExchangeRate(_data.USD);
      const data = await getUserMe(token);
      const user_id = data.id;
      const nfts = await getOwnedNfts(user_id);
      setOwnedEditions(nfts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);
  return (
    // TODO: buttons eroner in mobile
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] pt-[80px] md:pt-[160px] md:ml-[35vw] mb-10 pr-[15px] md:pr-10">
        <div>
          <h3 className="b3 mb-[15px] text-[17px]">Owned early access NFTs</h3>
          <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
          {ownedEditions.length === 0 && (
            <div className="flex items-center gap-4 mb-20 md:gap-10">
              <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]"></div>
              <h5 className="s1 opacity-60 ">No owned artworks yet</h5>
            </div>
          )}
          {ownedEditions.map((edition, i) => (
            <NFTsListItem
              key={edition.id}
              edition={edition}
              currentExchangeRate={exchangeRate}
            />
          ))}
        </div>
      </div>
    </Animate>
  );
};

export default OwnedNFTs;
