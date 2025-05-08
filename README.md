# Full Stack Music App 🎵 – Assessment Submission

This repository is part of a technical assessment project. It consists of a full stack application featuring:

- `frontend/` – Nuxt 3
- `backend/` – Node.js (Express.js) + Prisma ORM
- `PostgreSQL` – As the database
- `Docker Compose` – For orchestrating services

---

## 🚀 How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/thanadon-tkp/Music-Playlist.git
cd Music-Playlist
```

---

### 2. Start all services with Docker Compose

```bash
docker-compose up --build
```

This will:
- Build and run the frontend and backend containers
- Start the PostgreSQL database container
- Automatically install dependencies and build the applications

---

## 🔗 Access URLs

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:3000      |
| Backend   | http://localhost:4000/api  |
| Database  | localhost:5432 (PostgreSQL)|

---

## 🛠 Additional Commands

### View logs
```bash
docker-compose logs -f
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes
```bash
docker-compose down -v
```

---

## 📁 Project Structure

```
.
├── frontend/          # Nuxt 3 frontend application
│   └── Dockerfile
├── backend/           # Express.js backend with Prisma
│   ├── Dockerfile
│   └── prisma/
├── docker-compose.yml
└── README.md
```

---

## 📦 Technologies Used

- Nuxt 3
- Express.js
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
