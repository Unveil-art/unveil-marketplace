import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import useMagic from "@/hooks/useMagic";
import Web3 from "web3";
import { useRouter } from "next/router";
import Title from "@/components/reusable/Title";
import Steps from "@/components/section/checkout-page/steps";
import Info from "@/components/svg/Info";
import MoreInfoPopIn from "@/components/pop-in/MoreInfoPopIn";
import MoreInfo from "@/components/svg/MoreInfo";

const Checkout = () => {
  const router = useRouter();
  const { value } = useLocalStorage("token");
  const [step, setStep] = useState(1);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const { magic_connect, login, logout, getNonce } = useMagic();

  const web3 = magic_connect ? new Web3(magic_connect.rpcProvider) : null;

  return (
    <main className="min-h-screen my-[120px] px-10">
      <section className="grid grid-cols-2 md:grid-cols-2 gap-[100px]">
        <div>
          <Steps setStep={setStep} step={step} />
          <h1 className="mt-5 h3 mb-[80px]">Purchase</h1>
          {step === 1 && (
            <div>
              <div className="flex items-center gap-1">
                <p className="font-bold">Choose your Payment Method</p>
                <div
                  onClick={() => setPaymentOpen(!paymentOpen)}
                  className="cursor-pointer"
                >
                  <MoreInfo />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <MoreInfoPopIn open={paymentOpen} setOpen={setPaymentOpen} />
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
