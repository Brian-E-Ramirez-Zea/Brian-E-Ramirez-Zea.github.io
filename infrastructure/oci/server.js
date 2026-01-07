const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors()); // Allow Netlify to connect

// Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Init Table
pool.query(`
  CREATE TABLE IF NOT EXISTS system_stats (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cpu_usage REAL,
    ram_usage REAL,
    temperature REAL,
    network_in REAL,
    network_out REAL
  );
`).catch(err => console.error('DB Init Error:', err));

// Middleware: Simple API Key Auth
const authenticate = (req, res, next) => {
  const key = req.headers['x-api-key'];
  if (key && key === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// POST: Receive stats from Pi (Protected)
app.post('/api/stats', authenticate, async (req, res) => {
  const { cpu, ram, temp, netIn, netOut } = req.body;
  try {
    await pool.query(
      'INSERT INTO system_stats (cpu_usage, ram_usage, temperature, network_in, network_out) VALUES ($1, $2, $3, $4, $5)',
      [cpu, ram, temp, netIn, netOut]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB Error' });
  }
});

// GET: Serve stats to Dashboard (Public or Protected)
app.get('/api/stats/latest', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM system_stats ORDER BY timestamp DESC LIMIT 1');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

// GET: History for charts
app.get('/api/stats/history', async (req, res) => {
  try {
    // Get last 50 records
    const result = await pool.query('SELECT * FROM (SELECT * FROM system_stats ORDER BY timestamp DESC LIMIT 50) sub ORDER BY timestamp ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'DB Error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
