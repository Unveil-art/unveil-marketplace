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
import Loader from "../svg/Loader";

const ArtworkListItem = ({ i, item,fetchUser}) => {
  const [list, setList] = useState(item);
  const [loading, setLoading] = useState(false);
  const { value } = useLocalStorage("token");
  const { value: wallet } = useLocalStorage("walletAddress");
  const { provider } = useContext(Web3Context);

  useEffect(() => {
    setList(item);
    console.log(item);
  }, [item]);

  const handleListing = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await listArtwork(value, item.id, !list.listed);
      const eth = await getCurrentExchangeRateUSDETH();  //  comment/remove this line

      let uniqueEdition = [];
      item.editions.forEach(async (edition) => {
        if (uniqueEdition.includes(edition.edition_id)) {
        } else {
          uniqueEdition.push(edition.edition_id);

          // we will store only ETH Value in Edition Price
          // No need to convert USD to ETH here
          const priceETH = eth.ETH * edition.price; // comment/remove this conversion code
          const priceInWei = Web3.utils.toWei(priceETH.toFixed(4));
          let rpc = new RPC(provider);
          let contract = await rpc.getContract(
            MARKET_ABI,
            process.env.NEXT_PUBLIC_MARKET_ADDRESS
          );

          try {
            if(list.listed){
              await listEdition(value, edition.id, !list.listed, edition.signature);
            }else{
                const hash = await contract.methods
                .getHashMessage(item.contract_address, item.json_uri, priceInWei)
                .call(function (error, result) {
                  console.log(result);
                });
              const signature = await rpc.signMessage(hash, wallet, "");
              await listEdition(value, edition.id, !list.listed, signature);
            }
            if(fetchUser){
              fetchUser()
            }
            setLoading(false)
          } catch (error) {
            console.error(JSON.stringify(error));
            setLoading(false);
          }
        }
      });

      setList(data.data);
      toast.success("Successful");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
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
          {item.is_draft && (
            <Link href={`/artworks/${item.id}`}>
              <h4 className="mb-2 md:mb-0 s1">{item.name}</h4>
            </Link>
          )}
          {!item.is_draft && <h4 className="mb-2 md:mb-0 s1">{item.name}</h4>}
          {item.is_draft && (
            <Link href={`/artworks/${item.id}`}>
              <button className="block btn btn-secondary btn-lg md:hidden">
                View
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center">
      {!item.listed && (
        <Link href={`/artworks/${item.id}`}>
          <button className="hidden btn btn-secondary md:block">Edit</button>
        </Link>
      )}
      {item.is_draft === false && (
        <button
        disabled={loading}
          onClick={(e) => handleListing(e)}
          className={`hidden btn btn-ghost bg-${list.listed ? "[#D6471A]" : 'unveilBlack'} md:block text-white`}
        >
          {loading && (
                  <div className="flex justify-center h-[25px] items-center animate-spin">
                    <Loader color="#F7F4ED" />
                  </div>
                )}
          {!list.listed && !loading && <p> List for Sale</p>}
          {list.listed && !loading && <p> Unlist</p>}
        </button>
      )}
      </div>
    </div>
  );
};

export default ArtworkListItem;
