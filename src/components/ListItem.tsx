import React, { FC } from "react";
import { Photo } from "../App";

const ListItem: FC<Photo> = ({ thumbnailUrl, title }) => {
  return (
    <div className="listItem">
      <div className="square">
        <img alt={title} className="image" src={thumbnailUrl} />
      </div>
      <p className="title">{title}</p>
    </div>
  );
};

export default ListItem;
