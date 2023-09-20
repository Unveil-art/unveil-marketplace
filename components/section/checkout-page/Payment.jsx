import React, { useContext, useState } from "react";
import { CheckoutWithCard } from "@paperxyz/react-client-sdk";
import Chat from "@/components/reusable/Chat";
import Ideal from "@/components/svg/Ideal";
import useLocalStorage from "@/hooks/useLocalStorage";
import { canMintThisEdition, getClientSecret, mintEdition, postTransaction } from "lib/backend";
import Loader from "@/components/svg/Loader";
import { Web3Context } from "@/contexts/Web3AuthContext";
import RPC from "lib/RPC";
import { EARLY_ACCESS_ABI, EARLY_ACCESS_CONTRACT_ADDRESS } from "lib/constants";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";

const Payment = ({ pollForTransactionHash,mint, payment,artwork, edition, setStep, total, artwork_id, edition_id }) => {

  const [secretSdkClient, setSecretSdkClient] = useState("");
  const [ loading ,setLoading] =  useState(false);
  const { value:token } = useLocalStorage('token');
  const { value:wallet } = useLocalStorage('accounts');

  
  const { rpcUrl, provider } = useContext(Web3Context);

  const hasEACard = async () => {
    try {
      if (!provider) {
        console.log("Provider not initialized yet");
        return false;
      }
      let rpc = new RPC(provider);
      let contract = await rpc.getContract(
        EARLY_ACCESS_ABI,
        EARLY_ACCESS_CONTRACT_ADDRESS
      );
      const isMinted = await contract.methods._hasMinted(wallet).call();
      if (isMinted) return true;
      return false;
    } catch (err) {
      console.log(JSON.stringify(err), "err");
      return false;
    }
  };

  const getSecret = async(token, wallet) => {
    try{
      setLoading(true);

    //   const hasEarlyAccess = await hasEACard();
    // if (!hasEarlyAccess) {
    //   setLoading(false);
    //   setStep(3);
    //   toast.info("Only EarlyAccess Card holders can Mint!!");
    //   return;
    // }
      const canMint = await canMintThisEdition(edition.edition_id);
      if(!canMint){
        // toast.error('Edition is already Minted');
        showTopStickyNotification("error", "Edition is already Minted")
        setLoading(false);
        return;
      }
      const data = await getClientSecret(token,{
        wallet_address:wallet,
        artwork_id:artwork_id,
        edition_id:edition_id
      });
      setSecretSdkClient(data.sdkClientSecret);
      setLoading(false);
    }catch(err){
      console.log(err);
        // toast.error(err?.response?.data?.message);
        showTopStickyNotification("error", err?.response?.data?.message)
        setLoading(false);
    }
  }



  

  return (
    <>
     {secretSdkClient && <div onClick={(e) => {
      setSecretSdkClient("");
      e.stopPropagation();
     }} className="fixed z-50 top-0 left-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                <div className="p-4 w-[390px] border border-gray-700 shadow-lg mt-10 rounded-lg bg-[#ffffff]">
                <CheckoutWithCard
                sdkClientSecret={secretSdkClient}
                options={{
                  colorBackground: '#ffffff',
                  colorPrimary: '#807676',
                  colorText: '#283618',
                  borderRadius: 6,
                  inputBackgroundColor: '#ffffff',
                  inputBorderColor: '#3f3f3f',
                }}
                onPaymentSuccess={(result) => {
                  console.log("Payment successful.", result);
                  pollForTransactionHash(result.id);
                  setStep(4);
                }}
                onError={(error) =>  {
                  console.error("Payment error:", error);
                  // toast.error(error.error.message);
                  showTopStickyNotification("error", error.error.message)
                  setStep(3);
                }}
              />
                </div>
      </div>}
      <h1 className="mt-5 h3 mb-[80px] hidden lg:block">Select {payment}</h1>
      {payment === "Creditcard" && (
        <>
          {/* <input
            type="text"
            className="mt-10 input"
            name="card-number"
            id="card-number"
            placeholder="Card number"
          /> */}
          {/* <div className="grid grid-cols-4 gap-[10px] mt-[10px]">
            <input
              type="text"
              className="col-span-2 input"
              name="name"
              id="name"
              placeholder="Name card holder"
            />
            <input
              type="text"
              className="input"
              name="month-year"
              id="month-year"
              placeholder="MM/YY"
            />
            <input
              type="text"
              className="input"
              name="cvc"
              id="cvc"
              placeholder="CVC"
            />
          </div> */}
          <button
            onClick={() => {
              if(token && wallet){
                getSecret(token, wallet);
              }
            }}
            className="relative cursor-pointer disabled:cursor-not-allowed text-center btn btn-primary btn-full btn-lg my-[10px]"
            disabled={loading}
          >
            {loading && <div className="h-[25px] animate-spin justify-center flex items-center">
                  <Loader color="#F7F4ED" />
                </div>}
            {!loading && <p>Pay now (${total ? total : "0"})</p>}
          </button>
        </>
      )}
      {payment === "iDeal" && (
        <div
          onClick={() => mint()}
          className="relative mt-10 cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
        >
          <p>Pay now (${total ? total : "0"})</p>
          <div className="flex items-center gap-[10px] top-1/2 right-5 -translate-y-1/2 absolute">
            <Ideal />
          </div>
        </div>
      )}
      {payment === "Wallet" && (
        <div
          onClick={() => mint()}
          className="relative mt-10 cursor-pointer text-center btn btn-primary btn-full btn-lg my-[10px]"
        >
          <p>Pay now (${total ? total : "0"})</p>
        </div>
      )}

      <div className="mt-10 mb-20">
        <Chat
          title="Get help with payment"
          text="Explore the possibilities with NFTs and prints"
        />
      </div>
    </>
  );
};

export default Payment;
