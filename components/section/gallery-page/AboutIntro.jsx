import Animate from "@/components/reusable/Animate";

const AboutIntro = ({ collection }) => {
  return (
    <section className="mx-10 mt-10 md:mt-0 md:pb-[80px] md:pt-[120px]">
      <Animate options={{ y: 100, alpha: true }} className="mb-5">
        <p className="s1">About the collection</p>
      </Animate>
      <Animate options={{ y: 100, alpha: true }} className="md:max-w-[60%]">
        <h2 className="md:h2 b2 drop-cap">{collection.description}</h2>
      </Animate>
    </section>
  );
};

export default AboutIntro;
