import { useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { ConnectExtension } from "@magic-ext/connect";
import axios from "axios";
import useLocalStorage from "./useLocalStorage";
import { useRouter } from "next/router";

const useMagic = () => {
  const router = useRouter();

  const customNodeOptions = {
    rpcUrl: "https://rpc-mumbai.maticvigil.com/",
    chainId: 80001,
  };

  const magic_auth =
    typeof window !== "undefined" && new Magic("pk_live_43C3AFAAC05898C7");

  const magic_connect =
    typeof window !== "undefined" &&
    new Magic("pk_live_43B502862B18C73D", {
      network: customNodeOptions,
      locale: "en_US",
      extensions: [new ConnectExtension()],
    });

  const { setValue, removeValue } = useLocalStorage("token");
  const { setValue: setUserValue, removeValue: removeUserValue } =
    useLocalStorage("user");

  const getNonce = async (_data) => {
    const { data } = await axios({
      method: "POST",
      url: `https://marketplace-backend-dev.unveil.art/api/v1/auth/get-nonce`,
      data: _data,
      withCredentials: true,
    });
    return data;
  };

  const logout = async () => {
    await axios({
      method: "POST",
      url: "https://marketplace-backend-dev.unveil.art/api/v1/auth/logout",
      withCredentials: true,
    });
    removeValue();
    removeUserValue();
    router.push("/");
  };

  const login = async (_data) => {
    const { data } = await axios({
      method: "POST",
      url: `https://marketplace-backend-dev.unveil.art/api/v1/auth/login`,
      data: _data,
      withCredentials: true,
    });
    setValue(data.accessToken);
    setUserValue(JSON.stringify(data));
    console.log(data, "login response");
    router.push("/account");
  };

  return { magic_connect, login, logout, getNonce };
};

export default useMagic;
