import React from "react";
import { useRouter } from "next/router";

const Push = () => {
  const router = useRouter();

  router.push("/login");
  return <div className="flex items-center justify-center">Redirecting...</div>;
};

export default Push;
