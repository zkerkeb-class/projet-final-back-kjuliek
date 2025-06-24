import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { register, login, logout } from "./controllers/authController.js"
import { getCurrentUser, updateCurrentUser, deleteCurrentUser } from "./controllers/userController.js";
import verifyToken from "./middlewares/verifytoken.js";

dotenv.config();

mongoose.connect('mongodb://localhost:27017/fourmapp-db').then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.log("Error connecting to MongoDB", err);
});

// Lire le fichier JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware pour CORS
app.use(cors())

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));



// Route GET de base

app.get("/", (req, res) => {
  res.send("bienvenue sur l'API de FourmApp");
});


// About login

app.post("/api/register", register);

app.post("/api/login", login);

app.post("/api/logout", verifyToken, logout);

// About me
app.get("/api/me", verifyToken, getCurrentUser);

app.put("/api/me", verifyToken, updateCurrentUser);

app.delete("/api/me", verifyToken, deleteCurrentUser);

app.post("/api/me/colonies/", verifyToken, addColony);

app.get("/api/me/colonies", verifyToken, getAllColony);

app.get("/api/me/colonies/:colonyId", verifyToken, getByIdColony);

app.put("/api/me/colonies/:colonyId", verifyToken, updateColony);

app.delete("/api/me/colonies/:colonyId", verifyToken, deleteColony);




// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur ${process.env.API_URL}`);
});