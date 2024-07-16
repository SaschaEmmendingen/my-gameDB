import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  // State für die Auswahl der Dropdown-Menüs
  const [menu1Selection, setMenu1Selection] = useState(null);
  const [menu2Selection, setMenu2Selection] = useState(null);
  const [menu3Selection, setMenu3Selection] = useState(null);

  // Dropdown-Menü Optionen
  const menuOptions = ["Option 1", "Option 2", "Option 3"];

  // Event Handler für Auswahländerungen
  const handleMenu1Change = (event) => {
    setMenu1Selection(event.target.value);
  };

  const handleMenu2Change = (event) => {
    setMenu2Selection(event.target.value);
  };

  const handleMenu3Change = (event) => {
    setMenu3Selection(event.target.value);
  };

  return (
    <header className="header">
      <div className="title">Mein Header</div>
      <div className="dropdowns">
        {/* Dropdown-Menü 1 */}
        <select value={menu1Selection} onChange={handleMenu1Change}>
          <option value="">Dropdown 1</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown-Menü 2 */}
        <select value={menu2Selection} onChange={handleMenu2Change}>
          <option value="">Dropdown 2</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Dropdown-Menü 3 */}
        <select value={menu3Selection} onChange={handleMenu3Change}>
          <option value="">Dropdown 3</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
const Games = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    developer: "",
    genre: "",
    rating: "",
  });
  const [editingGameId, setEditingGameId] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:1312/api/games/");
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Einfache Validierung
    if (!newGame.title || !newGame.genre || !newGame.rating) {
      console.error("All fields except developer are required.");
      return;
    }

    try {
      if (editingGameId) {
        await updateGame(editingGameId, newGame);
      } else {
        await addGame(newGame);
      }
      setNewGame({ title: "", developer: "", genre: "", rating: "" });
      setEditingGameId(null);
    } catch (error) {
      console.error("Error saving game:", error);
    }
  };

  const addGame = async (game) => {
    try {
      const response = await axios.post(
        "http://localhost:1312/api/games/",
        game,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setGames([...games, response.data]);
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  const updateGame = async (id, updatedGame) => {
    try {
      const response = await axios.put(
        `http://localhost:1312/api/games/${id}`,
        updatedGame,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setGames(games.map((game) => (game._id === id ? response.data : game)));
    } catch (error) {
      console.error("Error updating game:", error);
    }
  };

  const deleteGame = async (id) => {
    try {
      await axios.delete(`http://localhost:1312/api/games/${id}`);
      setGames(games.filter((game) => game._id !== id));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleEdit = (game) => {
    setNewGame({
      title: game.title,
      developer: game.developer,
      genre: game.genre,
      rating: game.rating,
    });
    setEditingGameId(game._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGame({ ...newGame, [name]: value });
  };

  return (
    <div>
      <h1>Games</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newGame.title}
          onChange={handleChange}
          placeholder="Game Title"
          required
        />
        <input
          type="text"
          name="developer"
          value={newGame.developer}
          onChange={handleChange}
          placeholder="Developer"
        />
        <input
          type="text"
          name="genre"
          value={newGame.genre}
          onChange={handleChange}
          placeholder="Genre"
          required
        />
        <input
          type="number"
          name="rating"
          value={newGame.rating}
          onChange={handleChange}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
          required
        />
        <button className="formbtn" type="submit">
          {editingGameId ? "Update Game" : "Add Game"}
        </button>
      </form>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <div className="gamelistentry">
              {game.title} - {game.developer} - {game.genre} - {game.rating}
            </div>
            <button className="listbtn" onClick={() => handleEdit(game)}>
              Edit
            </button>
            <button className="listbtn" onClick={() => deleteGame(game._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
