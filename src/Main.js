import React, { useContext } from "react";
import Page from "./Page";
import { context } from "./App";
import { Link } from "react-router-dom";

const Main = () => {
  const { data, isShuffle, setIsShuffle, shuffled } = useContext(context);

  const { songs1, songs2, songs3 } = data;
  const btnClass = isShuffle ? "btn-shuffle on" : "btn-shuffle";

  const handleShuffle = () => {
    if (isShuffle) {
      window.location.reload();
      return;
    }
    setIsShuffle(!isShuffle);
  };

  return (
    <div className="main">
      <div className="wrapper">
        <div className="flex-btn">
          <button className={btnClass} onClick={handleShuffle}>
            SHUFFLE
          </button>
        </div>
        <Page
          songs={!isShuffle ? songs1 : shuffled}
          isShuffle={isShuffle}
          page={1}
        />
        <Page songs={songs2} page={2} />
        <Page songs={songs3} page={3} />
      </div>
    </div>
  );
};

export default Main;
