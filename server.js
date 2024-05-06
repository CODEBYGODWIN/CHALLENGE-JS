const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;
const db = new sqlite3.Database('database.db');

// Créer une table pour stocker les données des utilisateurs
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT)");
    db.run("CREATE TABLE IF NOT EXISTS budgets (email TEXT PRIMARY KEY, earned REAL, spent REAL)");
});

app.use(express.json());

// Enregistrement d'un nouvel utilisateur
app.post('/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    db.run("INSERT INTO users (email, password, firstName, lastName) VALUES (?, ?, ?, ?)", [email, password, firstName, lastName], (err) => {
        if (err) {
            res.status(500).send('Erreur lors de l\'enregistrement de l\'utilisateur.');
        } else {
            // Créer une entrée pour le budget de l'utilisateur
            db.run("INSERT INTO budgets (email, earned, spent) VALUES (?, 0, 0)", [email], (err) => {
                if (err) {
                    res.status(500).send('Erreur lors de la création du budget de l\'utilisateur.');
                } else {
                    res.send('Compte créé avec succès.');
                }
            });
        }
    });
});

// Connexion d'un utilisateur
app.post('/login', (req, res) => {
    const { firstName, password } = req.body;
    db.all("SELECT email FROM users WHERE email = ? AND password = ?", [firstName, password], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur lors de la connexion.');
        } else if (rows.length > 0) {
            res.json({ email: rows[0].email });
        } else {
            res.status(401).send('Identifiants incorrects.');
        }
    });
});

// Récupération des données de budget d'un utilisateur
app.get('/budget/:email', (req, res) => {
    db.get("SELECT * FROM budgets WHERE email = ?", [req.params.email], (err, row) => {
        if (err) {
            res.status(500).send('Erreur lors de la récupération des données de budget.');
        } else if (row) {
            res.json(row);
        } else {
            res.status(404).send('Budget non trouvé.');
        }
    });
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
