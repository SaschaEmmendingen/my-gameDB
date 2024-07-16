import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import GameRouter from "./routes/games.js";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // adresse react-app
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));
const mongoURL =
  "mongodb+srv://SaschaE:iLoveEhle43@cluster0.u5hepbf.mongodb.net/mydatabase";

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(`/api/games`, GameRouter);

const PORT = process.env.PORT || 1312;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));