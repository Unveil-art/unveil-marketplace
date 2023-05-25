import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../hooks/useLocalStorage";
import { postArtworks, uploadImage } from "lib/backend";

const Create = () => {
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

  const getFirstActivePaper = papers.find((item) => item.active);
  const getFirstTechniques = techniques.find((item) => item.active);
  const getActiveSize = sizes.find((item) => item.active)?.size;
  const [activeSize, setActiveSize] = useState(getActiveSize);
  const [editionPricing, setEditionPricing] = useState([activeSize]);
  const [editionPrice, setEditionPrice] = useState([]);

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    let editions;
    let activeSizes;
    let activePapers;
    let activeTechniques;
    if (values.edition_type !== "NFT only") {
      editions = values.frame.map((_, index) => ({
        paper: values.paper[index],
        frame: values.frame[index],
        technique: values.technique[index],
        price: editionPrice[index],
        size: editionPricing[index],
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

      const mainImage = await uploadImage(value, values.mainImage[0]);
      const detailShotImage1 = await uploadImage(
        value,
        values.detailShotImage1[0]
      );
      const detailShotImage2 = await uploadImage(
        value,
        values.detailShotImage2[0]
      );
      console.log(mergedValues);
      await postArtworks(
        value,
        mergedValues,
        mainImage,
        detailShotImage1,
        detailShotImage2
      );

      return;
    }
    editions = values.frame.map((_, index) => ({
      price: editionPrice[index],
    }));

    const mergedValues = {
      ...values,
      editions: editions,
    };

    // await postArtworks(value, mergedValues);
  };

  return (
    <main className="bg-[#F0EDE4] ">
      <form
        onSubmit={handleArtworkSubmit(onSubmitForm)}
        className="pb-[120px] px-[15px] md:px-10 lg:flex justify-between"
      >
        <div>
          <h1 className="lg:py-[120px] pt-[120px] pb-[60px]">Add Artwork</h1>
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

        <CreateSidebar errors={errors} register={register} />
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

export default Create;
