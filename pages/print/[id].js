import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import Loader from "@/components/svg/Loader";
import Image from "next/image";
import { getArtworkById, getArtworks, getCurrentExchangeRateETHUSD, getEditionById } from "lib/backend";
import { useEffect } from "react";

const PrintNft = ({ edition }) => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:{
      firstName: edition?.buyer?.firstName,
      lastName:edition?.buyer?.lastName
    }
  });

  const handlePrice = async () => {
      const res = await getCurrentExchangeRateETHUSD();
      setPrice((res.USD * edition.shipping_price).toFixed(2));
  };

  const onSubmitForm = (data) => {
    console.log(data,"edition")
  };

  useEffect(() => {
    if(edition){
      handlePrice();
    }
  },[edition])

  return (
    <main className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between gap-5">
      <div className="lg:flex justify-center w-full mt-[120px]">
        <div className="lg:max-w-2xl">
          <h1 className="lg:mb-20 mb-4">Print NFT</h1>
          <p className="s2 lg:mb-10 mb-8">
            Good news! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam consequat magna eu convallis malesuada. €2000 Ut semper semper
            orci at viverra. Quisque et leo sagittis, rutrum lorem dapibus,
          </p>
          <h2 className="b3 lg:mb-6 mb-5">Shipping address</h2>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className="grid grid-cols-2 mb-[15px] md:gap-x-[15px] gap-x-2 ">
              <div className="relative">
                <input
                  placeholder="First name"
                  className="input"
                  type="text"
                  name="firstName"
                  {...register("firstName", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.firstName?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.firstName?.message}
                </p>
              </div>

              <div className="relative">
                <input
                  placeholder="Last name"
                  className="input"
                  type="text"
                  name="lastName"
                  {...register("lastName", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.lastName?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.lastName?.message}
                </p>
              </div>
            </div>

            <div className="relative mb-[15px]">
              <input
                placeholder="Street and house number"
                className="input"
                name="address"
                type="text"
                {...register("address", {
                  required: "Required",
                })}
              />
              <p
                className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                  errors.address?.message ? "opacity-100" : ""
                }`}
              >
                {errors.address?.message}
              </p>
            </div>

            <div className="grid grid-cols-2 mb-[15px] md:gap-x-[15px] gap-x-2 ">
              <div className="relative">
                <input
                  placeholder="Postal code"
                  className="input"
                  type="text"
                  name="postalCode"
                  {...register("postalCode", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.postalCode?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.postalCode?.message}
                </p>
              </div>

              <div className="relative">
                <input
                  placeholder="City"
                  className="input"
                  type="text"
                  name="city"
                  {...register("city", {
                    required: "Required",
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                    errors.city?.message ? "opacity-100" : ""
                  }`}
                >
                  {errors.city?.message}
                </p>
              </div>
            </div>

            <div className="relative mb-[15px]">
              <select
                className="select-input"
                name="country"
                {...register("country", {
                  required: "Required",
                })}
              >
                <option value="" disabled selected>
                  Country
                </option>
                <option>The Netherlands</option>
                <option>United Kingdom</option>
              </select>

              <p
                className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                  errors.country?.message ? "opacity-100" : ""
                }`}
              >
                {errors.country?.message}
              </p>
            </div>

            <div className="relative mb-14">
              <input
                placeholder="Phone"
                className="input"
                name="phone"
                type="tel"
                {...register("phone", {
                  required: "Required",
                })}
              />
              <p
                className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                  errors.phone?.message ? "opacity-100" : ""
                }`}
              >
                {errors.phone?.message}
              </p>
            </div>

            <div className="">
              <div className="w-full border-t border-unveilBlack flex justify-between items-center h5 py-4">
                <div>Insured carbon Neutral shipping</div>
                <div>${price}</div>
              </div>

              <div className="w-full border-t-2 border-unveilBlack flex justify-between items-center h5 pt-1.5">
                <div>Total costs</div>
                <div className="s2">${price}</div>
              </div>
            </div>

            <button
              className="flex items-center justify-center mt-10 mb-10 btn btn-primary btn-lg btn-full md:btn-wide"
              type="submit"
            >
              {loading && (
                <div className="h-[25px] animate-spin flex items-center">
                  <Loader color="#F6F4ED" />
                </div>
              )}
              {!loading && <>Request Print</>}
            </button>
          </form>
          <div className="rounded-[10px] overflow-hidden flex h-[67px] items-center bg-bgColor w-full">
            <div className="aspect-[1/1] mr-4 w-[67px] relative">
              <Image
                src="/images/Nick_Fancher.png"
                alt="Nick Fancher"
                fill={true}
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
            <div>
              <p className="b4">
                <b className="font-medium">Get help</b> with printing your
                artiece
              </p>
              <p className="b5 leading-tight">
                Explore the posibilities with NFTs and prints
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:min-w-[400px] lg:max-w-[460px] mt-10 lg:mt-[120px] relative">
        <div className="w-full lg:sticky lg:top-[120px]">
          <div className="w-full h-[526px] bg-[#F0EDE4] flex justify-center items-center mb-4">
            <div className="bg-unveilWhite w-full max-w-[220px] h-[300px] border-[#3F3030] shadow p-0 relative">
            <Image
                src={edition?.artwork?.media_url}
                alt="Nick Fancher"
                fill={true}
                style={{ objectFit: "contain" }}
                priority
                className="relative"
              />
            </div>
          </div>
          <p className="text-center">{edition.artwork?.name}</p>
          <p className="text-unveilGrey text-center">{edition?.owner?.firstName} {edition?.owner?.lastName}</p>
        </div>
      </div>
    </main>
  );
};

export default PrintNft;

export async function getServerSideProps({ params }) {
  const edition = await getEditionById(params.id);

  return {
    props: {
      edition,
    },
  };
}