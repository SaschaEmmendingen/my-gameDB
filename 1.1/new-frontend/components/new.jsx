/*import { useState, useEffect } from "react";
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
    <header className="header">h1<header/>
      <div className="title">Mein Header</div>
      <div className="dropdowns">
        <select value={menu1Selection} onChange={handleMenu1Change}>
          <option value="">Dropdown 1</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <select value={menu2Selection} onChange={handleMenu2Change}>
          <option value="">Dropdown 2</option>
          {menuOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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

export default Games; */

/* import { useState, useEffect } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    developer: "",
    genre: "",
    rating: "",
    image: null,
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

    if (!newGame.title || !newGame.genre || !newGame.rating) {
      console.error("All fields except developer are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newGame.title);
    formData.append("developer", newGame.developer);
    formData.append("genre", newGame.genre);
    formData.append("rating", newGame.rating);
    if (newGame.image) {
      formData.append("image", newGame.image);
      console.log("Image is included in FormData:", newGame.image);
    }

    try {
      if (editingGameId) {
        await updateGame(editingGameId, formData);
      } else {
        await addGame(formData);
      }
      setNewGame({
        title: "",
        developer: "",
        genre: "",
        rating: "",
        image: null,
      });
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
            "Content-Type": "multipart/form-data",
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
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setGames(games.map((game) => (game._id === id ? response.data : game)));
      console.log(`game updated ${updatedGame}`);
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
      image: null,
    });
    setEditingGameId(game._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewGame({ ...newGame, image: file });
    console.log("Selected image:", file);
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
        <input type="file" name="image" onChange={handleImageChange} />
        <button className="formbtn" type="submit">
          {editingGameId ? "Update Game" : "Add Game"}
        </button>
      </form>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <div className="gamelistentry">
              {game.title} - {game.developer} - {game.genre} - {game.rating}
              <br />  
              {game.image && (
                <img
                  src={`http://localhost:1312/upload/${game.image}`}
                  alt={game.title}
                  style={{
                    width: "1000px",
                    height: "auto",
                    border: "2px solid #00d8ff",
                    borderRadius: "5px",
                  }}
                />
              )}
            </div>
            <button className="listbtn" onClick={() => handleEdit(game)}>
              Edit
            </button>
            <button className="listbtn" onClick={() => deleteGame(game._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games; */

import { useState, useEffect } from "react";
import axios from "axios";

const Games = () => {
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: "",
    release: "",
    genre: "",
    rating: "",
    image: null,
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

    if (!newGame.title || !newGame.genre || !newGame.rating) {
      console.error("All fields except release are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newGame.title);
    formData.append("release", newGame.release);
    formData.append("genre", newGame.genre);
    formData.append("rating", newGame.rating);
    if (newGame.image) {
      formData.append("image", newGame.image);
      console.log("Image is included in FormData:", newGame.image);
    }

    try {
      if (editingGameId) {
        await updateGame(editingGameId, formData);
      } else {
        await addGame(formData);
      }
      setNewGame({
        title: "",
        release: "",
        genre: "",
        rating: "",
        image: null,
      });
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
            "Content-Type": "multipart/form-data",
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
      console.log(`Game updated:`, response.data);
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
      release: game.release,
      genre: game.genre,
      rating: game.rating,
      image: game.image,
    });
    setEditingGameId(game._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewGame({ ...newGame, image: file });
    console.log("Selected image:", file);
  };

  return (
    <div>
      <div className="search-input">
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
            name="release"
            value={newGame.release}
            onChange={handleChange}
            placeholder="Release"
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
            className="rating-input"
            required
          />
          <div className="file-upload">
            <input
              type="file"
              name="image"
              id="file"
              className="inputfile"
              onChange={handleImageChange}
            />
            <label id="upl" htmlFor="file">
              Upload Image
            </label>
          </div>
          <button className="formbtn" type="submit">
            {editingGameId ? "Update Game" : "Add Game"}
          </button>
        </form>
      </div>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <div className="gamelist-entry">
              <div className="card">
                <div className="entry-title">{game.title}</div>
                <div className="entry-text">
                  {game.genre} - {game.release} - Rating: {game.rating}
                </div>
                <div className="entry-image">
                  {game.image && (
                    <img
                      src={`http://localhost:1312/upload/${game.image}`}
                      alt={game.title}
                      style={{
                        width: "15vw",
                        height: "14vw",
                        border: "2px solid #00d8ff",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>
                <button className="listbtn" onClick={() => handleEdit(game)}>
                  Edit
                </button>
                <button
                  className="listbtn"
                  onClick={() => deleteGame(game._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Games;
