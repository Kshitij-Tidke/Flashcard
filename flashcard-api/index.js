
import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config({ path: './.env' });
const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.use(cors());
app.use(bodyParser.json());

// CRUD operations
// Get all flashcards
app.get('/flashcards', (req, res) => {
  db.query('SELECT * FROM flashcards', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new flashcard
app.post('/flashcards', (req, res) => {
  const { question, answer } = req.body;
  db.query('INSERT INTO flashcards (question, answer) VALUES (?, ?)', [question, answer], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, question, answer });
  });
});

// Update a flashcard
app.put('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  db.query('UPDATE flashcards SET question = ?, answer = ? WHERE id = ?', [question, answer, id], (err, results) => {
    if (err) throw err;
    res.json({ id, question, answer });
  });
});

// Delete a flashcard
app.delete('/flashcards/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM flashcards WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    res.json({ id });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
