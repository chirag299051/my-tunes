import React, { useContext, useRef, useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { context } from "../App";
import Song from "./Song";
import Playlist from "./Playlist";
import { Link, useNavigate, useParams } from "react-router-dom";
const Player = () => {
  const { data, isShuffle, shuffled } = useContext(context);
  const [playing, setPlaying] = useState(true);
  const [song, setSong] = useState(null);
  const playerRef = useRef(null);
  const navigate = useNavigate();
  const { strumming, songs1, songs2, songs3, lead, extras } = data;
  const { type, page, id } = useParams();
  const playerLabel =
    page === "0"
      ? "STRUMMING"
      : page === "4"
        ? "LEAD"
        : page === "5"
          ? "EXTRAS"
          : page >= 1 && page <= 3
            ? `PAGE ${page}`
            : "";
  const play = () => setPlaying(true);
  useEffect(() => {
    const currentSong = [
      ...strumming,
      ...songs1,
      ...songs2,
      ...songs3,
      ...lead,
      ...extras,
    ].find((x) => x.id == id);
    setSong(currentSong);
  }, [type, page, id, strumming, songs1, songs2, songs3, lead, extras]);
  useEffect(() => {
    play();
    const handleKeyPress = (event) => {
      if (playerRef.current) {
        if (event.keyCode === 37) {
          playerRef.current.seekTo(playerRef.current.getCurrentTime() - 5);
        } else if (event.keyCode === 39) {
          playerRef.current.seekTo(playerRef.current.getCurrentTime() + 5);
        } else if (event.keyCode === 32 || event.keyCode === 49) {
          setPlaying((currentPlaying) => !currentPlaying);
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [id]);
  const playlistSongs = isShuffle
    ? shuffled
    : page === "0"
      ? strumming
      : page === "1"
        ? songs1
        : page === "2"
          ? songs2
          : page === "3"
            ? songs3
            : page === "4"
              ? lead
              : extras;
  return (
    <div className="player-container">
      <div className="player-wrapper">
        <div className="player-header">
          <span className="player-page-label">{playerLabel}</span>
          {song && <Song song={song} />}
          <Link className="close-btn" to="/">
            CLOSE
          </Link>
        </div>
        <div className="player-main">
          <Playlist songs={playlistSongs} type={type} />
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
                `/${type}/${page}/${
                  id < 1 ? (Number(id) + 0.1).toFixed(1) : Number(id) + 1
                }`,
              )
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Player;
