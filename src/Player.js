import React, { useContext, useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { context } from "./App";
import Song from "./Song";
import Playlist from "./Playlist";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { RxCross1 } from "react-icons/rx";

const Player = () => {
  const { data, isShuffle, shuffled } = useContext(context);
  const [playing, setPlaying] = useState(true);
  const [song, setSong] = useState(null);

  const play = () => setPlaying(true);
  const navigate = useNavigate();

  const { strumming, songs1, songs2, songs3, extras } = data;
  const { type, page, id } = useParams();

  useEffect(() => {
    const song = [
      ...strumming,
      ...songs1,
      ...songs2,
      ...songs3,
      ...extras,
    ].find((x) => x.id == id);
    setSong(song);
  }, [type, page, id]);

  console.log("song: ", song);

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
  }, [playing, id, playerRef]);

  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-header">
          {song && <Song key={Math.random()} song={song} />}
          <Link className="close-btn" to="/">
            CLOSE
          </Link>
        </div>

        <div className="player-main">
          <Playlist
            songs={
              isShuffle
                ? shuffled
                : page == 0
                ? strumming
                : page == 1
                ? songs1
                : page == 2
                ? songs2
                : page == 3
                ? songs3
                : extras
            }
            type
          />

          <ReactPlayer
            className="player"
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
            url={type === "main" ? song?.url : song?.lyrics}
            onEnded={() =>
              navigate(
                `/${type}/${page}/${Number(id) + 1 ? Number(id) + 1 : 1}`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
