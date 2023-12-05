const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: '192.168.65.9',
  user: 'root',
  password: 'root',
  database: 'Lawrence'
});

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err);
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Requête SQL pour vérifier l'utilisateur dans la base de données
  const sql = 'SELECT * FROM user WHERE email = ? AND passwd = ?';

  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erreur de requête SQL:', err);
      res.json({ success: false, message: 'Erreur de requête SQL' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Connexion réussie' });
    } else {
      res.json({ success: false, message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});