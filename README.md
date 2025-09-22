# Questly

Questly is a Kahoot-like game-based learning platform. Users can create, host, and play quizzes. Admins and Founders have dashboards to manage the system and roles.

## Quickstart
1. Copy repo locally.
2. In `backend/`, copy `.env.example` to `.env` and set `DATABASE_URL` + `JWT_SECRET`.
3. Start with Docker Compose: `docker compose up --build`.
4. Run `npx prisma migrate dev --name init` in backend folder.

## Features
- User accounts & roles (player, host, moderator, admin, founder).
- Host & play games with join codes.
- Admin panel for managing users/roles.
- Founder panel for system-wide controls.
- Role-based access like Discord but for a learning game site.

## Roadmap
- Full quiz/game flow in backend + frontend.
- Advanced game modes beyond quizzes.
- Reporting, moderation, and analytics.

---
MIT License
