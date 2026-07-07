import React, { useContext, useEffect, useState } from "react";
import Page from "./Page";
import Tools from "./Tools";
import Footer from "./Footer";
import { context } from "./App";

const Main = () => {
  const { data, isShuffle, shuffled, activePage, support } =
    useContext(context);
  const { songs1, songs2, songs3 } = data;

  const [displayPage, setDisplayPage] = useState(activePage);
  const [pageTransition, setPageTransition] = useState("page-enter");

  const pages = {
    1: songs1,
    2: songs2,
    3: songs3,
  };

  useEffect(() => {
    if (activePage === displayPage) return;

    setPageTransition("page-exit");

    const timeout = setTimeout(() => {
      setDisplayPage(activePage);
      setPageTransition("page-enter");
    }, 50);

    return () => clearTimeout(timeout);
  }, [activePage, displayPage]);

  const currentSongs =
    displayPage === 1 && isShuffle ? shuffled : pages[displayPage];

  return (
    <div>
      <section className="main">
        <div className="wrapper">
          <div className="title">
            <div className="title-info">
              Your Guitar Learning Journey Starts Here
            </div>
            <button type="button" className="support" onClick={support}>
              Support This Project
            </button>
          </div>

          <div className={`page-transition ${pageTransition}`}>
            <Page
              songs={currentSongs}
              isShuffle={displayPage === 1 && isShuffle}
              page={displayPage}
            />
          </div>
        </div>
      </section>

      <Tools />

      <Footer />
    </div>
  );
};

export default Main;
