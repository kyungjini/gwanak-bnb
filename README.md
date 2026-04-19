# gwanak-bnb

## Backend setup

This repo now includes an Express + Mongoose backend scaffold under `backend/`.

### Environment

Create a `.env` file at the repo root or inside `backend/` and set:

- `MONGODB_URI` or `URI`
- `PORT` (optional, defaults to `3000`)
- `CORS_ORIGIN` (optional, defaults to the current origin)

### Commands

- `npm run server` starts the backend
  - `curl http://localhost:3000/api/health` to check server status (mongoDB)
- `npm run dev:server` starts the backend with Node watch mode