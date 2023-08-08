import { useEffect, useRef, useState } from "react";
import Close from "../svg/Close";
import Loader from "@/components/svg/Loader";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";
import { postRecognition } from "lib/backend";
import { useLocalStorage } from "react-use";
import { useAsideAnimation } from "@/hooks/animations/useAsideAnimation";
import { useForm } from "react-hook-form";

const NewRecognitionPopIn = ({ open, setOpen, fetchRecognitions, value }) => {
  const el = useRef();
  const [loading, setLoading] = useState(false);

  useAsideAnimation(el, open);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      reset();
      // toast.success("Success");
      showTopStickyNotification("success", "Success");
      setOpen(false);
      fetchRecognitions();
    } catch (err) {
      console.error(err);
      // toast.error(err.message);
      showTopStickyNotification("error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={el}
      className="fixed z-50 invisible w-full h-screen overflow-hidden"
    >
      <div className="gsap-el fixed overflow-y-scroll top-[15px] right-[15px] sm:top-5 sm:right-5 sm:w-[380px]  bg-[#ECE8DE] px-5 py-10 z-50 rounded-[20px] sm:h-fit">
        <div
          onClick={() => setOpen(false)}
          className="absolute top-[15px] right-[15px] w-8 h-8 rounded-full bg-unveilBlack cursor-pointer"
        >
          <div className="-translate-x-[1px]">
            <Close />
          </div>
        </div>
        <div>
          <div className="pt-[60px] pb-10 text-center">
            <div className="mb-1.5 b4">Submit archievement</div>
            <h2 className="">Add Achievement</h2>
          </div>
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
                    <option
                      key={index}
                      value={new Date().getFullYear() - index}
                    >
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

            {/* <input placeholder="Add link" className="input mb-[15px]" type="text" /> */}
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
          </form>
        </div>
      </div>
      <div
        onClick={() => setOpen(false)}
        className="fixed top-0 left-0 invisible w-full h-screen gsap-layer bg-unveilGrey"
      ></div>
    </section>
  );
};

export default NewRecognitionPopIn;
