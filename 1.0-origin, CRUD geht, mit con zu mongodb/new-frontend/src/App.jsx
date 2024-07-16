import { useState } from "react";
import "./App.css";
import AddGameForm from "../components/new";
import Header from "../components/header.jsx";
// import Header2 from "../components/header2.jsx";

function App() {
  return (
    <>
      <div>
        <Header />
        {/* <Header2 /> */}
        <AddGameForm />
      </div>
    </>
  );
}

export default App;
