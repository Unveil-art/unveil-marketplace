import React, { useContext, useState, useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { useForm } from "react-hook-form";

const AskEmail = () => {
  const { login, logout, email, setEmail } = useContext(Web3Context);

  const {
    register,
    handleSubmit: handleArtworkSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    login(values.email);
    setEmail(false);
  };

  if (email) {
    return (
      <section className="fixed top-0 left-0 z-50 w-screen h-screen bg-[rgba(0,0,0,0.4)]">
        <form
          onSubmit={handleArtworkSubmit(onSubmitForm)}
          className="absolute p-10 w-[calc(100%-30px)] md:w-[600px] rounded-[30px] -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 bg-unveilWhite"
        >
          <p className="b3">Enter email to continue</p>
          <div>
            <input
              type="text"
              className="mt-2 input"
              name="email"
              id="email"
              placeholder="Email"
              {...register("email", {
                required: "Required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email",
                },
              })}
            />
            <p
              className={`text-red-500 opacity-0 b5 absolute bottom-2 left-5 ${
                errors.email?.message ? "opacity-100" : ""
              }`}
            >
              {errors.email?.message}
            </p>
          </div>

          <button className="w-full btn btn-primary btn-lg mt-[5px] md:mt-[15px] mb-[30px]">
            Submit
          </button>
          <p
            onClick={() => logout()}
            className="mx-auto underline cursor-pointer b3 w-fit underline-offset-1 decoration-1"
          >
            Cancel
          </p>
        </form>
      </section>
    );
  }
};

export default AskEmail;
