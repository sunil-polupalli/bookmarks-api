const db = require('../config/database');

const Bookmark = {
    // 1. Get all bookmarks
    getAll: (callback) => {
        const sql = "SELECT * FROM bookmarks";
        db.all(sql, [], callback);
    },

    // 2. Get a single bookmark by ID
    getById: (id, callback) => {
        const sql = "SELECT * FROM bookmarks WHERE id = ?";
        db.get(sql, [id], callback);
    },

    // 3. Create a new bookmark
    create: (data, callback) => {
        const sql = "INSERT INTO bookmarks (url, title, description, created_at) VALUES (?, ?, ?, ?)";
        const params = [data.url, data.title, data.description, data.created_at];
        
        // Note: We use 'function' here instead of an arrow function 
        // because we need access to 'this.lastID' (the ID of the new item)
        db.run(sql, params, function(err) {
            callback(err, this ? this.lastID : null);
        });
    },

    // 4. Update an existing bookmark
    update: (id, data, callback) => {
        const sql = "UPDATE bookmarks SET url = ?, title = ?, description = ? WHERE id = ?";
        const params = [data.url, data.title, data.description, id];
        db.run(sql, params, callback);
    },

    // 5. Delete a bookmark
    delete: (id, callback) => {
        const sql = "DELETE FROM bookmarks WHERE id = ?";
        db.run(sql, [id], callback);
    }
};

module.exports = Bookmark;