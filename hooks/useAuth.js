import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";

export function useAuth() {
  const router = useRouter();
  const { setValue, removeValue } = useLocalStorage("token");

  async function doLogin(_data) {
    const { data } = await axios({
      method: "POST",
      url: `https://marketplace-backend-dev.unveil.art/api/v1/auth/login`,
      data: _data,
      withCredentials: true,
    });
    setValue(data.accessToken);
    console.log(data, "login response");
    router.push("/account");
  }

  const doLogout = async () => {
    await axios({
      method: "POST",
      url: "https://marketplace-backend-dev.unveil.art/api/v1/auth/logout",
      withCredentials: true,
    });
    removeValue();
    router.push("/");
  };

  return { doLogin, doLogout };
}