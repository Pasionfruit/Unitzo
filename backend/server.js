const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(path.join(__dirname, 'providers.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err);
    return;
  }
  console.log('Connected to SQLite database');
});

// Initialize database with schema
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    rating INTEGER NOT NULL,
    speed TEXT NOT NULL,
    description TEXT NOT NULL,
    price TEXT NOT NULL,
    offer_url TEXT NOT NULL,
    is_gold BOOLEAN NOT NULL DEFAULT 0
  )`);
});

// API Routes
app.get('/api/providers', (req, res) => {
  db.all('SELECT * FROM providers ORDER BY is_gold DESC, rating DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/providers/:id', (req, res) => {
  db.get('SELECT * FROM providers WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Provider not found' });
      return;
    }
    res.json(row);
  });
});

app.post('/api/providers', (req, res) => {
  const { title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold } = req.body;
  db.run(
    'INSERT INTO providers (title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID });
    }
  );
});

app.put('/api/providers/:id', (req, res) => {
  const { title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold } = req.body;
  db.run(
    'UPDATE providers SET title = ?, image_url = ?, image_alt = ?, rating = ?, speed = ?, description = ?, price = ?, offer_url = ?, is_gold = ? WHERE id = ?',
    [title, image_url, image_alt, rating, speed, description, price, offer_url, is_gold, req.params.id],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: 'Provider updated successfully' });
    }
  );
});

app.delete('/api/providers/:id', (req, res) => {
  db.run('DELETE FROM providers WHERE id = ?', [req.params.id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Provider deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 