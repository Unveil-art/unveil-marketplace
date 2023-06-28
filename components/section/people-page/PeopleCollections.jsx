import Collections from "@/components/reusable/Collections";
import React, { useState, useEffect } from "react";

const PeopleCollections = ({ collections }) => {
  return (
    <section className="mt-10">
      {collections && collections.length > 0 && (
        <>
          {collections.map((item, i) => (
            <div key={i}>
              <Collections item={item} />
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default PeopleCollections;
