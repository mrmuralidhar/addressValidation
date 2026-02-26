const axios = require('axios');

// Controller that encapsulates address validation logic.
// For beginners: if VALIDATION_API_URL is not set, a mock response is returned.
async function validateAddress(req, res) {
    const { addressLine1, addressLine2, city, state, zip } = req.body || {};

    // Basic input check for clarity for new developers
    if (!addressLine1 || !city || !state || !zip) {
        return res.status(400).json({ error: 'Please provide addressLine1, city, state and zip' });
    }

    const address = { addressLine1, addressLine2, city, state, zip };

    const apiUrl = process.env.VALIDATION_API_URL || null;

    try {
        if (!apiUrl) {
            // Return a mocked validated response so beginners can run locally without external services
            const mock = {
                valid: true,
                normalized: {
                    addressLine1: addressLine1.trim(),
                    addressLine2: addressLine2 || '',
                    city: city.trim(),
                    state: state.trim().toUpperCase(),
                    zip: zip.trim()
                },
                notes: 'Mock validation - set VALIDATION_API_URL to enable real API calls.'
            };
            return res.json({ data: mock });
        }

        // When VALIDATION_API_URL is set, forward the request to the external validator
        const config = { headers: { Authorization: req.headers['authorization'] || '' } };
        const response = await axios.post(apiUrl, address, config);
        return res.json({ data: response.data });
    } catch (err) {
        console.error('Validation error:', err.message || err);
        return res.status(500).json({ error: 'Error validating address' });
    }
}

module.exports = { validateAddress };
