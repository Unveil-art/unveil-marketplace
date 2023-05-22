import React, { useState } from "react";
import { useForm } from "react-hook-form";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../hooks/useLocalStorage";

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

  const onSubmitForm = async (values, e) => {
    e.preventDefault();

    if (values.edition_type !== "NFT only") {
      const activeSizes = sizes
        .filter((item) => item.active)
        .map((item) => item.size);

      const activePapers = papers
        .filter((item) => item.active)
        .map((item) => item.paper);

      const activeTechniques = techniques
        .filter((item) => item.active)
        .map((item) => item.technique);

      const mergedValues = {
        ...values,
        sizes: activeSizes,
        papers: activePapers,
        techniques: activeTechniques,
      };
      console.log(mergedValues);
      return;
    }

    console.log(values);
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

        {/* <CreateSidebar errors={errors} register={register} /> */}
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
