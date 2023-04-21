import React from "react";

const ArtistAnnouncement = () => {
  const random = Math.floor(Math.random() * 50);

  return (
    <section className="pt-10 md:pt-[100px] my-10 pb-10 md:pb-[200px] mx-[15px] md:mx-10 border-t border-b border-unveilDrakGray">
      <div
        style={{ transform: `translateX(${random}vw)` }}
        className="w-full translate0 md:w-[35%] bg-unveilGreen "
      >
        <div className="w-full aspect-[3/4] pr-5">
          <div className="w-full h-full bg-unveilCreme"></div>
        </div>
        <p className="pt-10 text-center l2">Artist Announcement</p>
        <h3 className="text-center h4 pb-[60px]">Bastiaan Woudt Untangled</h3>
      </div>
    </section>
  );
};

export default ArtistAnnouncement;
