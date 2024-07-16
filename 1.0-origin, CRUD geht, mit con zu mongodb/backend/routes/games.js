import express from "express";
import Game from "../models/game.js";

const GameRouter = express.Router();

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
GameRouter.post(`/`, async (req, res) => {
  const { title, developer, genre, rating } = req.body;
  const game = new Game({
    title: title,
    developer: developer,
    genre: genre,
    rating: rating,
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
  const { title, developer, genre, rating } = req.body;
  try {
    const updatedGame = await Game.findByIdAndUpdate(
      id,
      { title: title, developer: developer, genre: genre, rating: rating },
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
