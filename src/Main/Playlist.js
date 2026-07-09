import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import PlaylistItem from "./PlaylistItem";
const Playlist = ({ songs }) => {
  const playlistRef = useRef(null);
  const { id } = useParams();
  useEffect(() => {
    const playlist = playlistRef.current;
    if (!playlist) return;
    const activeItem = playlist.querySelector(`[data-song-id="${id}"]`);
    if (!activeItem) return;
    activeItem.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [id, songs]);
  return (
    <div className="playlist" ref={playlistRef}>
      {songs.map((song) => (
        <div key={song.id} data-song-id={song.id}>
          <PlaylistItem item={song} />
        </div>
      ))}
    </div>
  );
};
export default Playlist;
