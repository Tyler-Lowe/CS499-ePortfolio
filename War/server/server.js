// Import dependencies using ES Module syntax
import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

// Extract Pool from pg
const { Pool } = pkg;

dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Database Configuration
const pool = new Pool({
    user: process.env.DB_USER || 'your_db_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'your_db_name',
    password: process.env.DB_PASSWORD || 'your_db_password',
    port: process.env.DB_PORT || 5432,
});

// Create table if not exists
pool.query(`
    CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE,
        wins INT DEFAULT 0,
        losses INT DEFAULT 0
    );
`);

// Route to get player stats
app.get('/api/stats/:playerName', async (req, res) => {
    const { playerName } = req.params;
    try {
        const result = await pool.query('SELECT * FROM players WHERE name = $1', [playerName]);
        res.status(200).json(result.rows[0] || { name: playerName, wins: 0, losses: 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to save game results
app.post('/api/game', async (req, res) => {
    const { playerName, didWin } = req.body;
    try {
        let query = didWin
            ? `UPDATE players SET wins = wins + 1 WHERE name = $1 RETURNING *`
            : `UPDATE players SET losses = losses + 1 WHERE name = $1 RETURNING *`;

        let result = await pool.query(query, [playerName]);
        if (result.rowCount === 0) {
            await pool.query('INSERT INTO players (name, wins, losses) VALUES ($1, $2, $3)',
                [playerName, didWin ? 1 : 0, didWin ? 0 : 1]);
        }
        res.status(200).json({ message: 'Game recorded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
