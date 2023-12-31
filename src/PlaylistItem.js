import React, { forwardRef, useContext } from "react";
import { context } from "./App";

const PlaylistItem = forwardRef((props, ref) => {
  const { id, title, url, lyrics, img } = props.item;
  const { currSongId, setCurrSongId } = useContext(context);
  const classes = currSongId === id ? "item active" : "item";

  return (
    <div className={classes} onClick={() => setCurrSongId(id)}>
      <p>{id}.</p>&nbsp;&nbsp;
      <img src={img} alt="" />
      &nbsp;&nbsp;
      <p>{title}</p>
    </div>
  );
});

export default PlaylistItem;
