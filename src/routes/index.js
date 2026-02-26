const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const router = express.Router();

// --- OAuth2 / JWT middleware sample ---
// Dummy secret for token verification; in a real app this would be
// stored securely and obtained from the auth provider or environment.
const DUMMY_SECRET = 'my_dummy_jwt_secret';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Missing Authorization header' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid Authorization format' });
    }

    const token = parts[1];
    try {
        // verify token (this will throw if invalid)
        const payload = jwt.verify(token, DUMMY_SECRET);
        // attach decoded payload to request for downstream handlers
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

// Apply middleware to route
router.post('/validate-address', verifyToken, async (req, res) => {
    const { addressLine1, addressLine2, city, state, zip } = req.body;
    const address = { addressLine1, addressLine2, city, state, zip };

    try {
        // pass along some user info from token if needed
        const config = {
            headers: {
                'Authorization': req.headers['authorization']
            }
        };
        const response = await axios.post('https://api.example.com/validate', address, config);
        res.json({ data: response.data, user: req.user });
    } catch (error) {
        res.status(500).json({ error: 'Error validating address' });
    }
});

module.exports = router;