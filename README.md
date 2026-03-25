# HireLite

A modern job portal platform built with React, TypeScript, and Vite — connecting candidates and employers through a premium, editorial-style user experience.

## ✨ Features

- **Job Discovery** — Browse, search, and filter job listings with an intuitive UI
- **Candidate Dashboard** — Track applications, saved jobs, and messages
- **Employer Dashboard** — Post jobs and manage applicants
- **Resume Analyzer** — AI-powered resume analysis tool
- **Salary Insights** — Explore salary data and market trends
- **Company Profiles** — Detailed company information pages
- **Authentication** — Role-based access for candidates and employers
- **Dark Mode** — Full theme support with smooth transitions
- **Responsive Design** — Optimized for all screen sizes

## 🛠️ Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | React 18                            |
| Language    | TypeScript                          |
| Build Tool  | Vite                                |
| Styling     | Tailwind CSS                        |
| Routing     | React Router v6                     |
| State       | Zustand                             |
| Animations  | Framer Motion                       |
| Icons       | Lucide React                        |
| Deployment  | Vercel                              |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/manthan270/hirelite.git
cd hirelite

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
hirelite/
├── src/
│   ├── components/
│   │   ├── home/         # Landing page sections
│   │   ├── jobs/         # Job listing components
│   │   ├── layout/       # Layout wrappers, Navbar, Footer
│   │   └── ui/           # Reusable UI primitives
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and constants
│   ├── pages/            # Route-level page components
│   ├── store/            # Zustand state stores
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Root app with routing
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
