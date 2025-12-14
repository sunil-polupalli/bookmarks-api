const Bookmark = require('../models/bookmarkModel');
const validator = require('validator');

// Helper function to validate input
const validateInput = (data) => {
    const errors = [];
    if (!data.title || data.title.trim() === '') {
        errors.push("Title is required.");
    }
    if (!data.url || !validator.isURL(data.url)) {
        errors.push("Valid URL is required.");
    }
    return errors;
};

// 1. Get All Bookmarks
exports.getAllBookmarks = (req, res) => {
    Bookmark.getAll((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
};

// 2. Get Single Bookmark by ID
exports.getBookmarkById = (req, res) => {
    const id = req.params.id;
    Bookmark.getById(id, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Bookmark not found" });
        }
        res.status(200).json(row);
    });
};

// 3. Create Bookmark
exports.createBookmark = (req, res) => {
    // Validate input first
    const errors = validateInput(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const newBookmark = {
        url: req.body.url,
        title: req.body.title,
        description: req.body.description || "",
        created_at: new Date().toISOString()
    };

    Bookmark.create(newBookmark, (err, id) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        // Return 201 Created and the new object
        res.status(201).json({ id, ...newBookmark });
    });
};

// 4. Update Bookmark
exports.updateBookmark = (req, res) => {
    const id = req.params.id;
    
    // Validate input
    const errors = validateInput(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Check if bookmark exists before updating
    Bookmark.getById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Bookmark not found" });

        const updatedData = {
            url: req.body.url,
            title: req.body.title,
            description: req.body.description || ""
        };

        Bookmark.update(id, updatedData, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            
            // Return updated object, preserving original creation date
            res.status(200).json({ 
                id: parseInt(id), 
                ...updatedData, 
                created_at: row.created_at 
            });
        });
    });
};

// 5. Delete Bookmark
exports.deleteBookmark = (req, res) => {
    const id = req.params.id;

    // Check if it exists first (Requirement: 404 if not found)
    Bookmark.getById(id, (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: "Bookmark not found" });

        Bookmark.delete(id, (err) => {
            if (err) return res.status(500).json({ error: err.message });
            // Return 204 No Content
            res.status(204).send();
        });
    });
};