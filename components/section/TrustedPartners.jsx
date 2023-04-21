import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import Partners from "../reusable/Partners";

const TrustedPartners = ({ data }) => {
  return (
    <section>
      <Title title={data.heading} />
      <OneLiner text={data.description} />
      <div className="mb-[60px] md:mb-[170px]">
        <Partners data={data} />
      </div>
    </section>
  );
};

export default TrustedPartners;
