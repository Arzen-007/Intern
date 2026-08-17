# Intern Portal

## Local setup

Create the local environment files from the committed templates and replace every placeholder with local values:

```bash
cp Server/.env.example Server/.env
cp Client/.env.example Client/.env
```

Install dependencies separately in `Server` and `Client`, then start the backend and frontend using the scripts in their respective `package.json` files. The backend defaults to port `5000`, and the Vite frontend is allowed by default from `http://localhost:5173`.

## Security defaults

Demo data seeding is disabled by default. To enable it for a disposable local database only, set `SEED_DEMO_DATA=true` and provide a `DEMO_USER_PASSWORD` with at least 12 characters. Never enable demo seeding against a production database. The backend CORS policy accepts only origins listed in `CLIENT_ORIGINS`.

Previously committed environment files must be treated as compromised. Rotate any database password and JWT secret that were ever used outside a local disposable environment before deploying this application.
