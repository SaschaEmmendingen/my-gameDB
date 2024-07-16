/* import express from "express";
import Music from "../models/music-schema.js";
import bodyParser from "body-parser";

const MusicRouter = express.Router();

MusicRouter.get(`/`, async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
MusicRouter.get(`/:id`, async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

MusicRouter.post(`/`, async (req, res) => {
  console.log("POST request body:", req.body);
  const { interpret, genre, subgenre } = req.body;
  const music = new Music({
    interpret: interpret,
    genre: genre,
    subgenre: subgenre,
  });
  try {
    const newMusic = await music.save();
    res.status(201).json(newMusic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
MusicRouter.put(`/:id`, async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { interpret, genre, subgenre } = req.body;
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      id,
      { interpret: interpret, genre: genre, subgenre: subgenre },
      { new: true }
    );
    if (!updatedMusic) {
      return res.status(404).json({ message: `Music not found` });
    }
    res.json(updatedMusic);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Internal Server Error` });
  }
});
MusicRouter.delete(`/:id`, async (req, res) => {
  try {
    await Music.findByIdAndDelete(req.params.id);
    res.json({ message: `Music deleted` });
  } catch (error) {
    res.status(500).json({ message: `Error deleting Music: ${error.message}` });
  }
});
export default MusicRouter;
 */

/* import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Music schema
const musicSchema = new mongoose.Schema({
  interpret: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: { type: String, required: true },
});

const Music = mongoose.model('Music', musicSchema);

// GET all music
router.get('/', async (req, res) => {
  try {
    const music = await Music.find();
    res.json(music);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new music
router.post('/', async (req, res) => {
  try {
    const { interpret, genre, subgenre } = req.body;
    const newMusic = new Music({ interpret, genre, subgenre });
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update music
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { interpret, genre, subgenre } = req.body;
    const updatedMusic = await Music.findByIdAndUpdate(id, { interpret, genre, subgenre }, { new: true });
    res.json(updatedMusic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE music
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Music.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; */

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// Music schema
const musicSchema = new mongoose.Schema({
  interpret: { type: String, required: true },
  genre: { type: String, required: true },
  subgenre: { type: String, required: true },
});

const Music = mongoose.model('Music', musicSchema);

// GET all music
router.get('/', async (req, res) => {
  try {
    const music = await Music.find();
    console.log("GET /api/music - returning all music:", music);
    res.json(music);
  } catch (err) {
    console.error("GET /api/music - error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// POST new music
router.post('/', async (req, res) => {
  try {
    const { interpret, genre, subgenre } = req.body;
    console.log("POST /api/music - received data:", req.body);
    const newMusic = new Music({ interpret, genre, subgenre });
    await newMusic.save();
    console.log("POST /api/music - saved new music:", newMusic);
    res.status(201).json(newMusic);
  } catch (err) {
    console.error("POST /api/music - error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// PUT update music
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { interpret, genre, subgenre } = req.body;
    console.log("PUT /api/music/:id - received data:", req.body);
    const updatedMusic = await Music.findByIdAndUpdate(id, { interpret, genre, subgenre }, { new: true });
    console.log("PUT /api/music/:id - updated music:", updatedMusic);
    res.json(updatedMusic);
  } catch (err) {
    console.error("PUT /api/music/:id - error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// DELETE music
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Music.findByIdAndDelete(id);
    console.log("DELETE /api/music/:id - deleted music with ID:", id);
    res.status(204).end();
  } catch (err) {
    console.error("DELETE /api/music/:id - error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

export default router;