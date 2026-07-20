# JobScout

Small full-stack job portal built with React (Vite) frontend and Node/Express backend.

## Quickstart (local)

1. Backend
```bash
cd backend
npm install
cp .env.example .env
# edit .env with your MongoDB and Cloudinary credentials
npm run dev
```

2. Frontend
```bash
cd frontend
npm install
cp .env.example .env
# (optional) set VITE_API_URL to your backend URL
npm run dev
```

Open the frontend in the browser (Vite default `http://localhost:5173`) and the backend runs on port `5000` by default.

## Useful commands
- Backend
  - `npm run dev` - start backend with nodemon
  - `npm start` - production run
- Frontend
  - `npm run dev` - start Vite dev server
  - `npm run build` - build production assets

## Environment
- Backend `.env.example` created at `backend/.env.example`
- Frontend `.env.example` created at `frontend/.env.example`

## Notes
- API base path: `/api/v1`
- Authentication: JWT cookie stored under `token` (httpOnly). Ensure CORS and cookie domain are configured when deploying.

If you'd like, I can:
- generate a Swagger/OpenAPI spec from the routes,
- add unit tests and CI pipeline, or
- create a Postman collection for the API.
