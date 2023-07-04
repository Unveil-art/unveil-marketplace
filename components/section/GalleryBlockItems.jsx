import React, { useEffect } from "react";

import TwoBlockItems from "../reusable/TwoBlockItems";
import ThreeBlockItems from "../reusable/ThreeBlockItems";
import About from "../reusable/About";

const GalleryBlockItems = ({ items }) => {
  return (
    <>
      {items.map((itemArr) => (
        <>
          {itemArr.length === 3 && <ThreeBlockItems items={itemArr} />}
          {itemArr.length === 2 && <TwoBlockItems items={itemArr} />}
          {itemArr.length === 1 && <About item={itemArr[0]} bg="#54382F" />}
        </>
      ))}

      {/* <TwoBlockItems /> */}
    </>
  );
};

export default GalleryBlockItems;
