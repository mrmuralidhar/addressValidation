// Simple authentication middleware for beginners.
// In production, use a proper auth provider and secure secret storage.
const jwt = require('jsonwebtoken');

const DUMMY_SECRET = process.env.JWT_SECRET || 'my_dummy_jwt_secret';

function verifyToken(req, res, next) {
    // Allow disabling auth during local development for easier testing
    if (process.env.DISABLE_AUTH === 'true') {
        req.user = { sub: 'local-dev', name: 'Developer (auth disabled)' };
        return next();
    }

    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid Authorization format' });
    }

    const token = parts[1];
    try {
        const payload = jwt.verify(token, DUMMY_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
}

module.exports = { verifyToken };
