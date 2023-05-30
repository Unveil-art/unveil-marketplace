import Link from "next/link";
import React from "react";

const PeopleList = ({ people }) => {
  return (
    <>
      {people && (
        <div className="mt-10 pl-10 md:px-0 md:w-[calc(65vw-40px)] mr-[15px] md:mr-10 px-[15px]">
          {people.length > 0 && (
            <>
              {people.map((item, i) => {
                let displayName;

                if (item.firstName && item.lastName) {
                  displayName = `${item.firstName} ${item.lastName}`;
                } else if (item.firstName) {
                  displayName = item.firstName;
                } else if (item.lastName) {
                  displayName = item.lastName;
                } else {
                  displayName = item.email;
                }

                return (
                  <div
                    key={i}
                    className="border-b last:border-b-0 border-b-bgColorHover"
                  >
                    <Link href="/people/1">
                      <div className="flex items-center gap-20 ">
                        <div className="flex items-center gap-5 py-5">
                          <div className="h-[140px] w-[120px] bg-bgColor"></div>
                          <div>
                            <p className="mb-[10px] s1 max-w-[90%] md:max-w-[170px] lg:max-w-[270px] lg:min-w-[270px] truncate">
                              {displayName}
                            </p>
                            <div className="block md:hidden">
                              <p className="b3 opacity-60">Artworks</p>
                              <p>20</p>
                            </div>
                            <div className="block md:hidden">
                              <p className="b3 opacity-60">Collections</p>
                              <p>3</p>
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
                );
              })}
            </>
          )}

          {people.length < 1 && <p className="b3">It&apos;s empty here</p>}
        </div>
      )}
    </>
  );
};

export default PeopleList;
