import React, { useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import useMagic from "@/hooks/useMagic";
import Web3 from "web3";
import { useRouter } from "next/router";
import Title from "@/components/reusable/Title";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { value } = useLocalStorage("token");
  const { magic_connect, login, logout, getNonce } = useMagic();

  const web3 = magic_connect ? new Web3(magic_connect.rpcProvider) : null;

  useEffect(() => {
    router.push("/404");
  }, []);

  if (value) {
    router.push("/account");

    return (
      <div className="h-screen pt-[120px]">
        <Title title="Logout" />
        <div className="ml-[40px] mt-[120px] md:ml-[35svw] pr-[15px] md:pr-10 ">
          <button
            className="btn btn-primary btn-lg btn-wide"
            onClick={() => {
              if (magic_connect) {
                magic_connect.wallet.disconnect();
              }
              logout();
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen pt-[120px]">
        <Title title="Login" />
        <div className="ml-[40px] mt-[120px] md:ml-[35svw] pr-[15px] md:pr-10 ">
          <button
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
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
