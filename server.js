const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY, password TEXT, firstName TEXT, lastName TEXT)");
});

app.use(express.json());

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

app.post('/login', (req, res) => {
    const { mail, password } = req.body;
    db.all("SELECT email FROM users WHERE email = ? AND password = ?", [mail, password], (err, rows) => {
        if (err) {
            res.status(500).send('Erreur lors de la connexion.');
        } else if (rows.length > 0) {
            res.json({ email: rows[0].email });
        } else {
            res.status(401).send('Identifiants incorrects.');
        }
    });
});

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'connect.html'));
});

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});
