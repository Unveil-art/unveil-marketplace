import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getArtworkById, putArtwork } from "lib/backend";

const Edit = ({ artwork }) => {
  console.log(artwork);

  const {
    register,
    handleSubmit: handleArtworkSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    colour: "White",
    border: "5x10",
  });

  const getActiveSize = sizes.find((item) => item.active)?.size;
  const [activeSize, setActiveSize] = useState(getActiveSize);
  const [editionPricing, setEditionPricing] = useState([]);
  const [editionPrice, setEditionPrice] = useState([]);
  const [editionType, setEditionType] = useState("NFT_Only");

  useEffect(() => {
    const getActiveSize = sizes.find((item) => item.active)?.size;
    setActiveSize(getActiveSize);
  }, [sizes]);

  const router = useRouter();

  const onSubmitForm = async (values, e) => {
    e.preventDefault();

    let editions;
    let activeSizes;
    let activePapers;
    let activeTechniques;

    if (values.edition_type !== "NFT_Only") {
      console.log("NOT NFT ONLY");
      console.log("NOT NFT ONLY");
      console.log("NOT NFT ONLY");
      console.log("NOT NFT ONLY");
      console.log("NOT NFT ONLY");
      editions = values.price.map((_, index) => ({
        id: artwork.editions[index].id,
        edition_id: artwork.editions[index].edition_id,
        collection_id: artwork.editions[index].collection_id,
        artwork_id: artwork.editions[index].artwork_id,
        paper: values.paper[index],
        frame: values.frame[index],
        technique: values.technique[index],
        price: parseInt(editionPrice[index]),
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
        editionType: editionType,
      };
      console.log(mergedValues);

      try {
        await putArtwork(value, mergedValues, artwork);
        router.push("/account");
      } catch (err) {
        console.error(err);
      }
    } else {
      editions = editionPricing.map((_, i) => ({
        id: artwork.editions[i].id,
        edition_id: artwork.editions[i].edition_id,
        collection_id: artwork.editions[i].collection_id,
        artwork_id: artwork.editions[i].artwork_id,
        price: parseInt(editionPrice[i]),
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
        editionType: editionType,
      };
      console.log(mergedValues);

      try {
        await putArtwork(value, mergedValues, artwork);
        router.push("/account");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <main className="bg-[#F0EDE4] ">
      <form
        onSubmit={handleArtworkSubmit(onSubmitForm)}
        className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between"
      >
        <div>
          <h1 className="lg:py-[120px] pt-[120px] pb-[60px]">Edit Artwork</h1>
          <CreateForm
            artwork={artwork}
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
          />
          <div className="hidden lg:grid grid-cols-2 mt-5 gap-[15px]">
            <button type="submit" className="btn btn-primary btn-lg btn-full">
              Create NFTs
            </button>
            <button className="btn btn-secondary btn-lg btn-full bg-unveilWhite">
              Save
            </button>
          </div>
        </div>

        <CreateSidebar artwork={artwork} errors={errors} register={register} />
        <div className="grid grid-cols-1 mt-5 gap-[15px] lg:hidden ">
          <button type="submit" className="btn btn-primary btn-lg btn-full">
            Create NFTs
          </button>
          <button className="btn btn-secondary btn-lg btn-full bg-unveilWhite">
            Save
          </button>
        </div>
      </form>
    </main>
  );
};

export default Edit;

export async function getServerSideProps({ params }) {
  const artwork = await getArtworkById(params.id);

  return {
    props: {
      artwork,
    },
  };
}
