import React from "react";

import OneLiner from "../reusable/Oneliner";
import Title from "../reusable/Title";
import CollectionDetails from "../CollectionDetails";

const Collection = ({
  title = "title",
  oneLiner,
  oneLinerLink,
  oneLinerHref,
  color = "#141414",
  backgroundColor = "#fff",
  imageMargin,
}) => {
  return (
    <section style={{ backgroundColor: backgroundColor, color: color }}>
      <Title title="Rineke Dijkstra" color={color} />
      {!oneLiner && <div className="h-[80px] sm:h-[180px]"></div>}
      {oneLiner && (
        <OneLiner text={oneLiner} link={oneLinerLink} href={oneLinerHref} />
      )}
      <CollectionDetails
        imageMargin={imageMargin}
        color={color}
        backgroundColor={backgroundColor}
      />
    </section>
  );
};

export default Collection;