const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Connexion à la base de données SQLite (crée le fichier s'il n'existe pas)
const db = new sqlite3.Database('database.db');

// Création de la table 'users' si elle n'existe pas
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT)");
});

// Middleware pour parser le corps des requêtes
app.use(express.json());

// Route pour l'inscription d'un utilisateur
app.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    db.run("INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)", [email, password, firstName, lastName], (err) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur.');
        } else {
            res.send('Compte créé avec succès.');
        }
    });
});

// Route pour la connexion d'un utilisateur
// Route pour la connexion d'un utilisateur
app.post('/login', (req, res) => {
    const { firstName, password } = req.body;
    db.all("SELECT email FROM users WHERE firstName = ? AND password = ?", [firstName, password], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur lors de la connexion.');
        } else if (rows.length > 0) {
            // Si des utilisateurs sont trouvés, envoyer le premier email trouvé
            res.json({ email: rows[0].email }); // Renvoyer l'email de l'utilisateur connecté
        } else {
            res.status(401).send('Identifiants incorrects.');
        }
    });
});


// Route pour récupérer les données de l'utilisateur
app.get('/user/:email', (req, res) => {
    db.get("SELECT * FROM users WHERE email = ?", [req.params.email], (err, row) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données de l\'utilisateur.');
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).send('Utilisateur non trouvé.');
        }
    });
});

// Middleware pour servir les fichiers statiques depuis le dossier 'public'
app.use(express.static('public'));

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
