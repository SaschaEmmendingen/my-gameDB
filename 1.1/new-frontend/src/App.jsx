import "./App.css";
import AddGameForm from "../components/game-db.jsx";
import Header from "../components/header-music.jsx";
import Music from "../components/music-db.jsx";

function App() {
  return (
    <>
      <div>
        <Header />
        {/* <AddGameForm /> */}
        <Music />
      </div>
    </>
  );
}

export default App;
