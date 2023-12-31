import React, { useContext } from "react";
import ReactPlayer from "react-player/youtube";
import { context } from "./App";

const Player = ({ url }) => {
  const { currSongId, setCurrSongId } = useContext(context);

  return (
    <ReactPlayer
      autoFocus
      playing={true}
      config={{
        youtube: {
          playerVars: {
            autoplay: 1,
            controls: 1,
          },
        },
      }}
      url={url}
      onEnded={() => setCurrSongId(currSongId + 1 ? currSongId + 1 : 1)}
      width={"100%"}
      height={710}
    />
  );
};

export default Player;
