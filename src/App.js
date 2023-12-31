import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import { songs1, songs2, extras } from "./data";
import { createContext, useState } from "react";

export const context = createContext();

function App() {
  const [data, setData] = useState({ songs1, songs2, extras });
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalPage, setModalPage] = useState(null);
  const [currSongId, setCurrSongId] = useState(null);

  return (
    <context.Provider
      value={{
        data,
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
