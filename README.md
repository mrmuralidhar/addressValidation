# Node Address Validator (Beginner-friendly)

This repository is a small Node.js web application that demonstrates:

- A minimal Express server (`src/app.js`)
- Routes and middleware (`src/routes` and `src/middleware`)
- A simple controller that validates an address (`src/controllers`)

If you're learning Node.js, this project is structured to be easy to read and run locally.

## Quick Start

1. Install Node.js (v14+) and npm.
2. Clone the repo and install dependencies:

```bash
git clone https://github.com/mrmuralidhar/addressValidation.git
cd my-node-address-validator
npm install
```

3. Start the app:

```bash
npm start
```

4. Open `http://localhost:3000` in your browser.

## Useful environment variables

- `DISABLE_AUTH=true` — disable JWT verification for local development (default: off).
- `JWT_SECRET` — secret used to verify tokens (only relevant if auth is enabled).
- `VALIDATION_API_URL` — if set, the app will forward validation requests to this URL; otherwise a mocked response is returned (helpful for learning without external services).

Example (development run without auth):

```bash
DISABLE_AUTH=true npm start
```

## How it works (high level)

- `src/app.js` sets up Express and static file serving.
- `src/routes/index.js` defines the `POST /validate-address` endpoint.
- `src/middleware/auth.js` contains a small `verifyToken` middleware (which can be disabled).
- `src/controllers/validateAddress.js` handles input checks and either returns a mock result or forwards the request to a real validation API.

## Try it via curl

Local mock validation (auth disabled):

```bash
DISABLE_AUTH=true \
  curl -X POST http://localhost:3000/validate-address \
    -H "Content-Type: application/json" \
    -d '{"addressLine1":"123 Main St","city":"Anytown","state":"CA","zip":"12345"}'
```

## Next steps / learning suggestions

- Add form validation in the frontend (`src/public/index.html`).
- Replace the mock with a real validator by setting `VALIDATION_API_URL`.
- Implement proper authentication with an OAuth provider.
