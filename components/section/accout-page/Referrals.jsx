import React, { useState, useEffect } from "react";
import Oneliner from "../../reusable/Oneliner";
import Invite from "@/components/reusable/Invite";
import Animate from "@/components/reusable/Animate";
import ReferralForm from "./ReferralForm";
import useLocalStorage from "@/hooks/useLocalStorage";
import { sendInvite } from "lib/backend";
import { showTopStickyNotification } from "lib/utils/showTopStickyNotification";

const Referrals = () => {
  const [referrals, setReferrals] = useState([
    { role: "artist", type: "GOLD", email: "" },
  ]);
  const { value } = useLocalStorage("token");

  const notify = (message) => showTopStickyNotification("info", message);

  const handleFormSubmit = async (index, data) => {
    try {
      data.invitation_type = data.role === "artist" ? "SILVER" : "SILVER";
      await sendInvite(value, data);
    } catch (error) {
      console.error(error);
      notify(error.message);
    }
  };

  const handleDelete = (index) => {
    const newReferrals = [...referrals];
    newReferrals.splice(index, 1);
    setReferrals(newReferrals);
  };
  return (
    <>
      <Animate options={{ alpha: true }}>
        <Oneliner
          mr
          nmb
          gallery={true}
          text="Unveil's Curation Board has selected a collection of top art photography projects for their excellence and stunning visuals."
        />
        <div className="ml-[40px] mt-10 md:ml-[35vw] pr-[15px] md:pr-10 max-w-[640px] pb-10">
          <Invite />
          {referrals.map((referral, i) => (
            <ReferralForm
              key={i}
              initialData={referral}
              onSubmit={(data) => handleFormSubmit(i, data)}
              onDelete={() => handleDelete(i)}
            />
          ))}

          <hr className="my-10 h-[2px] bg-unveilGreen" />
          <button
            onClick={() =>
              setReferrals([
                ...referrals,
                { role: "artist", type: "GOLD", email: "" },
              ])
            }
            className="btn-lg btn btn-secondary btn-full"
          >
            Add more
          </button>
        </div>
      </Animate>
    </>
  );
};

export default Referrals;
