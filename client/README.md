# Dayflow HRMS – Frontend

A modern, responsive frontend for the Dayflow HRMS (Human Resource Management System), built with React and Tailwind CSS.  
This application handles user interaction, authentication flow, dashboards, and HR operations UI.

---

## ✨ Features

- Modern UI with Tailwind CSS
- Fully responsive design
- JWT-based authentication
- Protected routes
- Employee management
- Attendance tracking
- Leave management
- Payroll and payslip UI
- Role-based access control
- API-ready architecture
- Mock-friendly structure for backend integration

---

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Context API

---

## 📁 Project Structure

```text
client/
├── public/
│   ├── _redirects
│   └── vite.svg
├── src/
│   ├── assets/               # Static assets
│   ├── components/           # Reusable UI components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── config/               # Configuration files
│   │   └── api.js             # Axios setup
│   ├── context/              # Global state contexts
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/                # Page-level components
│   ├── App.jsx               # App root
│   ├── main.jsx              # Entry point
│   ├── App.css
│   └── index.css
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```
🚀 Getting Started
Prerequisites

Node.js 18+ and npm / yarn / pnpm
Installation

Navigate to the frontend directory:
```text
cd client
```

Install dependencies:
```text
npm install
```
