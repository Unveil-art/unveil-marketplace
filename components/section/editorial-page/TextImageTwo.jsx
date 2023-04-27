import React from "react";

const TextImageTwo = () => {
  return (
    <section className="grid grid-cols-1 mb-10 md:my-20 md:grid-cols-5">
      <div className="order-2 md:col-span-2 md:order-1">
        <p className="md:max-w-[350px] mt-10 leading-[110%] px-[15px] ml-[100px] md:ml-[40px] s2 drop-cap">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias
          vero nesciunt nobis nulla laborum nam fugiat cum, praesentium hic,
          repellendus, cupiditate qui quisquam ullam quidem voluptatem deserunt
          maiores? Voluptatem, ullam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Molestias vero nesciunt nobis nulla laborum nam
          fugiat cum, praesentium hic, repellendus, cupiditate qui quisquam
          ullam quidem voluptatem deserunt maiores? Voluptatem, ullam.
        </p>
      </div>
      <div className="order-1 w-full md:col-span-3 md:order-2">
        <div className="w-full bg-bgColor aspect-[10/11]"></div>
        <div className="md:bg-[#D9D9D9] md:py-20 md:text-center text-left px-[15px] py-2 b3 md:l2"></div>
        <p className="mt-[15px] b4 hidden md:block">
          in my photography I operate on the border of fiction and non-fiction
          as that is where I consider myself to be.
        </p>
      </div>
    </section>
  );
};

export default TextImageTwo;
