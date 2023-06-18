import React, { useState, useContext, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

import Steps from "@/components/section/checkout-page/Steps";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";

import PaymentSelect from "@/components/section/checkout-page/PaymentSelect";
import MoreInfo from "@/components/svg/MoreInfo";

import Payment from "@/components/section/checkout-page/Payment";
import ConnectWithWallet from "@/components/section/checkout-page/ConnectWithWallet";
import { StepContext } from "@/contexts/StepContext";
import Minting from "@/components/section/checkout-page/Minting";
import Minted from "@/components/section/checkout-page/Minted";
import Animate from "@/components/reusable/Animate";
import { ToastContainer, toast } from "react-toastify";
import {
  getArtworkById,
  getCurrentExchangeRateUSDETH,
  getCurrentExchangeRateETHUSD,
  mintEdition,
  postTransaction,
} from "lib/backend";
import RPC from "lib/RPC";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { MARKET_ABI } from "lib/constants";
import Web3 from "web3";

const EditionCheckout = ({ artwork, edition_id }) => {
  const { value } = useLocalStorage("token");
  const { value: wallet } = useLocalStorage("walletAddress");
  const { step, setStep } = useContext(StepContext);
  const { provider, rpcUrl } = useContext(Web3Context);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [gasOpen, setGasOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [edition, setEdition] = useState();
  const [priceUSD, setPriceUSD] = useState();
  const [gasFees, setGasFees] = useState();
  const [gasFeesUSD, setGasFeesUSD] = useState();
  const [total, setTotal] = useState();
  const [index, setIndex] = useState();

  const handlePrice = async () => {
    const res = await getCurrentExchangeRateETHUSD();
    setPriceUSD(res.USD.toFixed(2));
  };

  useEffect(() => {
    handlePrice();
    console.log();
  }, []);

  useEffect(() => {
    if (gasFeesUSD) {
      setTotal(parseFloat(priceUSD) + parseFloat(gasFeesUSD.toFixed(2)));
    }
    console.log(gasFees);
  }, [gasFeesUSD]);

  const getGasFees = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }

    let rpc = new RPC(provider);
    let contract = await rpc.getContract(
      MARKET_ABI,
      "0xC0Ddf7Eb7C8Dd38B861DC117f7bE4bbb26288a3c"
    );

    const ethEx = await getCurrentExchangeRateUSDETH();
    const priceInEth = ethEx.ETH * edition.price;
    const priceInWei = Web3.utils.toWei(priceInEth.toFixed(4));

    const gasPrice = await rpc.getGasPrice();

    try {
      const gasAmount = await contract.methods
        .buyMintNft(
          artwork.contract_address,
          artwork.json_uri,
          edition.signature,
          priceInWei,
          "0x0000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000"
        )
        .estimateGas({ from: wallet, value: priceInWei });

      const fee = gasPrice * gasAmount;
      setGasFees(fee / 1e18);

      const usd = await getCurrentExchangeRateETHUSD();
      setGasFeesUSD(usd.USD * (fee / 1e18));
    } catch (err) {
      console.log(JSON.stringify(err), "=====");
      setGasFees(0.03);
    }
  };

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

  useEffect(() => {
    const edition = artwork.editions.find(
      ({ edition_id: id }) => id === edition_id
    );
    setEdition(edition);
    setIndex(
      artwork.editions.findIndex((edition) => edition.edition_id === edition_id)
    );
  }, []);

  useEffect(() => {
    if (edition) {
      getGasFees(edition.price);
    }
  }, [edition]);

  const mint = async () => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }
    setStep(4);

    let rpc = new RPC(provider);
    let contract = await rpc.getContract(
      MARKET_ABI,
      "0xC0Ddf7Eb7C8Dd38B861DC117f7bE4bbb26288a3c"
    );

    const ethEx = await getCurrentExchangeRateUSDETH();
    const priceInEth = ethEx.ETH * edition.price;
    const priceInWei = Web3.utils.toWei(priceInEth.toFixed(4));

    try {
      const transaction = await contract.methods
        .buyMintNft(
          artwork.contract_address,
          artwork.json_uri,
          edition.signature,
          priceInWei,
          "0x0000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000"
        )
        .send({ from: wallet, value: priceInWei });
      console.log(
        "TRANSACTION",
        transaction.events.LazyMint.returnValues.tokenId
      );
      const mint = await mintEdition(
        value,
        {
          artwork_id: artwork.id,
          token_id: parseInt(transaction.events.LazyMint.returnValues.tokenId),
          signature: edition.signature,
          transactionHash: transaction.transactionHash,
          json_uri: artwork.json_uri,
        },
        edition.edition_id
      );
      console.log(mint);
      await postTransaction(value, {
        transaction_hash: transaction.transactionHash,
        amount: parseFloat(
          (parseFloat(gasFees) + parseFloat(edition.price)).toFixed(4)
        ),
        currency: "ETH",
        transaction_type: "MINT_EDITION",
        chain_link: rpcUrl,
        edition_id: edition.edition_id,
        artwork_id: artwork.id,
      });
      setStep(5);
    } catch (err) {
      console.log(JSON.stringify(err), "=====");
      toast.error(JSON.stringify(err));
      setStep(3);
    }
  };

  return (
    <main className="min-h-screen my-[120px] px-[15px] md:px-10">
      <ToastContainer />
      {step === 4 && <Minting />}
      {step === 5 && <Minted />}
      <section className="lg:flex block gap-5 justify-between lg:gap-[100px]">
        <div className="block lg:hidden ">
          <Steps setStep={setStep} step={step} />
          {step === 1 && <h1 className="mt-5 h1 ">Purchase</h1>}
          {step === 2 && <h1 className="mt-5 h1 ">Wallet connected</h1>}
          {step === 3 && <h1 className="mt-5 h1 ">Select {payment}</h1>}
        </div>
        <div className="justify-center block w-full md:flex">
          <div className="order-2 lg:order-1 w-full 2xl:w-[700px] ">
            <div className="hidden lg:block">
              <Steps setStep={setStep} step={step} />
            </div>

            {step === 1 && (
              <>
                <Animate options={{ alpha: true }}>
                  <h1 className="mt-5 h3 mb-[80px] hidden lg:block">
                    Purchase
                  </h1>
                  <PaymentSelect
                    artwork={artwork}
                    setPayment={setPayment}
                    setStep={setStep}
                    paymentOpen={paymentOpen}
                    setPaymentOpen={setPaymentOpen}
                  />
                </Animate>
              </>
            )}
            {step === 2 && (
              <Animate options={{ alpha: true }}>
                <ConnectWithWallet setStep={setStep} />
              </Animate>
            )}
            {step === 3 && (
              <Animate options={{ alpha: true }}>
                <Payment
                  mint={mint}
                  total={total}
                  payment={payment}
                  setStep={setStep}
                />
              </Animate>
            )}
          </div>
        </div>
        <div className="order-1 mt-10 md:mt-0 lg:order-2 w-full lg:min-w-[450px] 2xl:min-w-[700px] 2xl:max-w-[700px]">
          <Animate options={{ alpha: true }}>
            <div className="h-[3px] md:h-[5px] bg-unveilBlack"></div>
            <div className="flex items-center justify-between md:my-5 my-[15px]">
              <div className="flex items-center gap-5">
                <div className="h-[136px] w-[106px] md:h-[140px] md:w-[120px] bg-bgColor my-[10px]">
                  <div className="flex items-center justify-center h-full p-5">
                    <div
                      className={`shadow2 mx-auto bg-unveilWhite w-fit
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
                <div>
                  <p
                    className="b3 text-[11px] lg:text-[17px]"
                    onClick={() => setStep(5)}
                  >
                    {artwork.name}
                  </p>
                  <p className="b3 opacity-60">{displayName}</p>
                  <p className="b3 opacity-60">
                    Edition {index + 1} of {artwork.editions.length}
                  </p>
                </div>
              </div>
              <div className="flex items-end gap-2">
                {edition && (
                  <p className="b3 text-[11px] lg:text-[17px]">${priceUSD}</p>
                )}
                {edition && (
                  <p className="leading-[16px] whitespace-nowrap lg:leading-[23px] b5">
                    ({edition.price} ETH)
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between border-t border-[#DBDED6] py-[10px] md:py-5">
              <div className="flex items-center gap-2">
                <p className="b3 lg:font-[17px]">Gas Fees</p>{" "}
                <div
                  className="cursor-pointer"
                  onClick={() => setGasOpen(!gasOpen)}
                >
                  <MoreInfo />
                </div>
              </div>
              <div className="flex items-center gap-2 md:items-end">
                <p className="b3 text-[11px] lg:text-[17px]">
                  + ~${gasFeesUSD && <>{gasFeesUSD.toFixed(2)}</>}
                </p>
                <p className="leading-[16px] lg:leading-[23px] b5">
                  {gasFees && <>({gasFees.toFixed(4)} ETH)</>}
                </p>
              </div>
            </div>
            <div className="flex justify-between border-t border-[#DBDED6] py-[10px] md:py-5">
              <div className="flex items-center gap-2">
                <p className="b3 font-[17px]">Total price</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="b3 font-medium text-[11px] lg:text-[17px]">
                  ${total ? total : "0"}{" "}
                </p>
                <p className="leading-[16px] lg:leading-[23px] b5">
                  (
                  {gasFees
                    ? (parseFloat(gasFees) + parseFloat(edition.price)).toFixed(
                        4
                      )
                    : "0"}{" "}
                  ETH)
                </p>
              </div>
            </div>
          </Animate>
        </div>
      </section>
      <MoreInfoPopIn open={paymentOpen} setOpen={setPaymentOpen} />
      <MoreInfoPopIn open={gasOpen} setOpen={setGasOpen} />
    </main>
  );
};

export default EditionCheckout;

export async function getServerSideProps({ params }) {
  const artwork = await getArtworkById(params.artwork_id);

  return {
    props: {
      artwork,
      edition_id: params.edition_id,
    },
  };
}
