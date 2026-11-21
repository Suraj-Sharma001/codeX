# CodeX - Full Stack Implementation

CodeX is a personal coding practice tracker and revision system built with JavaScript, React, Next.js, Express and MongoDB.

## Project Structure

```
├── backend/          # Express.js + Node.js server
├── frontend/         # Next.js React application
└── README.md        # Setup and usage
```

## Quick Start

### Prerequisites

- Node.js 22+ recommended (18+ minimum)
- MongoDB 6+
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Frontend runs on `http://localhost:3000`

## Features (Phase 1 - MVP)

✅ User Authentication (JWT-based)
✅ Problem CRUD Operations
✅ Dashboard with Statistics
✅ Problem Filtering and Search
✅ Responsive UI with Tailwind CSS

## Tech Stack

**Backend:**
- Node.js + Express.js
- JavaScript (ES modules)
- MongoDB + Mongoose
- JWT Authentication
- Winston Logging

**Frontend:**
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Zustand (State Management)
- Axios (API Client)
- React Hook Form

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login to account
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout

### Problems
- `GET /api/problems` - List problems (with filtering)
- `POST /api/problems` - Create new problem
- `GET /api/problems/:id` - Get problem details
- `PUT /api/problems/:id` - Update problem
- `DELETE /api/problems/:id` - Delete problem
- `POST /api/problems/:id/toggle-favorite` - Toggle favorite status
- `POST /api/problems/:id/mark-for-revision` - Mark for revision

### Analytics
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/topic-wise` - Topic-wise breakdown
- `GET /api/analytics/daily-activity` - Daily activity log

## Development

### Backend Development
```bash
cd backend
npm run dev       # Start dev server
npm run build     # Check JavaScript syntax
npm run lint      # Check code style
npm test          # Run unit tests
```

### Frontend Development
```bash
cd frontend
npm run dev       # Start dev server
npm run build     # Build for production
npm run lint      # Check code style
```

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/codetrack
JWT_SECRET=replace_with_a_long_random_secret
JWT_REFRESH_SECRET=replace_with_a_different_long_random_secret
FRONTEND_URLS=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Features and future improvements

- [x] Spaced repetition algorithm
- [x] Revision scheduling
- [x] Code syntax highlighting
- [ ] Advanced analytics
- [ ] Export to PDF/Markdown
- [x] Dark mode
- [ ] Email notifications
- [ ] Performance optimization
- [ ] Caching with Redis

## Testing APIs

Use Postman or Thunder Client to test endpoints:

1. Register/Login at `/api/auth/register` or `/api/auth/login`
2. Copy the returned token
3. Add `Authorization: Bearer <token>` header to other requests
4. Test endpoints

## Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
- Make sure MongoDB is running: `brew services start mongodb-community`
- Or use MongoDB Atlas connection string

### Port Already in Use
```
Kill existing process: lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### CORS Error
- Verify `FRONTEND_URLS` in backend .env matches frontend URL

## License

See the original project licensing terms. No new license is asserted by this conversion.

## JavaScript edition

The backend runs directly with Node.js and uses ES modules. The frontend uses JavaScript and JSX, with aliases configured in `jsconfig.json`. For PowerShell, use `Copy-Item .env.example .env` in the backend and `Copy-Item .env.example .env.local` in the frontend. Run the two dev servers in separate terminals.

Configure `FRONTEND_URLS` (comma-separated allowed origins) and `NEXT_PUBLIC_API_URL` for deployment. The AI endpoints optionally require `OPENAI_API_KEY`, or `AI_PROVIDER=gemini` and `GOOGLE_GEMINI_API_KEY`. Do not commit actual environment files.

Validation: backend syntax checks, static source parsing and local import checks, and four spaced repetition unit tests passed. The full dependency installation, Next.js production build, database-backed endpoints and browser flows have not been tested in this environment.
