import React, { useContext, useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { context } from "./App";

const Player = ({ url }) => {
  const { currSongId, setCurrSongId } = useContext(context);
  const [playing, setPlaying] = useState(true);
  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  const playerRef = useRef(null);

  useEffect(() => {
    play();
    const handleKeyPress = (event) => {
      console.log(playerRef.current);
      if (playerRef.current) {
        if (event.keyCode === 37) {
          playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
        } else if (event.keyCode === 39) {
          playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
        } else if (event.keyCode === 32 || event.keyCode === 49) {
          setPlaying(!playing);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [playing, currSongId, playerRef]);

  return (
    <ReactPlayer
      autoFocus
      ref={playerRef}
      playing={playing}
      controls={true}
      disableDeferredLoading={true}
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
