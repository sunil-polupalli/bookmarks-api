const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// We resolve the path so the DB file is created in the root folder, not inside src/config
const dbPath = path.resolve(__dirname, '../../bookmarks.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database: ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create the table with the mandatory fields
        db.run(`CREATE TABLE IF NOT EXISTS bookmarks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            title TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL
        )`, (err) => {
            if (err) {
                console.error("Error creating table:", err);
            }
        });
    }
});

module.exports = db;