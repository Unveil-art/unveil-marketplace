import React, { useEffect, useRef, useState } from "react";
import SmallArrow from "@/components/svg/SmallArrow";
import useDebounce from "@/hooks/useDebounce";
import { getArtworksSearch, getCollectionsSearch } from "lib/backend";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import Link from "next/link";

const Search = () => {
  const [search, setSearch] = useState("");
  const searchEl = useRef();
  const debounce = useDebounce(search, 500);
  const [searching, setSearching] = useState(false);
  const [artworks, setArtworks] = useState([]);
  const [collections, setCollections] = useState();

  const handleSuggestions = (value) => {
    setSearch(value);
  };

  const fetchSearch = async (query) => {
    const artworksRes = await getArtworksSearch(query);
    const collectionsRes = await getCollectionsSearch(query);

    setArtworks(artworksRes);
    setCollections(collectionsRes);
  };

  useEffect(() => {
    if (search !== "") {
      fetchSearch(search);
      setSearching(true);
    } else {
      setSearching(false);
      setArtworks([]);
      setCollections([]);
    }
  }, [debounce]);

  return (
    <main className="pt-[120px] min-h-screen">
      <div className="ml-[40px] md:ml-[35svw] md:pr-[40px] ">
        <div
          className={`bg-unveilBlack h-[3px] md:h-[5px] mb-3 md:mb-5 md:mr-0 mr-[15px]`}
        ></div>
        <div className="flex items-center md:block">
          <input
            ref={searchEl}
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="overflow-hidden max-w-[calc(100%-140px)] bg-transparent outline-none h1 placeholder:text-bgBlackOpacity2"
            placeholder="Search"
          />
          {debounce && (
            <span
              onClick={() => setSearch("")}
              className="px-2 border rounded-full cursor-pointer md:py-1 whitespace-nowrap l2 border-unveilBlack"
            >
              Clear search x
            </span>
          )}
        </div>
      </div>

      <div className="ml-[40px] md:ml-[35svw] md:pr-[40px] mt-[60px]">
        {!searching && (
          <>
            <p className="b3 text-[17px] mb-1">Suggestions</p>
            <div className="space-y-[2px]">
              <div className="text-[#545454] items-center flex gap-1 b3">
                <SmallArrow />
                Collection:{" "}
                <span
                  onClick={() => handleSuggestions("Alexander Sporre")}
                  className="cursor-pointer underline-on-hover"
                >
                  Alexander Sporre
                </span>
              </div>
              <div className="text-[#545454] items-center flex gap-1 b3">
                <SmallArrow />
                Artist:{" "}
                <span
                  onClick={() => handleSuggestions("Bastiaan Woudt")}
                  className="cursor-pointer underline-on-hover"
                >
                  Bastiaan Woudt
                </span>
              </div>
              <div className="text-[#545454] items-center flex gap-1 b3">
                <SmallArrow />
                Artwork:{" "}
                <span
                  onClick={() => handleSuggestions("Pink Flower")}
                  className="cursor-pointer underline-on-hover"
                >
                  Pink Flower
                </span>
              </div>
            </div>
          </>
        )}
        {searching && (
          <>
            {artworks && artworks.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-1 mb-1 s2">
                  <p>Artworks</p>
                  <div className="w-[20px] h-5 border-unveilBlack border rounded-full relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px]">
                      {artworks.length}
                    </span>
                  </div>
                </div>
                {artworks.map((artwork, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 py-5 border-b last:border-none border-bgColorHover"
                  >
                    <Link href={`/gallery/artwork/${artwork.id}`}>
                      <div className="relative w-[120px] h-[140px] flex justify-center items-center p-5 bg-bgColor">
                        <img
                          className="object-contain shadow2"
                          src={artwork.media_url}
                          alt={artwork.name}
                        />
                      </div>
                    </Link>
                    <div className="block md:flex">
                      <Link href={`/gallery/artwork/${artwork.id}`}>
                        <h4 className="s1 mb-[10px] md:w-[300px] mr-[15px]">
                          {artwork.name}
                        </h4>
                      </Link>
                      <div>
                        <p className="leading-none b4 opacity-60">Editions</p>
                        <p className="b3">{artwork.editions.length}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {collections && collections.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-1 mb-1 s2">
                  <p>Collections</p>
                  <div className="w-[20px] h-5 border-unveilBlack border rounded-full relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px]">
                      {collections.length}
                    </span>
                  </div>
                </div>
                {collections.map((collection, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 py-5 border-b last:border-none border-bgColorHover"
                  >
                    <Link href={`/gallery/collection/${collection.id}`}>
                      <div className="relative w-[120px] h-[140px]">
                        <Image
                          src={collection.media_url}
                          alt={collection.title}
                          fill={true}
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    </Link>
                    <div className="block md:flex mr-[15px]">
                      <Link href={`/gallery/collection/${collection.id}`}>
                        <h4 className="s1 mb-[10px] md:w-[300px]">
                          {collection.title}
                        </h4>
                      </Link>
                      <div>
                        <p className="leading-none b4 opacity-60">Artworks</p>
                        <p className="b3">x</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Search;
