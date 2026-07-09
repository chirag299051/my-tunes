import React, { useContext } from "react";
import Page from "./Page";
import Tools from "./Tools";
import { context } from "../App";
const Main = () => {
  const { data, isShuffle, shuffled, setShowSupportModal } =
    useContext(context);
  const { songs1, songs2, songs3 } = data;
  const page1Songs = isShuffle ? shuffled : songs1;
  return (
    <div>
      <section className="main">
        <div className="wrapper">
          <div className="title">
            <div className="title-info">
              Your Guitar Learning Journey Starts Here
            </div>
            <button
              type="button"
              className="support"
              onClick={() => setShowSupportModal(true)}
            >
              Support This Project
            </button>
          </div>
          <div id="page-1">
            <Page songs={page1Songs} isShuffle={isShuffle} page={1} />
          </div>
          <div id="page-2">
            <Page songs={songs2} isShuffle={false} page={2} />
          </div>
          <div id="page-3">
            <Page songs={songs3} isShuffle={false} page={3} />
          </div>
        </div>
      </section>
      <Tools />
    </div>
  );
};
export default Main;
