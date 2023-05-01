import React from "react";
import Link from "next/link";

import Title from "@/components/reusable/Title";

const Login = () => {
  return (
    <main className="h-screen pt-[120px]">
      <Title title="Login" />
      <form className="ml-[40px] mt-[120px] md:ml-[35svw] pr-[15px] md:pr-10 max-w-[640px]">
        <input type="text" name="name" placeholder="Name" className="input" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input mt-[10px] mb-5"
        />
        <div className="flex justify-between">
          <Link className="underline underline-offset-2" href="forgot-password">
            Forgot password
          </Link>
          <Link className="underline underline-offset-2" href="create-account">
            Create account
          </Link>
        </div>
        <button
          className="btn btn-lg mt-[60px] btn-primary btn-wide"
          type="submit"
        >
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
