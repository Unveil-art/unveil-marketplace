import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Delete from "@/components/svg/Delete";

import {
  getUsers,
  uploadImage,
  postCollection,
  getCollection,
} from "lib/backend";
import useLocalStorage from "../../../hooks/useLocalStorage";

const CreateForm = ({
  editionPrice,
  setEditionPrice,
  setEditionPricing,
  editionPricing,
  setActiveSize,
  activeSize,
  errors,
  register,
  reset,
  sizes,
  setSizes,
  papers,
  setPapers,
  techniques,
  setTechniques,
  frame,
  setFrame,
}) => {
  const [openCollection, setOpenCollection] = useState(false);
  const [collectionImage, setCollectionImage] = useState(null);
  const [curatorNames, setCuratorNames] = useState([]);
  const [collections, setCollections] = useState([]);
  const [royalties, setRoyalties] = useState([
    { from: "First 12 months", percentage: "15%" },
  ]);
  const [editionType, setEditionType] = useState("NFT only");

  const [sizeOpen, setSizeOpen] = useState(false);
  const [customSizeInput, setCustomSizeInput] = useState("");

  const [paperOpen, setPaperOpen] = useState(false);
  const [customPaperInput, setCustomPaperInput] = useState("");

  const [techniqueOpen, setTechniqueOpen] = useState(false);
  const [customTechniqueInput, setCustomTechniqueInput] = useState("");

  const [frameOpen, setFrameOpen] = useState(false);
  const frameOptions = ["Oak", "option 2", "option 3"];
  const sizeOptions = ["2mm", "3mm", "5mm"];
  const colourOptions = ["White", "Black"];
  const borderOptions = ["None", "5x10", "10x20"];

  const { value } = useLocalStorage("token");

  const defaultRoyalties = { from: "After 12 months", percentage: "15%" };

  const {
    register: registerColl,
    handleSubmit: handleCollectionSubmit,
    formState: { errors: errorColl },
    reset: resetColl,
    watch,
  } = useForm();

  const curatorValue = watch("curator");

  const handleEditionTypeChange = (event) => {
    setEditionType(event.target.value);
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers(value);
      const extractedCurators = data.map((user) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
      }));
      setCuratorNames(extractedCurators);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCollection = async () => {
    try {
      const data = await getCollection(value);
      const extractedCollections = data.map((collection) => ({
        id: collection.id,
        title: collection.title,
      }));
      setCollections(extractedCollections);

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  useEffect(() => {
    if (openCollection) {
      fetchUsers();
      console.log(curatorNames);
    }
  }, [openCollection]);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setCollectionImage(file);
  };

  const handleRemoveImage = (setState) => {
    setState(null);
  };

  const handleDeleteRow = (index, setState, edition = false) => {
    setState((prev) => {
      if (edition && prev.length === 1) {
        return prev;
      } else {
        const updated = prev.filter((_, i) => i !== index);
        reset({ shouldDirty: true, shouldUnregister: true });
        return updated;
      }
    });
  };

  const isFieldRequired = (dependentFieldValue) => {
    return dependentFieldValue ? "This field is required" : false;
  };

  const onSubmitForm = async (values, e) => {
    e.preventDefault();

    const image = await uploadImage(value, values.imageCollection[0]);

    await postCollection(value, values, image.data);
    await fetchCollection();

    resetColl();
    setCollectionImage(null);
    setOpenCollection(false);
  };

  const handleChangePrice = (value, index) => {
    setEditionPrice((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = value;
      return updatedItems;
    });
  };
  const handleActive = (i, setState) => {
    setState((prevItems) => {
      const updated = [...prevItems];
      updated[i].active = !updated[i].active;
      return updated;
    });
  };
  const handleCustomSize = (custom, setState) => {
    const sizeRegex = /^\d+x\d+$/;

    if (custom && sizeRegex.test(custom)) {
      setState((prevSizes) => [...prevSizes, { active: true, size: custom }]);
    }
  };
  const handleCustomPaper = (custom, setState) => {
    if (custom) {
      setState((prevSizes) => [...prevSizes, { active: true, paper: custom }]);
    }
  };
  const handleCustomTechnique = (custom, setState) => {
    if (custom) {
      setState((prevSizes) => [
        ...prevSizes,
        { active: true, technique: custom },
      ]);
    }
  };

  return (
    <div className="w-full lg:w-[710px] space-y-[15px] lg:space-y-5">
      {/* Basic info */}
      <div className="bg-[#F9F7F2] relative p-5 lg:pb-[30px] rounded-[10px] space-y-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3">Basic information</p>
        <input
          type="text"
          className="input"
          name="name"
          id="name"
          placeholder="Artwork name"
          {...register("name", {
            required: "Required",
          })}
        />
        <select
          className="select-input"
          name="year"
          id="year"
          {...register("year", {
            required: "Required",
          })}
        >
          {Array.from(
            { length: new Date().getFullYear() - 1990 + 1 },
            (_, index) => (
              <option key={index} value={new Date().getFullYear() - index}>
                {new Date().getFullYear() - index}
              </option>
            )
          )}
        </select>
        <p
          className={`text-red-500 opacity-0 b5 absolute bottom-2 left-5 ${
            errors.name?.message ? "opacity-100" : ""
          }`}
        >
          {errors.name?.message}
        </p>
      </div>

      {/* Editions */}
      <div className="bg-[#F9F7F2] rounded-[10px] space-y-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3 pt-5 px-5">Editions</p>
        <div className="grid grid-cols-3 pb-[15px] px-5">
          <div>
            <input
              className="radio-block left"
              type="radio"
              name="edition_type"
              id="nft-print"
              value="NFT backed by print"
              checked={editionType === "NFT backed by print"}
              {...register("edition_type", {
                onChange: (e) => {
                  handleEditionTypeChange(e);
                },
              })}
            />
            <label htmlFor="nft-print">NFT backed by print</label>
          </div>
          <div>
            <input
              className="radio-block"
              type="radio"
              name="edition_type"
              id="nft"
              value="NFT only"
              checked={editionType === "NFT only"}
              {...register("edition_type", {
                onChange: (e) => {
                  handleEditionTypeChange(e);
                },
              })}
            />
            <label htmlFor="nft">NFT Only</label>
          </div>
          <div>
            <input
              className="radio-block right"
              type="radio"
              name="edition_type"
              id="print"
              value="Print only"
              checked={editionType === "Print only"}
              {...register("edition_type", {
                onChange: (e) => {
                  handleEditionTypeChange(e);
                },
              })}
            />
            <label htmlFor="print">Print only</label>
          </div>
        </div>
        {editionType !== "NFT only" && (
          <>
            <div className=" px-5 py-[15px] border-t border-[#DBDED6]">
              <div className="flex items-start justify-between ">
                <div>
                  <p className="mb-[15px] b3">Sizes</p>
                  <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                    {sizes.map((item, i) => {
                      if (!sizeOpen) {
                        if (item.active) {
                          return (
                            <span
                              key={i}
                              className="border rounded-full px-[15px] border-unveilDrakGray"
                            >
                              {item.size}
                            </span>
                          );
                        }
                      } else {
                        return (
                          <span
                            key={i}
                            onClick={() => handleActive(i, setSizes)}
                            className={`${
                              item.active
                                ? "border-unveilBlack"
                                : "border-unveilDrakGray"
                            } border rounded-full px-[15px] cursor-pointer`}
                          >
                            {item.size}
                          </span>
                        );
                      }
                    })}
                    {!sizeOpen && (
                      <span
                        onClick={() => setSizeOpen(!sizeOpen)}
                        className="cursor-pointer bg-[#DBDED6] px-[10px] rounded-full"
                      >
                        +
                      </span>
                    )}
                  </div>
                </div>
                <p
                  onClick={() => setSizeOpen(!sizeOpen)}
                  className="items-center cursor-pointer btn btn-opacity flex  h-[66px] btn-lg"
                >
                  {sizeOpen ? "Save" : "Edit"}
                </p>
              </div>
              {sizeOpen && (
                <div>
                  <label
                    htmlFor="custom-size"
                    className="block b3 pb-[15px] pt-5"
                  >
                    Enter custom size
                  </label>
                  <div className="flex gap-[10px] max-w-[500px]">
                    <input
                      type="text"
                      className="input"
                      name="custom-size"
                      id="custom-size"
                      placeholder="Enter custom size"
                      onChange={(e) => setCustomSizeInput(e.target.value)}
                    />
                    <p
                      className="px-14 btn btn-lg btn-secondary"
                      onClick={() =>
                        handleCustomSize(customSizeInput, setSizes)
                      }
                    >
                      Add
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className=" px-5 py-[15px] border-t border-[#DBDED6]">
              <div className="flex items-start justify-between ">
                <div>
                  <p className="mb-[15px] b3">Paper</p>
                  <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                    {papers.map((item, i) => {
                      if (!paperOpen) {
                        if (item.active) {
                          return (
                            <span
                              key={i}
                              className="border uppercase text-[10px] rounded-full px-[15px] border-unveilDrakGray"
                            >
                              {item.paper}
                            </span>
                          );
                        }
                      } else {
                        return (
                          <span
                            key={i}
                            onClick={() => handleActive(i, setPapers)}
                            className={`${
                              item.active
                                ? "border-unveilBlack"
                                : "border-unveilDrakGray"
                            } border rounded-full uppercase text-[10px] px-[15px] cursor-pointer`}
                          >
                            {item.paper}
                          </span>
                        );
                      }
                    })}
                    {!paperOpen && (
                      <span
                        onClick={() => setPaperOpen(!paperOpen)}
                        className="cursor-pointer bg-[#DBDED6] px-[10px] rounded-full"
                      >
                        +
                      </span>
                    )}
                  </div>
                </div>
                <p
                  onClick={() => setPaperOpen(!paperOpen)}
                  className="items-center cursor-pointer btn btn-opacity flex  h-[66px] btn-lg"
                >
                  {paperOpen ? "Save" : "Edit"}
                </p>
              </div>
              {paperOpen && (
                <div>
                  <label
                    htmlFor="custom-paper"
                    className="block pb-[15px] pt-5 b3"
                  >
                    Enter custom paper (not recommended)
                  </label>
                  <div className="flex gap-[10px] max-w-[500px]">
                    <input
                      type="text"
                      className="input"
                      name="custom-paper"
                      id="custom-paper"
                      placeholder="Enter custom paper"
                      onChange={(e) => setCustomPaperInput(e.target.value)}
                    />
                    <p
                      className="px-14 btn btn-lg btn-secondary"
                      onClick={() =>
                        handleCustomPaper(customPaperInput, setPapers)
                      }
                    >
                      Add
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="border-t border-[#DBDED6] px-5 py-[15px] flex justify-between">
              <div>
                <p className="mb-[15px] b3">Frame</p>
                {!frameOpen && (
                  <div className="flex gap-2 b3 lg:b4">
                    <span className="border uppercase text-[10px] rounded-full px-[15px] border-unveilDrakGray">
                      {frame.frame}, {frame.size}, {frame.colour} frame, White
                      border {frame.border}
                    </span>
                    <span
                      onClick={() => setFrameOpen(!frameOpen)}
                      className="bg-[#DBDED6] cursor-pointer px-[10px] rounded-full"
                    >
                      +
                    </span>
                  </div>
                )}
                {frameOpen && (
                  <>
                    <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                      {frameOptions.map((item, i) => (
                        <span
                          key={i}
                          onClick={() => {
                            setFrame((prevFrame) => ({
                              ...prevFrame,
                              frame: item,
                            }));
                          }}
                          className={`${
                            item === frame.frame
                              ? "border-unveilBlack"
                              : "border-unveilDrakGray"
                          } border uppercase cursor-pointer text-[10px] rounded-full px-[15px] `}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mb-[15px] mt-5 b3">Frame size</p>
                    <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                      {sizeOptions.map((item, i) => (
                        <span
                          key={i}
                          onClick={() => {
                            setFrame((prevFrame) => ({
                              ...prevFrame,
                              size: item,
                            }));
                          }}
                          className={`${
                            item === frame.size
                              ? "border-unveilBlack"
                              : "border-unveilDrakGray"
                          } border uppercase cursor-pointer text-[10px] rounded-full px-[15px] `}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mb-[15px] mt-5 b3">Frame colour</p>
                    <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                      {colourOptions.map((item, i) => (
                        <span
                          key={i}
                          onClick={() => {
                            setFrame((prevFrame) => ({
                              ...prevFrame,
                              colour: item,
                            }));
                          }}
                          className={`${
                            item === frame.colour
                              ? "border-unveilBlack"
                              : "border-unveilDrakGray"
                          } border uppercase cursor-pointer text-[10px] rounded-full px-[15px] `}
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <p className="mb-[15px] mt-5 b3">White border</p>
                    <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                      {borderOptions.map((item, i) => (
                        <span
                          key={i}
                          onClick={() => {
                            setFrame((prevFrame) => ({
                              ...prevFrame,
                              border: item,
                            }));
                          }}
                          className={`${
                            item === frame.border
                              ? "border-unveilBlack"
                              : "border-unveilDrakGray"
                          } border uppercase cursor-pointer text-[10px] rounded-full px-[15px] `}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <p
                onClick={() => setFrameOpen(!frameOpen)}
                className="items-center cursor-pointer btn btn-opacity flex  h-[66px] btn-lg"
              >
                {frameOpen ? "Save" : "Edit"}
              </p>
            </div>
            <div className=" px-5 py-[15px] border-t border-[#DBDED6]">
              <div className="flex items-start justify-between ">
                <div>
                  <p className="mb-[15px] b3">Technique</p>
                  <div className="flex flex-wrap max-w-[400px] gap-2 b3 lg:b4">
                    {techniques.map((item, i) => {
                      if (!techniqueOpen) {
                        if (item.active) {
                          return (
                            <span
                              key={i}
                              className="border uppercase text-[10px] rounded-full px-[15px] border-unveilDrakGray"
                            >
                              {item.technique}
                            </span>
                          );
                        }
                      } else {
                        return (
                          <span
                            key={i}
                            onClick={() => handleActive(i, setTechniques)}
                            className={`${
                              item.active
                                ? "border-unveilBlack"
                                : "border-unveilDrakGray"
                            } border uppercase text-[10px] rounded-full px-[15px] cursor-pointer`}
                          >
                            {item.technique}
                          </span>
                        );
                      }
                    })}
                    {!techniqueOpen && (
                      <span
                        onClick={() => setTechniqueOpen(!techniqueOpen)}
                        className="cursor-pointer bg-[#DBDED6] px-[10px] rounded-full"
                      >
                        +
                      </span>
                    )}
                  </div>
                </div>
                <p
                  onClick={() => setTechniqueOpen(!techniqueOpen)}
                  className="items-center cursor-pointer btn btn-opacity flex  h-[66px] btn-lg"
                >
                  {techniqueOpen ? "Save" : "Edit"}
                </p>
              </div>
              {techniqueOpen && (
                <div>
                  <label
                    htmlFor="custom-technique"
                    className="block pb-[15px] pt-5 b3"
                  >
                    Enter custom technique
                  </label>
                  <div className="flex gap-[10px] max-w-[500px]">
                    <input
                      type="text"
                      className="input"
                      name="custom-technique"
                      id="custom-technique"
                      placeholder="Enter custom technique"
                      onChange={(e) => setCustomTechniqueInput(e.target.value)}
                    />
                    <p
                      className="px-14 btn btn-lg btn-secondary"
                      onClick={() =>
                        handleCustomTechnique(
                          customTechniqueInput,
                          setTechniques
                        )
                      }
                    >
                      Add
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Edition pricing */}
      <div className="bg-[#F9F7F2] rounded-[10px]">
        <p className="mb-[15px] lg:mb-[35px] b3 pt-5 px-5">Edition pricing</p>
        {editionType !== "NFT only" && (
          <>
            <div className="flex gap-2 px-5 b3 lg:b4">
              {sizes.map((item, i) => {
                if (item.active) {
                  return (
                    <span
                      key={i}
                      onClick={() => setActiveSize(item.size)}
                      className={`${
                        activeSize === item.size
                          ? "border-unveilBlack"
                          : "border-unveilDrakGray"
                      } border rounded-full px-[15px] cursor-pointer text-[10px]`}
                    >
                      {item.size}
                    </span>
                  );
                }
              })}
            </div>
            <div className="grid grid-cols-6 gap-2 px-5 uppercase b4 my-[15px]">
              <div></div>
              <label htmlFor="paper-select">Paper</label>
              <label htmlFor="frame-select">Frame</label>
              <label htmlFor="technique-select">Technique</label>
              <label htmlFor="pricing-select">Pricing</label>
              <div></div>
            </div>
          </>
        )}
        {editionPricing.map((item, i) => {
          if (item === activeSize) {
            return (
              <div
                key={i}
                className={`grid grid-cols-6 gap-2 px-5 py-[15px]  ${
                  editionType !== "NFT only" ? "border-b border-[#DBDED6]" : ""
                }`}
              >
                <div className="my-auto">
                  {i + 1}/{editionPricing.length}
                </div>
                {editionType !== "NFT only" && (
                  <>
                    <div className="relative">
                      <select
                        name={`paper[${i}]`}
                        id="paper-select"
                        className="truncate select-input"
                        {...register(`paper[${i}]`, { required: "Required" })}
                      >
                        {papers.map((item, i) => {
                          if (item.active) {
                            return <option key={i}>{item.paper}</option>;
                          }
                        })}
                      </select>
                      {errors.frame && errors.frame[i] && (
                        <p
                          className={`text-red-500 opacity-0  b5 absolute -bottom-5 left-0 ${
                            errors.paper[i]?.message ? "opacity-100 block " : ""
                          }`}
                        >
                          {errors.paper[i]?.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <select
                        id="frame-select"
                        className="truncate select-input"
                        name={`frame[${i}]`}
                        {...register(`frame[${i}]`, { required: "Required" })}
                      >
                        <option>
                          {frame.frame}, {frame.size}, {frame.colour} frame,
                          White border {frame.border}
                        </option>
                      </select>
                      {errors.frame && errors.frame[i] && (
                        <p
                          className={`text-red-500 opacity-0  b5 absolute -bottom-5 left-0 ${
                            errors.frame[i]?.message ? "opacity-100 block " : ""
                          }`}
                        >
                          {errors.frame[i]?.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <select
                        id="technique-select"
                        className="truncate select-input"
                        name={`technique[${i}]`}
                        {...register(`technique[${i}]`, {
                          required: "Required",
                        })}
                      >
                        {techniques.map((item, i) => {
                          if (item.active) {
                            return <option key={i}>{item.technique}</option>;
                          }
                        })}
                      </select>
                      {errors.technique && errors.technique[i] && (
                        <p
                          className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                            errors.technique[i]?.message ? "opacity-100  " : ""
                          }`}
                        >
                          {errors.technique[i]?.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div
                  key={i}
                  className="flex relative items-center gap-[10px] col-span-2"
                >
                  <div className="relative">
                    <input
                      type="number"
                      className="input"
                      placeholder="Select Price (USD)"
                      value={editionPrice[i]}
                      name={`price[${i}]`} // Use a unique identifier for the name attribute
                      {...register(`price[${i}]`, {
                        required: "Required",
                        onChange: (e) => {
                          handleChangePrice(e.target.value, i);
                        },
                      })}
                    />
                    {errors.price && errors.price[i] && (
                      <p
                        className={`text-red-500 opacity-0 b5 absolute -bottom-5 left-0 ${
                          errors.price[i]?.message ? "opacity-100  " : ""
                        }`}
                      >
                        {errors.price[i]?.message}
                      </p>
                    )}
                  </div>
                  <div
                    className={`${
                      editionPricing.length === 1
                        ? "opacity-40"
                        : "cursor-pointer"
                    }`}
                    onClick={() => handleDeleteRow(i, setEditionPricing, true)}
                  >
                    <Delete big />
                  </div>
                </div>
                <div></div>
                {editionType !== "NFT only" && (
                  <div className="col-span-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="news"
                        id="news"
                        className="checkbox"
                      />
                      <label htmlFor="news" className="b3 md:b4">
                        Previously sold
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 px-5 pt-[15px] pb-5 lg:pb-[30px]">
          <div className="hidden lg:block"></div>
          <p
            onClick={() =>
              setEditionPricing((prevItems) => [...prevItems, activeSize])
            }
            className={`${
              editionType !== "NFT only" ? "lg:col-span-3" : "lg:col-span-5"
            } btn btn-secondary cursor-pointer inline-block text-center`}
          >
            Add edition
          </p>
          {editionType !== "NFT only" && (
            <p className="lg:col-span-2 cursor-pointer inline-block text-center lg:mr-[28px] btn btn-secondary">
              Add Artist proof
            </p>
          )}
        </div>
      </div>

      {/* Royalties */}
      <div className="bg-[#F9F7F2] rounded-[10px]">
        <div className="grid grid-cols-2 border-b border-[#DBDED6] pb-[15px] px-5 pt-5">
          <p className=" b3">Royalties</p>
          <p className="hidden lg:block b4 leading-[19px] mb-[20px] opacity-80">
            To speculative buyers from flipping your artwork we have a scaling
            system with high royalties for the artist in early stages. The
            period starts when the artwork is sold.
          </p>
        </div>

        {royalties.map((_, i) => (
          <div
            key={i}
            className="grid relative grid-cols-2 pr-10 gap-2 px-5 py-[15px] border-b border-[#DBDED6]"
          >
            <select
              name={`from[${i}]`}
              className="truncate select-input"
              {...register(`from[${i}]`)}
            >
              <option value="First month">First month</option>
              <option value="First 2 months">First 2 months</option>
              <option value="First 3 months">First 3 months</option>
              <option value="First 4 months">First 4 months</option>
              <option value="First 5 months">First 5 months</option>
              <option value="First 6 months">First 6 months</option>
              <option value="First 7 months">First 7 months</option>
              <option value="First 8 months">First 8 months</option>
              <option value="First 9 months">First 9 months</option>
              <option value="First 10 months">First 10 months</option>
              <option value="First 11 months">First 11 months</option>
              <option value="First 12 months">First 12 months</option>
              <option value="After 1 month">After 1 month</option>
              <option value="After 2 months">After 2 months</option>
              <option value="After 3 months">After 3 months</option>
              <option value="After 4 months">After 4 months</option>
              <option value="After 5 months">After 5 months</option>
              <option value="After 6 months">After 6 months</option>
              <option value="After 7 months">After 7 months</option>
              <option value="After 8 months">After 8 months</option>
              <option value="After 9 months">After 9 months</option>
              <option value="After 10 months">After 10 months</option>
              <option value="After 11 months">After 11 months</option>
              <option value="After 12 months">After 12 months</option>
            </select>
            <select
              name={`percentage[${i}]`}
              className="truncate select-input"
              {...register(`percentage[${i}]`)}
            >
              <option value="1">1%</option>
              <option value="2">2%</option>
              <option value="3">3%</option>
              <option value="4">4%</option>
              <option value="5">5%</option>
              <option value="6">6%</option>
              <option value="7">7%</option>
              <option value="8">8%</option>
              <option value="9">9%</option>
              <option value="10">10%</option>
              <option value="11">11%</option>
              <option value="12">12%</option>
              <option value="13">13%</option>
              <option value="14">14%</option>
              <option value="15">15%</option>
            </select>
            <div
              onClick={() => handleDeleteRow(i, setRoyalties)}
              className="absolute cursor-pointer -translate-y-1/2 right-[15px] top-1/2"
            >
              <Delete big />
            </div>
          </div>
        ))}

        <p
          onClick={() =>
            setRoyalties((prevItems) => [...prevItems, defaultRoyalties])
          }
          className="px-32 inline-block text-center mx-5 mt-[15px] mb-5 lg:mb-[30px] btn btn-secondary w-[calc(100%-40px)] "
        >
          Add date range
        </p>
      </div>

      {/* Collection */}
      <div className="bg-[#F9F7F2]  rounded-[10px] ">
        <div className="mb-[15px] lg:mb-[35px] px-5 pt-5 flex justify-between">
          <p className=" b3">Collection</p>
          <p className="opacity-80 b4">
            Which collection does this artwork belong to?
          </p>
        </div>
        <div className="px-5 pb-[15px] ">
          <select
            id="collection-select"
            name="collection_id"
            className="truncate select-input"
            defaultValue="Select collection"
            {...register("collection_id", { required: "Required" })}
          >
            <option disabled>Select collection</option>
            {collections.map((item, i) => (
              <option key={i} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        {!openCollection && (
          <div className="flex border-t border-[#DBDED6] gap-[30px] items-center underline-offset-2 decoration-1 px-5 pt-[15px] pb-5 lg:pb-[30px] b3">
            <p onClick={() => setOpenCollection(true)}>+</p>
            <p
              onClick={() => setOpenCollection(true)}
              className="underline cursor-pointer"
            >
              Create new collection
            </p>
          </div>
        )}
        {openCollection && (
          <form
            onSubmit={handleCollectionSubmit(onSubmitForm)}
            className="border-t  border-[#DBDED6]"
          >
            <p className="py-[35px] px-5 b3">Add new collection</p>
            <div className="flex relative px-5 items-center gap-[10px]">
              <label
                htmlFor="collection-image"
                className="border cursor-pointer overflow-hidden relative border-unveilBlack rounded-[10px] min-w-[120px] min-h-[120px] max-w-[120px] max-h-[120px]"
              >
                {!collectionImage && (
                  <>
                    <div className="absolute w-5 h-px -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                    <div className="absolute w-5 h-px rotate-90 -translate-x-1/2 -translate-y-1/2 bg-unveilBlack top-1/2 left-1/2"></div>
                  </>
                )}

                <input
                  accept="image/*"
                  type="file"
                  hidden
                  name="imageCollection"
                  id="collection-image"
                  {...registerColl("imageCollection", {
                    required: "Required",
                    onChange: (e) => {
                      handleImageChange(e);
                    },
                  })}
                />
                {collectionImage && (
                  <Image
                    src={URL.createObjectURL(collectionImage)}
                    alt="Selected"
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </label>
              <div>
                {collectionImage && (
                  <>
                    <p className="b3">{collectionImage.name}</p>
                    <p
                      onClick={() => handleRemoveImage(setCollectionImage)}
                      className="underline cursor-pointer underline-offset-2 b4 decoration-1"
                    >
                      Remove
                    </p>
                  </>
                )}
                {!collectionImage && (
                  <>
                    <p className="b3">Add image</p>
                    <p className="b4">(minimally 2000px)</p>
                  </>
                )}
              </div>
              <p
                className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-5 ${
                  errorColl.imageCollection?.message ? "opacity-100" : ""
                }`}
              >
                {errorColl.imageCollection?.message}
              </p>
            </div>
            <div className="grid px-5 my-[35px] grid-cols-2 gap-[10px]">
              <div className="relative">
                <label className="b3 block pb-[15px]" htmlFor="collectionName">
                  Collection name
                </label>
                <input
                  id="collectionName"
                  name="collectionName"
                  type="text"
                  className="input"
                  placeholder="Insert name"
                  {...registerColl("collectionName", { required: "Required" })}
                />
                <p
                  className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-0 ${
                    errorColl.collectionName?.message ? "opacity-100" : ""
                  }`}
                >
                  {errorColl.collectionName?.message}
                </p>
              </div>
              <div className="relative">
                <label
                  className="b3 block pb-[15px]"
                  htmlFor="collection-release-date"
                >
                  Release date
                </label>
                <input
                  id="collection-release-date"
                  name="releaseDate"
                  type="datetime-local"
                  className="cursor-pointer input"
                  min={getCurrentDateTime()}
                  {...registerColl("releaseDate", { required: "Required" })}
                />
                <p
                  className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-0 ${
                    errorColl.releaseDate?.message ? "opacity-100" : ""
                  }`}
                >
                  {errorColl.releaseDate?.message}
                </p>
              </div>
            </div>
            <div className="relative px-5">
              <label className="b3  block pb-[15px]" htmlFor="collection-name">
                About the collection
              </label>
              <input
                id="collection-about"
                type="text"
                name="description"
                className=" w-[] input"
                placeholder="300 characters max"
                {...registerColl("description", {
                  required: "Required",
                  maxLength: 300,
                })}
              />
              <p
                className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-5 ${
                  errorColl.description?.message ? "opacity-100" : ""
                }`}
              >
                {errorColl.description?.message}
              </p>
            </div>
            <label
              className="b3 px-5 block pt-[35px] pb-[15px]"
              htmlFor="collection-curator"
            >
              Add curator
            </label>
            <div className="relative px-5 mb-[10px]">
              <select
                id="collection-curator"
                className="truncate select-input"
                defaultValue="Select curator"
                name="curator"
                {...registerColl("curator")}
              >
                <option>Select curator</option>
                {curatorNames.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <p
                className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-0 ${
                  errorColl.curator?.message ? "opacity-100" : ""
                }`}
              >
                {errorColl.curator?.message}
              </p>
            </div>

            <div className="grid px-5 pb-[35px] grid-cols-2 gap-[10px]">
              <div className="relative">
                <select
                  id="collection-commission"
                  className="truncate select-input"
                  defaultValue="Commission"
                  name="commission"
                  {...registerColl("commission")}
                >
                  <option>Commission</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                </select>
                <p
                  className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-0 ${
                    errorColl.commission?.message ? "opacity-100" : ""
                  }`}
                >
                  {errorColl.commission?.message}
                </p>
              </div>
              <div className="relative">
                <input
                  id="collection-duration"
                  name="duration"
                  type="datetime-local"
                  className="cursor-pointer input"
                  min={getCurrentDateTime()}
                  {...registerColl("duration", "conditionalField", {
                    required: () => isFieldRequired(curatorValue),
                  })}
                />
                <p
                  className={`text-red-500 opacity-0 absolute b5 -bottom-5 left-0 ${
                    errorColl.duration?.message ? "opacity-100" : ""
                  }`}
                >
                  {errorColl.duration?.message}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 px-5 gap-[10px] border-t border-[#DBDED6] pt-[35px] pb-10">
              <button type="submit" className="btn btn-full btn-primary btn-lg">
                Save new collection
              </button>
              <button
                onClick={() => setOpenCollection(false)}
                className="btn btn-full btn-secondary btn-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateForm;