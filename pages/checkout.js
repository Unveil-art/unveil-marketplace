import React, { useState, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";

import Steps from "@/components/section/checkout-page/Steps";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";

import PaymentSelect from "@/components/section/checkout-page/PaymentSelect";
import MoreInfo from "@/components/svg/MoreInfo";

import Payment from "@/components/section/checkout-page/Payment";
import ConnectWithWallet from "@/components/section/checkout-page/ConnectWithWallet";
import { StepContext } from "@/contexts/StepContext";
import Minting from "@/components/section/checkout-page/Minting";
import Animate from "@/components/reusable/Animate";

const Checkout = () => {
  const { value } = useLocalStorage("token");

  const { step, setStep } = useContext(StepContext);

  const [paymentOpen, setPaymentOpen] = useState(false);
  const [gasOpen, setGasOpen] = useState(false);
  const [payment, setPayment] = useState("");

  return (
    <main className="min-h-screen my-[120px] px-[15px] md:px-10">
      {step === 4 && <Minting />}
      <section className="flex gap-5 justify-between lg:gap-[100px]">
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
                <p className="b3 text-[11px] lg:text-[17px]">Artwork Name</p>
                <p className="b3 opacity-60">Artist Name</p>
                <p className="b3 opacity-60">Edition</p>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <p className="b3 text-[11px] lg:text-[17px]">€1.112</p>
              <p className="leading-[16px] lg:leading-[23px] b5">(0.05 ETH)</p>
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
              <p className="b3 text-[11px] lg:text-[17px]">+ ~$18,08</p>
              <p className="leading-[16px] lg:leading-[23px] b5">(0.05 ETH)</p>
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
              <p className="leading-[16px] lg:leading-[23px] b5">(0.05 ETH)</p>
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
