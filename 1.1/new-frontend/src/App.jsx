import "./App.css";
import AddGameForm from "../components/game-db.jsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "../components/header-music.jsx";
import Music from "../components/music-db.jsx";
import Login from "../auth/Login.jsx";
import Protected from "../auth/Protected.jsx";
import React from "react";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/games" element={<AddGameForm />} />
          <Route path="/music" element={<Music />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;