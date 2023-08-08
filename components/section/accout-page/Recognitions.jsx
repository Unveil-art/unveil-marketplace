import React, { useState, useEffect } from "react";
import Delete from "../../svg/Delete";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import {
  postRecognition,
  getRecognitions,
  deleteRecognition,
} from "lib/backend";
import Loader from "@/components/svg/Loader";
import Animate from "@/components/reusable/Animate";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import NewRecognitionPopIn from "@/components/pop-in/NewRecognitionPopIn";

const Recognitions = () => {
  const [loading, setLoading] = useState(false);
  const [recognition, setRecognition] = useState();
  const [showPopIn, setShowPopIn] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { value } = useLocalStorage("token");

  const fetchRecognitions = async () => {
    try {
      const data = await getRecognitions(value);
      setRecognition(data.data);
      return data;
    } catch (err) {
      console.error(err);
      // toast.error(err.message);
      showTopStickyNotification("error", err.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteRecognition(value, id);
    await fetchRecognitions();
  };

  useEffect(() => {
    if (value) {
      fetchRecognitions();
    }
  }, [value]);

  const onSubmitForm = async (values, e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      recognition_type: values.type,
      description: values.description,
      year: values.year.toString(),
    };

    try {
      await postRecognition(value, data);
      setLoading(false);
      reset();
      // toast.success("Success");
      showTopStickyNotification("success", "Success");
      fetchRecognitions();
    } catch (err) {
      setLoading(false);
      console.error(err);
      // toast.error(err.message);
      showTopStickyNotification("error", err.message);
    }
  };

  return (
    <Animate options={{ alpha: true }}>
      <div className="ml-[40px] md:ml-[35vw] mb-10 pr-[15px] md:pr-10 overflow-hidden">
        <h2 className=" pt-[100px] md:pt-[160px] pb-10">Your recognitions</h2>
        <table className="w-full  max-w-[640px]">
          <thead>
            <tr className="border-b-2 border-unveilBlack b4">
              <td className="pb-2">Type</td>
              <td className="pb-2">Description</td>
              <td className="pb-2 text-right">Year</td>
            </tr>
          </thead>
          {recognition && recognition.length > 0 && (
            <tbody>
              {recognition.map((item, i) => (
                <tr
                  key={i}
                  className="relative border-b border-unveilGreen last:border-none"
                >
                  <td className="py-2 l2">{item.recognition_type}</td>
                  <td className="b4">{item.description}</td>
                  <td className="text-right b4">{item.year}</td>
                  <td
                    onClick={() => handleDelete(item.id)}
                    className="absolute cursor-pointer -translate-y-1/2 -right-[10px] md:-right-4 top-1/2"
                  >
                    <Delete />
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {/* <h2 className="pt-[60px] pb-10">Add recognition</h2>
        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="space-y-2 md:space-y-[15px] relative max-w-[640px]"
        >
          <div className="relative">
            <select
              name="type"
              {...register("type", {
                required: "Required",
              })}
              className="select-input"
              placeholder="Select type*"
            >
              <option value="AWARD">Award</option>
              <option value="EXHIBITION">Exhibition</option>
              <option value="COLLECTION">Collection</option>
              <option value="EDUCATION">EDUCATION</option>
            </select>
            <p
              className={`text-red-500 opacity-0 b5 absolute -bottom-[18px] left-0 ${
                errors.type?.message ? "opacity-100" : ""
              }`}
            >
              {errors.type?.message}
            </p>
          </div>
          <div className="relative">
            <input
              placeholder="Description*"
              className="input"
              type="text"
              name="description"
              id="description"
              {...register("description", {
                required: "Required",
              })}
            />
            <p
              className={`text-red-500 opacity-0 b5 absolute -bottom-[18px] left-0 ${
                errors.description?.message ? "opacity-100" : ""
              }`}
            >
              {errors.description?.message}
            </p>
          </div>
          <div className="relative">
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
              className={`text-red-500 opacity-0 b5 absolute-bottom-[18px] left-0 ${
                errors.year?.message ? "opacity-100" : ""
              }`}
            >
              {errors.year?.message}
            </p>
          </div>
          <div className="relative">
            <input
              placeholder="Add Link"
              className="input"
              type="text"
              name="link"
              id="link"
              {...register("link")}
            />
          </div>

          <input placeholder="Add link" className="input mb-[15px]" type="text" />
          <button
            type="submit"
            className="flex items-center justify-center btn btn-secondary btn-full btn-lg"
          >
            {loading && (
              <div className="h-[25px] animate-spin flex items-center">
                <Loader />
              </div>
            )}
            {!loading && <>Add</>}
          </button>
          <div className="md:absolute bottom-0 md:w-40  w-full -right-[calc(10rem+15px)]">
            <p className=" md:leading-[25px] b4">
              <span className="font-[500]">Verifications</span>
              <br /> Adjustable info block about our verifications
            </p>
          </div>
        </form> */}

        <button
          onClick={() => setShowPopIn(true)}
          className="flex items-center justify-center mt-8 btn btn-secondary btn-full btn-lg max-w-[640px]"
        >
          Add Achievement
        </button>

        <NewRecognitionPopIn
          open={showPopIn}
          setOpen={setShowPopIn}
          fetchRecognitions={fetchRecognitions}
          value={value}
        />
      </div>
    </Animate>
  );
};

export default Recognitions;
