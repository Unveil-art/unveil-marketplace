const RequestAccess = () => {
  return (
    <section className="grid w-full h-screen grid-cols-1 md:grid-cols-2">
      <div className="absolute w-full h-full bg-unveilGreen -z-10"></div>
      <div className="hidden md:block"></div>
      <div className="md:pl-0 pl-[40px] pr-[15px] md:pr-10">
        <h2 className="h3 pt-[60px] md:pt-[140px] max-w-[400px]">
          Start selling to new audiences.
        </h2>
        <p className="mt-3 mb-3 md:mt-10 md:mb-10 b3 w-[90%] ">
          Request access at Unveil by providing a link to your work and
          submitting a series of works upon selection by our curator.
        </p>
        <button className="block mb-3 btn btn-primary md:w-fit btn-full">
          Request access
        </button>
        <small className=" b4">Open for galleries and photographers.</small>
      </div>
    </section>
  );
};

export default RequestAccess;
