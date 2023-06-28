import axios from "axios";
import { useRouter } from "next/router";
import useLocalStorage from "./useLocalStorage";

export function useAuth() {
  const router = useRouter();
  const { setValue, removeValue } = useLocalStorage("token");

  async function doLogin(_data) {
    const { data } = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
      data: _data,
      withCredentials: true,
    });
    setValue(data.accessToken);
    console.log(data, "login response");
    if (data?.user?.role === "artist") router.push("/account");
    else router.push("/gallery");
  }

  const doLogout = async () => {
    await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
      withCredentials: true,
    });
    removeValue();
    router.push("/");
  };

  return { doLogin, doLogout };
}
