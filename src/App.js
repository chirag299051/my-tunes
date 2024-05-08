import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { songs1, songs2, songs3, extras } from "./data";
import { createContext, useState } from "react";
import arrayShuffle from "array-shuffle";

import "react-bootstrap-typeahead/css/Typeahead.css";

import { Routes as Router, Route } from "react-router-dom";
import Player from "./Player";

const Routes = () => {
  return (
    <Router>
      <Route path="/" exact element={<Main />}></Route>
      <Route path="/:type/:page/:id" exact element={<Player />}></Route>
    </Router>
  );
};

export const context = createContext();

const options = [
  ...songs1,
  ...songs2,
  ...songs3,
  ...extras.filter((x) => x.id >= 75),
];

const shuffled = arrayShuffle(options)
  .slice(0, 20)
  .sort((a, b) => (a.id > b.id ? 1 : -1));

function App() {
  const [data, setData] = useState({ songs1, songs2, songs3, extras });
  const [modal, setModal] = useState(null);
  const [isShuffle, setIsShuffle] = useState(false);

  return (
    <context.Provider
      value={{
        data,
        options,
        shuffled,
        isShuffle,
        setIsShuffle,
        modal,
        setModal,
      }}
    >
      <Header />
      <Routes />
      <Footer />
    </context.Provider>
  );
}

export default App;
