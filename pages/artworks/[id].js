import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getArtworkById, putArtwork, uploadJSON, createNFT } from "lib/backend";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { FACTORY_ABI } from "lib/constants";
import RPC from "lib/RPC";
import Loader from "@/components/svg/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatingNFT from "@/components/section/create-page/CreatingNFT";

const Edit = ({ artwork }) => {
  const { provider } = useContext(Web3Context);
  const notify = (message) => toast.error(message);
  const {
    register,
    handleSubmit: handleArtworkSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      collectionId: artwork.collection_id,
    },
  });
  const router = useRouter();

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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleCreateNFT = async () => {
    if (provider) {
      setCreating(true);
      const rpc = new RPC(provider);
      const accounts = await rpc.getAccounts();
      const contract = await rpc.getContract(
        FACTORY_ABI,
        process.env.NEXT_PUBLIC_FACTORY_ADDRESS
      );

      const json = await uploadJSON(value, {
        name,
        description,
        image: artwork.media_url,
      });

      let gas = await rpc.getGasPrice();

      try {
        const tx = await contract.methods
          .create(name, name, json.data, 1685196478, [
            "0x3ED87449591524deF3A2f9aeA247dcD3BD38687f",
            1000,
            1685099478,
            1000,
            2000,
            1685196478,
          ])
          .send({ from: accounts, gasPrice: gas });

        const x = await createNFT(
          value,
          {
            contract_address: tx.events[0].address,
            json_uri: json.data,
          },
          artwork.id
        );

        router.push("/account");
        setCreating(false);
      } catch (error) {
        console.log(JSON.stringify(error));
        notify(error.data.message);
        setCreating(false);
      }
    }
  };

  useEffect(() => {
    if (!artwork.is_draft) {
      router.push("/account");
    }
  }, [artwork.is_draft]);

  useEffect(() => {
    const getActiveSize = sizes.find((item) => item.active)?.size;
    setActiveSize(getActiveSize);
  }, [sizes]);

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    setLoading(true);

    let editions = [];
    let activeSizes;
    let activePapers;
    let activeTechniques;

    if (values.edition_type !== "NFT_Only") {
      editionPricing.map((_, i) => {
        console.log(editionPricing);
        console.log(artwork.editions);
        if (i < artwork.editions.length) {
          editions.push({
            id: artwork.editions[i].id,
            edition_id: artwork.editions[i].edition_id,
            collection_id: artwork.editions[i].collection_id,
            artwork_id: artwork.editions[i].artwork_id,
            paper: values.paper[i],
            frame: values.frame[i],
            technique: values.technique[i],
            price: parseInt(editionPrice[i]),
            size: editionPricing[i],
            max_copies: 1,
          });
        } else {
          editions.push({
            price: parseInt(editionPrice[i]),
            paper: null,
            frame: null,
            technique: null,
            size: null,
            max_copies: 1,
          });
        }
      });

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

      try {
        await putArtwork(value, mergedValues, artwork);
        router.push("/account");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
        notify(err.message);
      }
    } else {
      editionPricing.map((_, i) => {
        if (i < artwork.editions.length) {
          editions.push({
            id: artwork.editions[i].id,
            edition_id: artwork.editions[i].edition_id,
            collection_id: artwork.editions[i].collection_id,
            artwork_id: artwork.editions[i].artwork_id,
            price: parseInt(editionPrice[i]),
            paper: null,
            frame: null,
            technique: null,
            size: null,
            max_copies: 1,
          });
        } else {
          editions.push({
            price: parseInt(editionPrice[i]),
            paper: null,
            frame: null,
            technique: null,
            size: null,
            max_copies: 1,
          });
        }
      });

      const mergedValues = {
        ...values,
        editions: editions,
        editionType: editionType,
      };

      try {
        await putArtwork(value, mergedValues, artwork);
        router.push("/account");
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
        notify(err.message);
      }
    }
  };
  return (
    <main className="bg-[#F0EDE4] ">
      <ToastContainer />
      {creating && <CreatingNFT />}
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
            name={name}
            setName={setName}
          />
          <div className="hidden lg:grid grid-cols-2 mt-5 gap-[15px]">
            <p
              onClick={() => handleCreateNFT()}
              className="text-center cursor-pointer btn btn-primary btn-lg btn-full"
            >
              Create NFTs
            </p>
            <button
              type="submit"
              className="btn btn-secondary btn-lg btn-full bg-unveilWhite"
            >
              {loading && (
                <div className="flex justify-center h-[25px] items-center animate-spin">
                  <Loader />
                </div>
              )}
              {!loading && <p>Save</p>}
            </button>
          </div>
        </div>

        <CreateSidebar
          artwork={artwork}
          errors={errors}
          register={register}
          description={description}
          setDescription={setDescription}
        />
        <div className="grid grid-cols-1 mt-5 gap-[15px] lg:hidden ">
          <p
            onClick={() => handleCreateNFT()}
            className="text-center cursor-pointer btn btn-primary btn-lg btn-full"
          >
            Create NFTs
          </p>
          <button
            type="submit"
            className="btn btn-secondary btn-lg btn-full bg-unveilWhite"
          >
            {loading && (
              <div className="flex justify-center h-[25px] items-center animate-spin">
                <Loader />
              </div>
            )}
            {!loading && <p>Save</p>}
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
