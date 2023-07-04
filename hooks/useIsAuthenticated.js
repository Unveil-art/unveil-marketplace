import { Web3Context } from "@/contexts/Web3AuthContext";
import { getUserMe } from "lib/backend";
import { useState, useEffect, useContext } from "react";

const useIsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(true);
  const { logout } = useContext(Web3Context);
  const fetUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const data = await getUserMe(token);
      if (data.statusCode === 401) {
        setAuthenticated(false);
        logout();
      }
    } else {
      setAuthenticated(false);
    }
  };

  useEffect(() => {
    fetUser();
  }, []);
  return {
    authenticated,
  };
};

export default useIsAuthenticated;
