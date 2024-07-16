import express from "express";
import Game from "../models/game.js";
import multer from "multer";

const GameRouter = express.Router();
// Multer-Konfiguration für den Datei-Upload
const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload"); // Zielverzeichnis für die hochgeladenen Dateien
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`); // Eindeutiger Dateiname
  },
});

const upload = multer({ storage: multerConfig });

//!            GET
GameRouter.get(`/`, async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//!            GETbyID
GameRouter.get(`/:id`, async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//!            POST
GameRouter.post(`/`, upload.single('image'), async (req, res) => {
  const { title, release, genre, rating } = req.body;
  const image = req.file ? req.file.filename : null;
  const game = new Game({
    title: title,
    release: release,
    genre: genre,
    rating: rating,
    image: image
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//!            UPDATE
GameRouter.put(`/:id`, async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { title, release, genre, rating, image } = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { title: title, release: release, genre: genre, rating: rating, image: image },
      { new: true }
    );
    if (!updatedGame) {
      return res.status(404).json({ message: `Game not found` });
    }
    res.json(updatedGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
});

//!            DELETE
GameRouter.delete(`/:id`, async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: `Game deleted` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting game: ${error.message}` });
  }
});

export default GameRouter;
