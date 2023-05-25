import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import useMagic from "@/hooks/useMagic";
import Web3 from "web3";
import { useRouter } from "next/router";

import Steps from "@/components/section/checkout-page/Steps";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";

import PaymentSelect from "@/components/section/checkout-page/PaymentSelect";
import MoreInfo from "@/components/svg/MoreInfo";
import Chat from "@/components/reusable/Chat";

import Ideal from "@/components/svg/Ideal";
import Payment from "@/components/section/checkout-page/Payment";
import ConnectWithWallet from "@/components/section/checkout-page/ConnectWithWallet";

const Checkout = () => {
  const router = useRouter();
  const { value } = useLocalStorage("token");

  const [step, setStep] = useState(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [gasOpen, setGasOpen] = useState(false);
  const [payment, setPayment] = useState("");

  return (
    <main className="min-h-screen my-[120px] px-10">
      <section className="grid grid-cols-2 md:grid-cols-2 gap-[100px]">
        <div>
          <Steps setStep={setStep} step={step} />

          {step === 1 && (
            <>
              <h1 className="mt-5 h3 mb-[80px]">Purchase</h1>
              <PaymentSelect
                setPayment={setPayment}
                setStep={setStep}
                paymentOpen={paymentOpen}
                setPaymentOpen={setPaymentOpen}
              />
            </>
          )}
          {step === 2 && <ConnectWithWallet setStep={setStep} />}
          {step === 3 && <Payment payment={payment} />}
        </div>
        <div>
          <div className="h-[3px] md:h-[5px] bg-unveilBlack"></div>
          <div className="flex items-center justify-between mt-5 mb-10">
            <div className="flex items-center gap-5">
              <div className="w-[120px] h-[140px] bg-bgColor"></div>
              <div>
                <p className="b3 text-[17px]">Artwork Name</p>
                <p className="b3 opacity-60">Artist Name</p>
                <p className="b3 opacity-60">Edition</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="b3 text-[17px]">€1.112</p>
              <p className="leading-[23px] b5">(0.05 ETH)</p>
            </div>
          </div>
          <div className="flex justify-between border-t border-[#DBDED6] py-5">
            <div className="flex items-center gap-2">
              <p className="b3 font-[17px]">Gas Fees</p>{" "}
              <div
                className="cursor-pointer"
                onClick={() => setGasOpen(!gasOpen)}
              >
                <MoreInfo />
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="b3 text-[17px]">+ ~$18,08</p>
              <p className="leading-[23px] b5">(0.05 ETH)</p>
            </div>
          </div>
          <div className="flex justify-between border-t border-[#DBDED6] py-5">
            <div className="flex items-center gap-2">
              <p className="b3 font-[17px]">Total price</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="b3 text-[17px]">$2218,08 </p>
              <p className="leading-[23px] b5">(0.05 ETH)</p>
            </div>
          </div>
        </div>
      </section>
      <MoreInfoPopIn open={paymentOpen} setOpen={setPaymentOpen} />
      <MoreInfoPopIn open={gasOpen} setOpen={setGasOpen} />
    </main>
  );
};

export default Checkout;

{
  /* <button
            className="btn btn-primary btn-lg btn-wide"
            onClick={async () => {
              if (magic_connect) {
                await web3?.eth.getAccounts(async (_, accounts) => {
                  const data =
                    await magic_connect.wallet.requestUserInfoWithUI();
                  if (!data.email) {
                    await magic_connect.wallet.disconnect();
                    alert("email is required");
                    setError("email is required");
                    return;
                  }
                  const nonceData = await getNonce({
                    email: data.email,
                    walletAddress: accounts[0],
                  });
                  await web3.eth.personal
                    .sign(nonceData.nonce, accounts[0], "")
                    .then((signedMessage) => {
                      console.log(signedMessage);
                      login({
                        requestId: nonceData.id,
                        signature: signedMessage,
                      });
                    })
                    .catch((err) => {
                      console.log(err);
                      magic_connect.wallet.disconnect();
                      alert("Login Signature Failed");
                      setError("Login Signature Failed");
                    });
                });
              }
            }}
          >
            LOGIN
          </button> */
}
