import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  postArtwork,
  uploadImage,
  getCurrentExchangeRateUSDETH,
} from "lib/backend";
import Loader from "@/components/svg/Loader";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import useIsAuthenticated from "@/hooks/useIsAuthenticated";

const Create = () => {
  const {
    register,
    handleSubmit: handleArtworkSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const notify = (message) => showTopStickyNotification("error", message);

  const { authenticated } = useIsAuthenticated();

  const { value } = useLocalStorage("token");

  const [sizes, setSizes] = useState([
    { active: false, size: "5x10" },
    { active: false, size: "10x15" },
    { active: false, size: "20x30" },
    { active: true, size: "30x40" },
    { active: true, size: "60x40" },
    { active: false, size: "60x50" },
    { active: true, size: "100x80" },
    { active: false, size: "100x90" },
    { active: false, size: "110x60" },
  ]);
  const [papers, setPapers] = useState([
    { active: true, paper: "Hahnemühle German Etching" },
  ]);
  const [techniques, setTechniques] = useState([
    { active: true, technique: "Archival pigment print" },
  ]);
  const [frame, setFrame] = useState({
    frame: "Oak",
    size: "2mm",
    colour: "Black",
    border: "5x10",
  });
  const [editionPrice, setEditionPrice] = useState([]);

  useEffect(() => {
    const inactiveSizes = sizes
      .filter((size) => !size.active)
      .map((size) => size.size);

    if (inactiveSizes.length > 0) {
      setEditionPricing((prevEditionPrice) =>
        prevEditionPrice.filter((price) => !inactiveSizes.includes(price))
      );
    }
  }, [sizes]);

  useEffect(() => {
    const getActiveSize = sizes.find((item) => item.active)?.size;
    setActiveSize(getActiveSize);
  }, [sizes]);

  const [activeSize, setActiveSize] = useState(
    sizes.find((item) => item.active)?.size
  );

  const [editionPricing, setEditionPricing] = useState([
    { activeSize, eth: null, usd: null },
  ]);
  const [editionType, setEditionType] = useState("NFT_Only");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    setLoading(true);
    let editions;
    let activeSizes;
    let activePapers;
    let activeTechniques;

    if (values.edition_type !== "NFT_Only") {
      const ethEx = await getCurrentExchangeRateUSDETH();

      editions = values.price.map((_, index) => ({
        paper: values.paper[index],
        frame: values.frame[index],
        technique: values.technique[index],
        price: editionPricing[index].eth
          ? parseFloat(editionPricing[index].eth)
          : parseFloat(
              parseFloat(
                parseFloat(editionPricing[index].usd) * ethEx.ETH
              ).toFixed(4)
            ),
        size: editionPricing[index],
        json_uri: null,
        max_copies: 1,
        token_id: null,
        transaction_hash: null,
      }));

      activeSizes = sizes
        .filter((item) => item.active)
        .map((item) => item.size);

      activePapers = papers
        .filter((item) => item.active)
        .map((item) => item.paper);

      activeTechniques = techniques
        .filter((item) => item.active)
        .map((item) => item.technique);

      const mergedValues = {
        ...values,
        editions: editions,
        sizes: activeSizes,
        papers: activePapers,
        techniques: activeTechniques,
      };

      try {
        const mainImage = await uploadImage(value, values.mainImage[0]);
        const data = await postArtwork(value, mergedValues, mainImage);

        setLoading(false);
        const id = data.data.id;
        if (id) {
          router.push(`/artworks/${id}`);
        }
      } catch (err) {
        setLoading(false);
        notify(err.message);
        console.log("error", err.message);
      }
    } else {
      const ethEx = await getCurrentExchangeRateUSDETH();

      editions = editionPricing.map((_, index) => ({
        price: editionPricing[index].eth
          ? parseFloat(editionPricing[index].eth)
          : parseFloat(
              parseFloat(
                parseFloat(editionPricing[index].usd) * ethEx.ETH
              ).toFixed(4)
            ),
        paper: null,
        frame: null,
        technique: null,
        size: null,
        json_uri: null,
        max_copies: 1,
        token_id: null,
        transaction_hash: null,
      }));

      const mergedValues = {
        ...values,
        editions: editions,
      };

      try {
        const mainImage = await uploadImage(value, values.mainImage[0]);
        const data = await postArtwork(value, mergedValues, mainImage);

        setLoading(false);
        const id = data.data.id;
        if (id) {
          router.push(`/artworks/${id}`);
        }
      } catch (err) {
        setLoading(false);
        notify(err.message);
        console.log("error", err.message);
      }
    }
  };

  return (
    <main className="bg-[#F0EDE4] ">
      <form
        onSubmit={handleArtworkSubmit(onSubmitForm)}
        className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between"
      >
        <div className="flex justify-center w-full">
          <div>
            <h1 className="lg:py-[120px] text-[90px] pt-[120px] pb-[60px]">
              Add Artwork
            </h1>
            <CreateForm
              editionPrice={editionPrice}
              setEditionPrice={setEditionPrice}
              setEditionPricing={setEditionPricing}
              editionPricing={editionPricing}
              setActiveSize={setActiveSize}
              activeSize={activeSize}
              frame={frame}
              setFrame={setFrame}
              techniques={techniques}
              setTechniques={setTechniques}
              papers={papers}
              setPapers={setPapers}
              sizes={sizes}
              setSizes={setSizes}
              errors={errors}
              register={register}
              reset={reset}
              editionType={editionType}
              setEditionType={setEditionType}
              name={name}
              setName={setName}
            />
            <div className="hidden lg:grid grid-cols-1 mt-5 gap-[15px]">
              <button
                disabled={loading}
                type="submit"
                className="btn btn-primary btn-lg btn-full"
              >
                {loading && (
                  <div className="flex justify-center h-[25px] items-center animate-spin">
                    <Loader color="#F6F4ED" />
                  </div>
                )}
                {!loading && <p>Save</p>}
              </button>
            </div>
          </div>
        </div>

        <CreateSidebar
          errors={errors}
          register={register}
          description={description}
          setDescription={setDescription}
          editionType={editionType}
          frame={frame}
        />
        <div className="grid grid-cols-1 mt-5 gap-[15px] lg:hidden ">
          {/* <p
            onClick={() => handleCreateNFT()}
            className="text-center btn btn-primary btn-lg btn-full"
          >
            Create NFTs
          </p> */}
          <button
            disabled={loading}
            type="submit"
            className="btn btn-primary btn-lg btn-full"
          >
            {loading && (
              <div className="flex justify-center h-[25px] items-center animate-spin">
                <Loader color="F7F4ED" />
              </div>
            )}
            {!loading && <p>Save</p>}
          </button>
        </div>
      </form>
    </main>
  );
};

export default Create;
