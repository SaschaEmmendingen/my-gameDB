import { useState, useEffect } from "react";
import axios from "axios";

const Music = () => {
  const [music, setMusic] = useState([]);
  const [newMusic, setNewMusic] = useState({
    interpret: "",
    genre: "",
    subgenre: "",
  });
  const [editMusicId, setEditMusicId] = useState(null);

  useEffect(() => {
    fetchMusic();
  }, []);

  const fetchMusic = async () => {
    try {
      const response = await axios.get("http://localhost:1312/api/music/");
      setMusic(response.data);
    } catch (error) {
      console.error(
        "Error fetching Music:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const addMusic = async (music) => {
    try {
      const response = await axios.post(
        "http://localhost:1312/api/music/",
        music,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMusic((prevMusic) => [...prevMusic, response.data]);
      console.log("Music added:", response.data);
    } catch (error) {
      console.error(
        "Error adding Music:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateMusic = async (id, updatedMusic) => {
    try {
      const response = await axios.put(
        `http://localhost:1312/api/music/${id}`,
        updatedMusic,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setMusic((prevMusic) =>
        prevMusic.map((music) => (music._id === id ? response.data : music))
      );
      console.log("Music updated:", response.data);
    } catch (error) {
      console.error(
        "Error updating Music:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteMusic = async (id) => {
    try {
      await axios.delete(`http://localhost:1312/api/music/${id}`);
      setMusic((prevMusic) => prevMusic.filter((music) => music._id !== id));
      console.log("Music deleted:", id);
    } catch (error) {
      console.error(
        "Error deleting Music:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!newMusic.interpret || !newMusic.genre || !newMusic.subgenre) {
      console.error("All fields are required");
      return;
    }

    const musicData = {
      interpret: newMusic.interpret,
      genre: newMusic.genre,
      subgenre: newMusic.subgenre,
    };

    try {
      if (editMusicId) {
        await updateMusic(editMusicId, musicData);
      } else {
        await addMusic(musicData);
      }
      setNewMusic({
        interpret: "",
        genre: "",
        subgenre: "",
      });
      setEditMusicId(null);
    } catch (error) {
      console.error(
        "Error saving Music:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEdit = (music) => {
    setNewMusic({
      interpret: music.interpret,
      genre: music.genre,
      subgenre: music.subgenre,
    });
    setEditMusicId(music._id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewMusic({ ...newMusic, [name]: value });
  };

  return (
    <div className="page-music">
      <div className="inputfields-music">
        <p className="h1-music">Music</p>
        <form className="form-music" onSubmit={handleSubmit}>
          <input
            className="input-music"
            type="text"
            name="interpret"
            value={newMusic.interpret}
            onChange={handleChange}
            placeholder="Interpret"
            required
          />
          <input
            className="input-music"
            type="text"
            name="genre"
            value={newMusic.genre}
            onChange={handleChange}
            placeholder="Genre"
            required
          />
          <input
            className="input-music"
            type="text"
            name="subgenre"
            value={newMusic.subgenre}
            onChange={handleChange}
            placeholder="Subgenre"
            required
          />
          <button className="formbtn-music" type="submit">
            {editMusicId ? "Update Music" : "Add Music"}
          </button>
        </form>
      </div>
      <ul className="ul-music">
        {music.map((music) => (
          <li key={music._id}>
            <div className="entrylist-music">
              <div className="card-music">
                <div className="title-music">{music.interpret}</div>
                <div className="text-music">
                  Genre: {music.genre} - Subgenre: {music.subgenre}
                </div>
                <button
                  className="edit-btn-music"
                  onClick={() => handleEdit(music)}
                >
                  Edit
                </button>
                <button
                  className="del-btn-music"
                  onClick={() => deleteMusic(music._id)}
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

export default Music;
