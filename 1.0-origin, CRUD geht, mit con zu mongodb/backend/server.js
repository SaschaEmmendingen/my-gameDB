/* import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import GameRouter from "./routes/games.js";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURL =
  "mongodb+srv://SaschaE:iLoveEhle43@cluster0.u5hepbf.mongodb.net/mydatabase";
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(`/api/games`, GameRouter);

const PORT = process.env.PORT || 1312;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); */


/* import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://SaschaE:iLoveEhle43@cluster0.u5hepbf.mongodb.net/mydatabase';

// Optionen für MongoClient (ohne useNewUrlParser und useUnifiedTopology)
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    // Mit MongoDB verbinden
    await client.connect();
    console.log('Verbunden mit MongoDB');
    
    // Beispiel: Auf eine Sammlung zugreifen
    const database = client.db('mydatabase');
    const collection = database.collection('mycollection');

    // Beispiel: Operationen mit der Sammlung durchführen
    // ...

  } catch (error) {
    console.error('Fehler beim Verbinden mit MongoDB:', error);
  }
}

connectToMongoDB(); */

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import GameRouter from "./routes/games.js";

const app = express();
app.use(cors());
app.use(express.json());

const mongoURL =
  "mongodb+srv://SaschaE:iLoveEhle43@cluster0.u5hepbf.mongodb.net/mydatabase";
mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(`/api/games`, GameRouter);

const PORT = process.env.PORT || 1312;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));