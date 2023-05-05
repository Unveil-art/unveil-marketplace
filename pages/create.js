import React from "react";

import CreateForm from "@/components/section/create-page/CreateForm";
const Create = () => {
  return (
    <main className="bg-[#F0EDE4] px-10 flex justify-between">
      <div>
        <h1 className="py-[120px] ">Add Artwork</h1>
        <CreateForm />
      </div>
    </main>
  );
};

export default Create;
