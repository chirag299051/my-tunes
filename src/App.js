import "./App.css";
import Header from "./Header/Header";
import SideMenu from "./Header/SideMenu";
import Footer from "./Footer/Footer";
import SupportModal from "./Main/SupportModal";
import Main from "./Main/Main";
import { strumming, songs1, songs2, songs3, lead, extras } from "./data";
import { createContext, useState } from "react";
import arrayShuffle from "array-shuffle";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Routes as Router, Route } from "react-router-dom";
import Player from "./Main/Player";

const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<Main />} />
      <Route path="/:type/:page/:id" element={<Player />} />
    </Router>
  );
};

export const context = createContext();

const options = [...songs1, ...songs2, ...songs3];

const shuffled = arrayShuffle(options)
  .slice(0, 20)
  .sort((a, b) => (a.id > b.id ? 1 : -1));

function App() {
  const [data] = useState({
    strumming,
    songs1,
    songs2,
    songs3,
    lead,
    extras,
  });

  const [isShuffle, setIsShuffle] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <context.Provider
      value={{
        data,
        options,
        shuffled,
        isShuffle,
        setIsShuffle,
        activePage,
        setActivePage,
        setShowSupportModal,
      }}
    >
      <Header />
      {/* <SideMenu /> */}
      <Routes />
      <Footer />
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </context.Provider>
  );
}

export default App;
