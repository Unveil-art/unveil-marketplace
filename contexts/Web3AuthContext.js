import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { Web3Auth } from "@web3auth/modal";
import { createContext, useEffect, useState } from "react";
import { WalletConnectV1Adapter } from "@web3auth/wallet-connect-v1-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import Web3 from "web3";
import RPC from "lib/RPC";
import { useAuth } from "@/hooks/useAuth";
import { getNonce } from "lib/backend";

export const Web3Context = createContext({
  account: "",
  web3Auth: null,
  provider: null,
  balance: "",
  login: () => {},
  logout: () => {},
  getBalance: () => {},
});

const clientId =
  "BCFadhq6b_7lQhx_H-jr1jUDjJeIf4Oc2onszEpTU0UPVqEwV6Y-sGSbLUyOxi17FsGmiBh00KIjOmDT2LP5WYQ";

export const rpcUrl = "https://rpc-mumbai.maticvigil.com";
// "https://eth-mainnet.g.alchemy.com/v2/RO17kIgzkM0Ho40FjDYYI-ky8vnnAbKz";
export const chainId = "0x13881"; //"0x1";

const Web3AuthProvider = ({ children }) => {
  const { doLogin, doLogout } = useAuth();

  const [web3Auth, setWeb3Auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");

  const init = async () => {
    try {
      const web3auth = new Web3Auth({
        clientId: clientId, // Get your Client ID from Web3Auth Dashboard
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chainId, // Please use 0x5 for Goerli Testnet
          rpcTarget: rpcUrl,
        },
        // web3AuthNetwork: "cyan",
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
        web3AuthNetwork: "cyan",
      });
      // we can change the above settings using this function
      metamaskAdapter.setAdapterSettings({
        sessionTime: 86400, // 1 day in seconds
        chainConfig: {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: chainId,
          rpcTarget: rpcUrl,
        },
        // web3AuthNetwork: "cyan",
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

  const login = async () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    } else {
      try {
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
          console.log(nonceData);

          const signedMessage = await rpc.signMessage(nonceData.nonce);
          console.log(signedMessage);

          await doLogin({ requestId: nonceData.id, signature: signedMessage });
          setAccount(accounts);
        } else {
        }
        setAccount(accounts);
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
        setAccount("");
        setBalance("");
      } catch (err) {
        console.log(err);
        setProvider(null);
        setAccount("");
        setBalance("");
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
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3AuthProvider;
