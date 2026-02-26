const express = require('express');
const router = express.Router();

// For clarity, auth middleware and controller logic have been moved
// to separate files under `src/middleware` and `src/controllers`.
const { verifyToken } = require('../middleware/auth');
const { validateAddress } = require('../controllers/validateAddress');

// POST /validate-address
// - Uses `verifyToken` middleware to check JWTs (can be disabled with DISABLE_AUTH=true)
// - Calls `validateAddress` controller which returns a mock result by default
router.post('/validate-address', verifyToken, validateAddress);

module.exports = router;