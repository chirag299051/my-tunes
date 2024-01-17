import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { songs1, songs2, extras } from "./data";
import { createContext, useState } from "react";
import arrayShuffle from "array-shuffle";

export const context = createContext();

function App() {
  const [data, setData] = useState({ songs1, songs2, extras });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalPage, setModalPage] = useState(null);
  const [currSongId, setCurrSongId] = useState(null);

  const shuffled = arrayShuffle([
    ...songs1,
    ...songs2,
    ...extras.filter((x) => x.id >= 60),
  ]).slice(0, 20);

  return (
    <context.Provider
      value={{
        data,
        shuffled,
        currSongId,
        setCurrSongId,
        showModal,
        setShowModal,
        modalType,
        setModalType,
        modalPage,
        setModalPage,
      }}
    >
      <Header />
      <Main />
      <Footer />
    </context.Provider>
  );
}

export default App;
