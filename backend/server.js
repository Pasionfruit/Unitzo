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
const dbPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, 'providers.db')
  : path.join(__dirname, '../providers.db');

const db = new sqlite3.Database(dbPath, (err) => {
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

// Serve static files from the frontend build directory in production
if (process.env.NODE_ENV === 'production') {
  const frontendBuild = path.join(__dirname, '../frontend/build');
  
  // Check if frontend build exists
  if (require('fs').existsSync(frontendBuild)) {
    app.use(express.static(frontendBuild));
    
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendBuild, 'index.html'));
    });
  } else {
    console.error('Frontend build directory not found!');
    app.get('*', (req, res) => {
      res.status(500).send('Frontend build not found. Please ensure the build process completed successfully.');
    });
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Database path: ${dbPath}`);
}); 