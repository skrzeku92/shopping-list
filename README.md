# Fullstack App – React + Express

A simple fullstack application using React (frontend) and Node.js with Express (backend).

## 🧠 Project Structure

/
├── express-app/ # Backend (Node.js + Express)
└── (frontend dir) # Frontend (React + Vite)

shell
Kopiuj
Edytuj

## 🚀 How to Run the App

### 1. Backend (Express)

Navigate to the backend folder and start the server:

cd express-app
node index.js
Make sure you have Node.js installed.

2. Frontend (React)
From the root of the project (or your frontend folder), run the React app:

bash
Kopiuj
Edytuj
pnpm install    # Only needed on the first run
pnpm run dev
This project uses pnpm. If you don't have it installed, you can add it globally:

bash
Kopiuj
Edytuj
npm install -g pnpm
⚙️ Requirements
Node.js (v18+ recommended)

pnpm (you can also adapt for npm/yarn if needed)

📁 Sample Backend Endpoints
Your Express backend (in express-app/) might expose endpoints like:

bash
Kopiuj
Edytuj
GET    /api/status
POST   /api/data
🌐 After Running
Backend runs at: http://localhost:3000

Frontend (Vite) runs at: http://localhost:5173
```bash
