import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
  getArtworkById,
  putArtwork,
  uploadJSON,
  createNFT,
  postTransaction,
  getCurrentExchangeRateUSDETH,
  getCurrentExchangeRateETHUSD,
} from "lib/backend";
import { Web3Context } from "@/contexts/Web3AuthContext";
import { FACTORY_ABI, FACTORY_CONTRACT_ADDRESS } from "lib/constants";
import RPC from "lib/RPC";
import Loader from "@/components/svg/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatingNFT from "@/components/section/create-page/CreatingNFT";

const Edit = ({ artwork }) => {
  const { provider, convertWei } = useContext(Web3Context);

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
    colour: "Black",
    border: "5x10",
  });

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
        FACTORY_CONTRACT_ADDRESS
      );

      const json = await uploadJSON(value, {
        name,
        description,
        image: artwork.media_url,
      });

      let gas = await rpc.getGasPrice();

      try {
        const tx = await contract.methods
          .create(
            name,
            name,
            json.data,
            1689445800, // endTimeStamp need to have higher value
            [
              "0x3ED87449591524deF3A2f9aeA247dcD3BD38687f", // replace this with curator wallet associated with artwork
              1000, // replace this with curator percentage
              1685099478, // replace this timestamp with curator commission date
              1000, // first royalty percentage
              2000, // second royalty percentage
              1685196478, // second royalty threshold time
            ]
          )
          .send({ from: accounts, gasPrice: gas });

        const nft = await createNFT(
          value,
          {
            contract_address: tx.events[0].address,
            json_uri: json.data,
          },
          artwork.id
        );

        await postTransaction(value, {
          transaction_hash: tx.transactionHash,
          amount: parseInt(convertWei(String(tx.gasUsed))),
          currency: "ETH",
          transaction_type: "DEPLOY_ARTWORK",
          chain_link: process.env.NEXT_PUBLIC_CHAIN_LINK,
          artwork_id: artwork.id,
        });

        router.push("/account");
        setCreating(false);
      } catch (error) {
        console.log(JSON.stringify(error));
        notify(error.message);
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
      const ethEx = await getCurrentExchangeRateUSDETH();

      editionPricing.map((_, i) => {
        if (i < artwork.editions.length) {
          editions.push({
            id: artwork.editions[i].id,
            edition_id: artwork.editions[i].edition_id,
            collection_id: artwork.editions[i].collection_id,
            artwork_id: artwork.editions[i].artwork_id,
            paper: values.paper[i],
            frame: values.frame[i],
            technique: values.technique[i],
            price: editionPricing[i].eth
              ? parseFloat(editionPricing[i].eth)
              : parseFloat(
                  parseFloat(
                    parseFloat(editionPricing[i].usd) * ethEx.ETH
                  ).toFixed(4)
                ),
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
      const ethEx = await getCurrentExchangeRateUSDETH();

      editionPricing.map((_, i) => {
        if (i < artwork.editions.length) {
          editions.push({
            id: artwork.editions[i].id,
            edition_id: artwork.editions[i].edition_id,
            collection_id: artwork.editions[i].collection_id,
            artwork_id: artwork.editions[i].artwork_id,
            price: editionPricing[i].eth
              ? parseFloat(editionPricing[i].eth)
              : parseFloat(
                  parseFloat(
                    parseFloat(editionPricing[i].usd) * ethEx.ETH
                  ).toFixed(4)
                ),
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
        <div className="flex justify-center w-full">
          <div>
            <h1 className="lg:py-[120px] text-[90px] pt-[120px] pb-[60px]">
              Edit Artwork
            </h1>
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
              <p
                onClick={() => handleCreateNFT()}
                className="text-center cursor-pointer btn btn-primary btn-lg btn-full"
              >
                Create NFTs
              </p>
            </div>
          </div>
        </div>

        <CreateSidebar
          artwork={artwork}
          errors={errors}
          register={register}
          description={description}
          setDescription={setDescription}
          editionType={editionType}
          frame={frame}
        />
        <div className="grid grid-cols-1 mt-5 gap-[15px] lg:hidden ">
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
          <p
            onClick={() => handleCreateNFT()}
            className="text-center cursor-pointer btn btn-primary btn-lg btn-full"
          >
            Create NFTs
          </p>
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
