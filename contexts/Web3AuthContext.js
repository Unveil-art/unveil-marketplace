import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { createContext, useEffect, useState } from "react";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import Web3 from "web3";
import RPC from "lib/RPC";
import { useAuth } from "@/hooks/useAuth";
import { doWalletHasEmail, getNonce } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";

export const Web3Context = createContext({
  account: "",
  web3Auth: null,
  provider: null,
  balance: "",
  email: true,
  displayRamper: false,
  ramperAmount: 100,
  login: () => {},
  logout: () => {},
  getBalance: () => {},
  convertWei: () => {},
  showRamper: () => {},
  hideRamper: () => {},
});

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_API_KEY;

export const rpcUrl = process.env.NEXT_PUBLIC_CHAIN_LINK;
export const chainId = process.env.NEXT_PUBLIC_CHAINID;

const Web3AuthProvider = ({ children }) => {
  const { doLogin, doLogout } = useAuth();
  const [ramper, setRamper] = useState({
    display: false,
    amount: 100,
  });
  const [web3Auth, setWeb3Auth] = useState(null);
  const [provider, setProvider] = useState(null);

  const showRamper = (amount) =>
    setRamper({
      display: true,
      amount: amount ?? 100,
    });
  const hideRamper = () =>
    setRamper({
      display: false,
      amount: 100,
    });

  const {
    value: balance,
    setValue: setBalance,
    removeValue: removeBalance,
  } = useLocalStorage("balance");
  const {
    value: wallet,
    setValue: setWallet,
    removeValue: removeWallet,
  } = useLocalStorage("walletAddress");

  const {
    value: account,
    setValue: setAccount,
    removeValue: removeAccount,
  } = useLocalStorage("accounts");
  const { setValue, removeValue } = useLocalStorage("token");
  const [email, setEmail] = useState();

  const init = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId: clientId, // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chainId,
          rpcTarget: rpcUrl,
        },
        web3AuthNetwork: chainId == "0x1" ? "cyan" : "testnet",
      });

      // adding wallet connect v1 adapter

      const walletConnectV1Adapter = new WalletConnectV1Adapter({
        adapterSettings: {
          bridge: "https://bridge.walletconnect.org",
        },
        clientId,
      });

      web3auth.configureAdapter(walletConnectV1Adapter);

      const metamaskAdapter = new MetamaskAdapter({
        clientId,
        sessionTime: 3600, // 1 hour in seconds
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chainId,
          rpcTarget: rpcUrl,
        },
        web3AuthNetwork: chainId == "0x1" ? "cyan" : "testnet",
      });
      // we can change the above settings using this function
      metamaskAdapter.setAdapterSettings({
        sessionTime: 86400, // 1 day in seconds
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chainId,
          rpcTarget: rpcUrl,
        },
        web3AuthNetwork: chainId == "0x1" ? "cyan" : "testnet",
      });

      // it will add/update  the metamask adapter in to web3auth class
      web3auth.configureAdapter(metamaskAdapter);

      setWeb3Auth(web3auth);

      await web3auth.initModal();
      if (web3auth.provider) {
        setProvider(web3auth.provider);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPrivateKey = async () => {
    if (!provider) return;
    const privateKey = await web3Auth.provider.request({
      method: "private_key",
    });
    console.log(privateKey);
  };

  const convertWei = (numberInString) => {
    const web3 = new Web3();
    const eth = web3.utils.fromWei(numberInString, "ether");
    return eth;
  };
  const convertUSDToWei = (numberInString) => {
    const web3 = new Web3();
    const eth = web3.utils.toWei(numberInString, "ether");
    return eth;
  };
  const convertWeiToETH = (numberInString) => {
    const web3 = new Web3();
    const eth = web3.utils.toWei(numberInString, "ether");
    return eth;
  };

  const login = async (formEmail) => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    } else {
      try {
        setEmail(false);
        const web3AuthProvider = await web3Auth.connect();
        setProvider(web3AuthProvider);
        const rpc = new RPC(web3AuthProvider);
        const accounts = await rpc.getAccounts();
        const info = await web3Auth.getUserInfo();

        if (info.email) {
          const nonceData = await getNonce({
            email: info.email,
            walletAddress: accounts,
          });

          const signedMessage = await rpc.signMessage(nonceData.nonce);

          setWallet(accounts);
          setAccount(accounts);

          await doLogin({
            requestId: nonceData.id,
            signature: signedMessage,
          });
        } else {
          const email = await doWalletHasEmail(accounts);
          if (!email && !formEmail) {
            setEmail(true);
            return;
          } else {
            setEmail(false);
          }
          if (formEmail || email) {
            const nonceData = await getNonce({
              email: formEmail ?? email,
              walletAddress: accounts,
            });

            const signedMessage = await rpc.signMessage(nonceData.nonce);

            setEmail(false);
            setWallet(accounts);
            setAccount(accounts);

            await doLogin({
              requestId: nonceData.id,
              signature: signedMessage,
            });
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const logout = async () => {
    if (web3Auth) {
      try {
        await web3Auth.logout();
        await doLogout();
        setProvider(null);
        removeAccount();
        removeWallet();
        removeBalance();
        removeValue();
        setEmail(false);
      } catch (err) {
        console.log(err);
        setProvider(null);
        removeAccount();
        removeWallet();
        removeBalance();
        removeValue();
        setEmail(false);
      }
    }
  };
  const getBalance = async () => {
    if (!provider) {
      console.log("provider is not initialized yet");
    } else {
      const rpc = new RPC(provider);
      const bal = await rpc.getBalance();
      const _balance = parseFloat(Web3.utils.fromWei(bal, "ether"));
      setBalance(_balance.toFixed(4));
    }
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        web3Auth,
        provider,
        balance,
        login,
        logout,
        getBalance,
        email,
        displayRamper: ramper.display,
        ramperAmount: ramper.amount,
        showRamper,
        hideRamper,
        setEmail,
        convertWei,
        getPrivateKey,
        convertWeiToETH,
        convertUSDToWei,
        rpcUrl,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3AuthProvider;
