import React, { forwardRef } from "react";
import { Link, useParams } from "react-router-dom";

const PlaylistItem = forwardRef((props, ref) => {
  const { id: currId, title, img } = props.item;
  const { type, page, id } = useParams();
  const classes = currId == id ? "item active" : "item";

  return (
    <Link className={classes} to={`/${type}/${page}/${currId}`}>
      <p className="id">{currId}.</p>
      <img src={img} alt="" />
      <p>{title}</p>
    </Link>
  );
});

export default PlaylistItem;
