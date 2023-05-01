import Link from "next/link";
import React from "react";

const PeopleList = () => {
  return (
    <div className="mt-10 pl-10 md:px-0 md:w-[calc(65vw-40px)] mr-[15px] md:mr-10 px-[15px]">
      {[1, 1, 1, 1].map((item, i) => (
        <div key={i} className="border-b last:border-b-0 border-b-bgColorHover">
          <Link href="/people/1">
            <div className="flex items-center gap-20 ">
              <div className="flex items-center gap-5 py-5">
                <div className="h-[140px] w-[120px] bg-bgColor"></div>
                <div>
                  <p className="mb-[10px] s1">Alex</p>
                  <div className="block md:hidden">
                    <p className="b3 opacity-60">Artworks</p>
                    <p>20</p>
                  </div>
                  <div>
                    <p className="b3 opacity-60">Collections</p>
                    <p>2</p>
                  </div>
                </div>
              </div>
              <div className="hidden gap-10 md:flex">
                <div>
                  <p className="b3 opacity-60">Artworks</p>
                  <p>20</p>
                </div>
                <div>
                  <p className="b3 opacity-60">Collections</p>
                  <p>2</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
