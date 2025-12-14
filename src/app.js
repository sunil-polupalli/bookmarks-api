const express = require('express');
const bookmarkRoutes = require('./routes/bookmarkRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Mount the routes
// Any request starting with /bookmarks will go to our bookmarkRoutes
app.use('/bookmarks', bookmarkRoutes);

module.exports = app;