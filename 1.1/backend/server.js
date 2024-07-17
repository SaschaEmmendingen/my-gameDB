import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import GameRouter from "./routes/games.js";
import MusicRouter from "./routes/music.js";
import path from "path";
import { fileURLToPath } from 'url';
import authenticateJWT from "./auth/authenticateJWT.js";
import protectedRoutes from "./auth/protected.routes.js"
import authRoutes from './auth/auth.routes.js';

dotenv.config(); // Load environment variables

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// MongoDB connection
const mongoURL = process.env.MONGO_URI;
if (!mongoURL) {
  console.error("MONGO_URI not set in environment variables.");
  process.exit(1);
}

mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use(`/api/games`, GameRouter);
app.use(`/api/music`, MusicRouter);
app.use('/auth', authRoutes);
app.use('/protected', authenticateJWT, protectedRoutes);

// Server initialization
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));