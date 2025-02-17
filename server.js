const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/huile_argan", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modèle de commande
const Commande = mongoose.model("Commande", {
    client: String,
    produits: Array,
    total: Number,
    date: { type: Date, default: Date.now }
});

// Endpoint pour enregistrer une commande
app.post("/commande", async (req, res) => {
    try {
        const nouvelleCommande = new Commande(req.body);
        await nouvelleCommande.save();
        res.status(201).json({ message: "Commande enregistrée !" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// Lancer le serveur
app.listen(3000, () => console.log("Serveur en écoute sur le port 3000"));
