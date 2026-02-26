const express = require('express');
const path = require('path');
const routes = require('./routes/index');

// Simple Express server setup. This file is intentionally small so
// beginners can focus on routing and controller logic in `src/routes`.
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON and form-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from `src/public` (HTML/CSS/JS for the frontend)
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});