# 🌿 VitalityHub — Student Health & Wellness Platform

A complete React + Vite frontend for FSAD-PS36: Student Health & Wellness Platform.

---

## 🚀 Quick Start

```bash
# 1. Create the project (already done — use this folder)
npm create vite@latest vitality-hub -- --template react

# 2. Navigate into the project
cd vitality-hub

# 3. Install all dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Install Commands

```bash
# Core dependencies
npm install react-router-dom @reduxjs/toolkit react-redux @tanstack/react-query

# UI
npm install bootstrap bootstrap-icons react-bootstrap
```

---

## 🔐 Demo Credentials

| Role    | Email                    | Password    |
|---------|--------------------------|-------------|
| Student | student@vitality.edu     | student123  |
| Admin   | admin@vitality.edu       | admin123    |

> You can also use the **quick login buttons** on the Login page.

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          ← Sticky nav with role badge + dropdown
│   ├── Navbar.css
│   ├── Footer.jsx          ← Links, social, crisis contacts
│   ├── Footer.css
│   ├── ResourceCard.jsx    ← Reusable article card (student & admin views)
│   ├── ResourceCard.css
│   ├── ProgramCard.jsx     ← Program with enroll/unenroll + progress
│   ├── ProgramCard.css
│   ├── ProgressBar.jsx     ← Animated progress bar component
│   └── ProgressBar.css
│
├── pages/
│   ├── Home.jsx            ← Public landing page with hero, features, CTA
│   ├── Home.css
│   ├── Login.jsx           ← Auth with quick-login pills
│   ├── Register.jsx        ← Role selector + password strength
│   ├── Auth.css            ← Shared auth styles
│   ├── StudentDashboard.jsx ← Wellness ring, active programs, appointments
│   ├── StudentDashboard.css
│   ├── AdminDashboard.jsx  ← Metrics, resource/program mgmt, analytics
│   ├── AdminDashboard.css
│   ├── Resources.jsx       ← Searchable, filterable resource library
│   ├── Resources.css
│   ├── Programs.jsx        ← Enroll/unenroll with modal confirmation
│   ├── Programs.css
│   ├── Support.jsx         ← Crisis banner, services, contacts, FAQ
│   └── Support.css
│
├── context/
│   └── AuthContext.jsx     ← Mock auth (Context API) + localStorage
│
├── store/
│   ├── store.js            ← Redux Toolkit store
│   ├── programsSlice.js    ← Programs state + enroll/filter actions
│   ├── resourcesSlice.js   ← Resources state + search/filter actions
│   └── adminSlice.js       ← Admin metrics + announcements
│
├── hooks/
│   └── useData.js          ← React Query hooks (wellness, appointments, stats)
│
├── App.jsx                 ← Routes + Protected/Public route wrappers
├── main.jsx                ← App entry point (all providers)
└── index.css               ← Global styles, CSS variables, Bootstrap overrides
```

---

## 🧩 Tech Stack

| Technology              | Purpose                              |
|-------------------------|--------------------------------------|
| React 18                | UI framework                         |
| Vite                    | Build tool & dev server              |
| React Router DOM v6     | Client-side routing                  |
| Redux Toolkit           | Global state (programs, resources)   |
| React Query (TanStack)  | Data fetching with loading states    |
| Context API             | Authentication state                 |
| Bootstrap 5             | Grid, utilities, components          |
| Bootstrap Icons         | Icon library                         |
| Plain CSS per component | Custom styles & CSS variables        |

---

## 👤 Student Features

- **Dashboard** — Wellness score ring, active program progress, recommended resources, upcoming appointments
- **Programs** — Browse, enroll/unenroll with confirmation modal, filter by category, track progress
- **Resources** — Search + filter library of health articles, read-time, author info
- **Support** — Crisis banner with 988 hotline, 6 support services, emergency contacts, FAQ accordion

## ⚙️ Admin Features

- **Overview** — Platform metrics (students, resources, enrollments, appointments), recent resources table, platform health bars
- **Resources** — Full CRUD table (toggle active/inactive, delete), search
- **Programs** — Manage all programs, toggle status
- **Analytics** — Usage stats, top resources, weekly user chart

---

## 🔌 Connecting a Real Backend

When you're ready to add a backend:

1. Replace `MOCK_USERS` in `AuthContext.jsx` with real API calls
2. Replace mock data in `store/programsSlice.js` with `createAsyncThunk` API calls
3. Replace `useData.js` hooks with real fetch URLs: `queryFn: () => fetch('/api/wellness').then(r => r.json())`
4. Add JWT tokens to localStorage and attach as `Authorization: Bearer <token>` headers

---

## 📜 Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## 📝 Project Info

- **Project ID**: FSAD-PS36
- **Platform**: Student Health & Wellness
- **Framework**: React + Vite (JavaScript)
- **Version**: 1.0.0
