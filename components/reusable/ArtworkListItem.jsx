import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

import { Web3Context } from "@/contexts/Web3AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  listArtwork,
  listEdition,
  getCurrentExchangeRateUSDETH,
} from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import RPC from "lib/RPC";
import Web3 from "web3";
import { MARKET_ABI } from "lib/constants";

const ArtworkListItem = ({ i, item }) => {
  const [list, setList] = useState(item);
  const { value } = useLocalStorage("token");
  const { value: wallet } = useLocalStorage("walletAddress");
  const { provider } = useContext(Web3Context);

  useEffect(() => {
    setList(item);
    console.log(item);
  }, [item]);

  const handleListing = async (e) => {
    e.preventDefault();

    try {
      const data = await listArtwork(value, item.id, !list.listed);
      const eth = await getCurrentExchangeRateUSDETH();

      let uniqueEdition = [];
      item.editions.forEach(async (edition) => {
        if (uniqueEdition.includes(edition.edition_id)) {
        } else {
          uniqueEdition.push(edition.edition_id);
          const priceETH = eth.ETH * edition.price;
          const priceInWei = Web3.utils.toWei(priceETH.toFixed(4));
          let rpc = new RPC(provider);
          let contract = await rpc.getContract(
            MARKET_ABI,
            "0xC0Ddf7Eb7C8Dd38B861DC117f7bE4bbb26288a3c"
          );

          try {
            const hash = await contract.methods
              .getHashMessage(item.contract_address, item.json_uri, priceInWei)
              .call(function (error, result) {
                console.log(result);
              });
            const signature = await rpc.signMessage(hash, wallet, "");
            await listEdition(value, edition.id, !list.listed, signature);
          } catch (error) {
            console.error(JSON.stringify(error));
          }
        }
      });

      setList(data.data);
      toast.success("Successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      key={i}
      className="flex items-center justify-between gap-4 border-b last:border-none border-bgBlackOpacity"
    >
      <div className="flex items-center gap-4 md:gap-10">
        <div className="max-h-[136px] max-w-[106px] min-h-[136px] min-w-[106px] md:max-h-[140px] md:max-w-[120px] md:min-h-[140px] md:min-w-[120px] bg-bgColor my-[10px]">
          <div className="flex items-center justify-center h-full p-5">
            <img
              className="object-contain shadow2"
              src={item.media_url}
              alt={item.name}
            />
          </div>
        </div>
        <div>
          <h4 className="mb-2 md:mb-0 s1">{item.name}</h4>
          {item.is_draft && (
            <Link href={`/artworks/${item.id}`}>
              <button className="block btn btn-secondary btn-lg md:hidden">
                View
              </button>
            </Link>
          )}
        </div>
      </div>
      {item.is_draft && (
        <Link href={`/artworks/${item.id}`}>
          <button className="hidden btn btn-secondary md:block">View</button>
        </Link>
      )}
      {item.is_draft === false && (
        <button
          onClick={(e) => handleListing(e)}
          className="hidden btn btn-secondary md:block"
        >
          {!list.listed && <p> List for sale</p>}
          {list.listed && <p> Unlist for sale</p>}
        </button>
      )}
    </div>
  );
};

export default ArtworkListItem;
