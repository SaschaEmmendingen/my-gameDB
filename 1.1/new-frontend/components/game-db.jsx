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
      <div className="input-search">
        <p className="h1-games">Games</p>
        <form className="form-games" onSubmit={handleSubmit}>
          <input
            className="input-games"
            type="text"
            name="title"
            maxLength={32}
            value={newGame.title}
            onChange={handleChange}
            placeholder="Game Title"
            required
          />
          <input
            className="input-games"
            type="text"
            name="release"
            maxLength={4}
            value={newGame.release}
            onChange={handleChange}
            placeholder="Release"
          />
          <input
            className="input-games"
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
            className="input-rating"
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
      <ul className="ul-games">
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
                <button className="edit-btn" onClick={() => handleEdit(game)}>
                  Edit
                </button>
                <button
                  className="del-btn"
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
