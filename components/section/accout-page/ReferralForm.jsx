import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ReferralForm = ({ onSubmit, initialData, onDelete, i }) => {
  const [role, setRole] = useState(initialData.role);
  const [email, setEmail] = useState(initialData.email);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitForm = (values, e) => {
    e.preventDefault();
    onSubmit({ role, email });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} key={i} className="mt-10">
      <div className="flex items-center gap-[5px] mb-5">
        <h3 className="b3 text-[17px]">Referral {initialData.index + 1}</h3>
        <span className="px-2 py-1 rounded-full small text-unveilWhite bg-unveilBlack">
          Accepted
        </span>
      </div>
      <hr className="mb-[15px] h-[2px] bg-unveilGreen" />
      <select
        name={`role[${i}]`}
        {...register(`role[${i}]`, {
          required: "Required",
          onChange: (e) => {
            setRole(e.target.value);
          },
        })}
        className="select-input mb-2 md:mb-[15px]"
      >
        <option value="artist">Artist</option>
        <option value="collector">Collector</option>
      </select>
      <div className="mb-2 md:mb-[15px] grid grid-cols-5 md:grid-cols-3 gap-2 md:gap-[15px]">
        <div className="relative w-full col-span-3 md:col-span-2">
          <input
            name={`email[${i}]`}
            {...register(`email[${i}]`, {
              required: "Required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
              onChange: (e) => {
                setEmail(e.target.value);
              },
            })}
            placeholder="email"
            className=" input"
            type="text"
          />
        </div>

        <button className="col-span-2 btn btn-primary btn-lg md:col-auto">
          Invite
        </button>
      </div>
      <p
        onClick={() => onDelete()}
        className="text-center cursor-pointer btn-lg btn btn-secondary btn-full"
      >
        Delete referral
      </p>
    </form>
  );
};

export default ReferralForm;
