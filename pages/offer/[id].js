import React, { useEffect, useState } from "react";
import { getOffer } from "lib/backend";
import { useRouter } from "next/router";
import useLocalStorage from "@/hooks/useLocalStorage";

const Details = () => {
  const [offer, setOffer] = useState();
  const [loading, setLoading] = useState(true);
  const { value: token } = useLocalStorage("token");
  const router = useRouter();

  const init = async () => {
    setLoading(true);
    try {
      const offerData = await getOffer(token, router.query.id);
      console.log(offerData);
      setOffer(offerData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      init();
    }
  }, [token]);

  return (
    <main className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between gap-5">
      <div className="lg:flex justify-center w-full mt-[120px]">
        <div className="max-w-2xl">
          <h1 className="lg:mb-20 mb-4">New offer</h1>
          <p className="s2 lg:mb-10 mb-8">
            Good news! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam consequat magna eu convallis malesuada. €2000 Ut semper semper
            orci at viverra. Quisque et leo sagittis, rutrum lorem dapibus,
          </p>
          <h2 className="b3 lg:mb-6 mb-3">Personal message</h2>
          <p className="b3 mb-8 lg:mb-10 max-w-[500px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean quis
            maximus urna. Nam nisl erat, sollicitudin et tellus sit amet
          </p>
          <div>
            <h2 className="b3 lg:mb-6 mb-3">Trade info</h2>
            <div className="w-full flex lg:mb-20 mb-10">
              <div className="w-1/2">
                <div className="mb-9 last:mb-0">
                  <h3 className="font-medium b3">Artist royalty</h3>
                  <p className="b3">7.5%</p>
                </div>
                <div className="mb-9 last:mb-0">
                  <h3 className="font-medium b3">Price paid</h3>
                  <p className="b3">€999</p>
                </div>
                <div className="mb-9 last:mb-0">
                  <h3 className="font-medium b3">Buyer name</h3>
                  <p className="b3">@realleonardodicaprio</p>
                </div>
              </div>
              <div className="w-1/2">
                <div className="mb-9 last:mb-0">
                  <h3 className="font-medium b3">Platform fee</h3>
                  <p className="b3">2%</p>
                </div>
                <div className="mb-9 last:mb-0">
                  <h3 className="font-medium b3">Price increase</h3>
                  <p className="b3">200%</p>
                </div>
              </div>
            </div>
            <div className="flex">
              <button className="w-1/2 btn btn-lg btn-secondary mr-5">
                Reject offer
              </button>
              <button className="w-1/2 btn btn-lg btn-primary">
                Accept offer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:min-w-[400px] lg:max-w-[460px] mt-10 lg:mt-[120px] relative">
        <div className="w-full lg:sticky lg:top-[120px]">
          <div className="w-full h-[526px] bg-[#F0EDE4] flex justify-center items-center mb-4">
            <div className="bg-unveilWhite w-full max-w-[220px] h-[300px] border-[#3F3030] shadow p-0"></div>
          </div>
          <p className="text-center">Artwork Name</p>
          <p className="text-unveilGrey text-center">Alexander Sporre</p>
        </div>
      </div>
    </main>
  );
};

export default Details;

export async function getServerSideProps({ params }) {
  return {
    props: {},
  };
}
