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
import Animate from "@/components/reusable/Animate";
import { getArtworkById } from "lib/backend";
import RPC from "lib/RPC";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { MARKET_ABI } from "lib/constants";
import { ethers } from "ethers";
import Web3 from "web3";

const EditionCheckout = ({ artwork, edition_id }) => {
  const { value } = useLocalStorage("token");
  const { value: wallet } = useLocalStorage("walletAddress");

  const { step, setStep } = useContext(StepContext);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [gasOpen, setGasOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [edition, setEdition] = useState();
  const [gasFees, setGasFees] = useState();

  const {
    provider,
    convertWei,
    convertUSDToWei,
    convertWeiToETH,
    getPrivateKey,
  } = useContext(Web3Context);

  const getGasFees = async (price) => {
    if (!provider) {
      console.log("Provider not initialized yet");
      return;
    }

    let rpc = new RPC(provider);
    let contract = await rpc.getContract(
      MARKET_ABI,
      "0xC0Ddf7Eb7C8Dd38B861DC117f7bE4bbb26288a3c"
    );
    const priceInWei = Web3.utils.toWei(".01");

    let hash;

    try {
      hash = await contract.methods
        .getHashMessage(artwork.contract_address, artwork.json_uri, priceInWei)
        .call(function (error, result) {
          console.log(result);
        });
    } catch (error) {
      console.error(JSON.stringify(error));
    }

    const gasPrice = await rpc.getGasPrice();
    const signature = await rpc.signMessage(hash, wallet, "");
    console.log(signature);

    try {
      const gasAmount = await contract.methods
        .buyMintNft(
          artwork.contract_address,
          artwork.json_uri,
          signature,
          priceInWei,
          "0x0000000000000000000000000000000000000000",
          "0x0000000000000000000000000000000000000000"
        )
        .estimateGas({ from: wallet, value: priceInWei });

      const fee = gasPrice * gasAmount;
      setGasFees(fee / 1e18);
      console.log("*", gasAmount);
      console.log(fee);
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

  useEffect(() => {
    const edition = artwork.editions.find(
      ({ edition_id: id }) => id === edition_id
    );
    setEdition(edition);
  }, []);

  useEffect(() => {
    if (edition) {
      getGasFees(edition.price);
    }
  }, [edition]);

  return (
    <main className="min-h-screen my-[120px] px-[15px] md:px-10">
      {step === 4 && <Minting />}
      <section className="lg:flex gap-5 justify-between lg:gap-[100px]">
        <div className="block lg:hidden ">
          <Steps setStep={setStep} step={step} />
          {step === 1 && <h1 className="mt-5 h1 ">Purchase</h1>}
          {step === 2 && <h1 className="mt-5 h1 ">Wallet connected</h1>}
          {step === 3 && <h1 className="mt-5 h1 ">Select {payment}</h1>}
        </div>
        <div className="flex justify-center w-full">
          <div className="order-2 lg:order-1 w-full lg:w-[700px] ">
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
                <Payment payment={payment} setStep={setStep} />
              </Animate>
            )}
          </div>
        </div>

        <div className="order-1 lg:order-2 w-full lg:w-[700px] 2xl:min-w-[700px]">
          <div className="h-[3px] md:h-[5px] bg-unveilBlack"></div>
          <div className="flex items-center justify-between md:my-5 my-[15px]">
            <div className="flex items-center gap-5">
              <div className="w-[60px] h-[72px] md:w-[120px] md:h-[140px] bg-bgColor"></div>
              <div>
                <p
                  className="b3 text-[11px] lg:text-[17px]"
                  onClick={() => getPrivateKey()}
                >
                  {artwork.name}
                </p>
                <p className="b3 opacity-60">{displayName}</p>
                <p className="b3 opacity-60">Edition {}</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              {edition && (
                <p className="b3 text-[11px] lg:text-[17px]">
                  €{edition.price}
                </p>
              )}
              {edition && (
                <p className="leading-[16px] lg:leading-[23px] b5">
                  ({convertWeiToETH(convertUSDToWei(edition.price.toString()))}{" "}
                  ETH)
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
            <div className="flex items-end gap-2">
              <p className="b3 text-[11px] lg:text-[17px]">+ ~$</p>
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
                $2218,08{" "}
              </p>
              <p className="leading-[16px] lg:leading-[23px] b5">(0.00 ETH)</p>
            </div>
          </div>
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
