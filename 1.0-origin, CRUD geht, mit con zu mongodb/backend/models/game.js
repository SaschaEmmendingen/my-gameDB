import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  developer: { type: String },
  genre: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;