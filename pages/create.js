import React from "react";

import CreateForm from "@/components/section/create-page/CreateForm";
import CreateSidebar from "@/components/section/create-page/CreateSidebar";
const Create = () => {
  return (
    <main className="bg-[#F0EDE4] mb-[120px] px-[15px] md:px-10 lg:flex justify-between">
      <div>
        <h1 className="lg:py-[120px] pt-[120px] pb-[60px]">Add Artwork</h1>
        <CreateForm />
        <div className="hidden lg:grid grid-cols-2 mt-5 gap-[15px]">
          <button className="btn btn-primary btn-lg btn-full">
            Create NFTs
          </button>
          <button className="btn btn-secondary btn-lg btn-full bg-unveilWhite">
            Save
          </button>
        </div>
      </div>

      <CreateSidebar />
      <div className="grid grid-cols-1 mt-5 gap-[15px] lg:hidden ">
        <button className="btn btn-primary btn-lg btn-full">Create NFTs</button>
        <button className="btn btn-secondary btn-lg btn-full bg-unveilWhite">
          Save
        </button>
      </div>
    </main>
  );
};

export default Create;
