import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import CollectionDetails from "../general/CollectionDetails";

const Collection = ({
  title = "title",
  oneLiner,
  oneLinerLink,
  oneLinerHref,
  color = "#141414",
  backgroundColor = "#fff",
  imageMargin = true,
  data,
}) => {
  return (
    <section style={{ backgroundColor: backgroundColor, color: color }} data-cursor="View Collection" data-cursor-color="#B8AE92">
      <Title title={title} color={color} />
      {!oneLiner && <div className="h-[80px] sm:h-[180px]"></div>}
      {oneLiner && <OneLiner text={oneLiner} />}
      <CollectionDetails
        data={data}
        imageMargin={imageMargin}
        color={color}
        backgroundColor={backgroundColor}
      />
    </section>
  );
};

export default Collection;
