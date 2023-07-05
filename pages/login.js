import React, { useState, useContext } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import Title from "@/components/reusable/Title";
import { Web3Context } from "@/contexts/Web3AuthContext";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { value } = useLocalStorage("token");
  const { authenticated } = useIsAuthenticated();

  const { account, web3Auth, provider, balance, login, logout, getBalance } =
    useContext(Web3Context);

  if (value) {
    router.push("/account");

    return (
      <div className="h-screen pt-[120px]">
        <Title title="Logout" />
        <div className="ml-[40px] mt-[120px] md:ml-[35vw] pr-[15px] md:pr-10 ">
          <button
            className="btn btn-primary btn-lg btn-wide"
            onClick={() => logout()}
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
        <div className="ml-[40px] mt-[120px] md:ml-[35vw] pr-[15px] md:pr-10 ">
          <button
            className="btn btn-primary btn-lg btn-wide"
            onClick={() => login()}
          >
            LOGIN
          </button>
        </div>
      </div>
    );
  }
};

export default Login;
