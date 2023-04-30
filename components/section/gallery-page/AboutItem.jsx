const AboutItem = () => {
  return (
    <div className="block w-full py-10 md:py-[90px] overflow-hidden">
      <div className="gsap-scroll flex flex-col md:flex-row flex-nowrap gap-10 px-[15px] md:px-10">
        <div className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 md:gap-10">
          <div className="ml-[80px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
            <p>
              In this picture: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In mollis dui sit amet nisi aliquet.
            </p>
            <div className="w-10 h-10 mt-5 overflow-hidden rounded-full md:mt-10 bg-bgColor"></div>
            <p className="mt-1 l2">Play soundbite</p>
          </div>
          <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2"></div>
        </div>
        <div className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 md:gap-10">
          <div className="ml-[80px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
            <p className="">
              In this picture: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In mollis dui sit amet nisi aliquet.
            </p>
          </div>
          <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2"></div>
        </div>
        <div className="w-full md:w-auto md:min-w-[66%] md:max-w-[66%] flex-col md:flex-row flex gap-5 md:gap-10">
          <div className="ml-[80px] md:ml-0 w-[230px] md:w-[160px] b3 md:b4 order-2 md:order-1">
            <p className="">
              In this picture: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. In mollis dui sit amet nisi aliquet.
            </p>
          </div>
          <div className="w-full aspect-[4/3] bg-bgColor order-1 md:order-2"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutItem;
