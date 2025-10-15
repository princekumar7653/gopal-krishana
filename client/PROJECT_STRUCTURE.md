# Portfolio Project Structure

## Overview
This is a modern React portfolio application built with Vite, Tailwind CSS, and Redux Toolkit.

## Tech Stack
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management
- **React-Redux** - React bindings for Redux

## Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/        # Common components (Header, Footer)
│   │   ├── ui/            # UI components (Button, Card, etc.)
│   │   └── index.ts       # Component exports
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── index.ts       # Page exports
│   ├── store/             # Redux store
│   │   ├── slices/        # Redux slices
│   │   │   ├── uiSlice.ts
│   │   │   └── portfolioSlice.ts
│   │   └── index.ts       # Store configuration
│   ├── hooks/             # Custom hooks
│   │   └── redux.ts       # Typed Redux hooks
│   ├── utils/             # Utility functions
│   │   └── constants.ts   # App constants
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── assets/            # Images, icons, etc.
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # App entry point
│   └── index.css          # Global styles with Tailwind
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.ts         # Vite configuration with path aliases
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## Key Features

### 🎨 Styling
- **Tailwind CSS** with custom configuration
- **Dark/Light theme** support
- **Responsive design** utilities
- **Custom color palette** and typography

### 🔄 State Management
- **Redux Toolkit** for efficient Redux usage
- **Typed hooks** (useAppDispatch, useAppSelector)
- **UI slice** for theme and sidebar state
- **Portfolio slice** for projects, skills, and experience

### 🛠️ Development Experience
- **TypeScript** for type safety
- **Path aliases** for cleaner imports (@components, @pages, etc.)
- **ESLint** for code quality
- **Hot Module Replacement** with Vite

### 📱 Components
- **Reusable UI components** with TypeScript props
- **Responsive navigation** with mobile menu
- **Professional folder structure** for scalability

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import Button from '@components/ui/Button'
import { useAppSelector } from '@hooks/redux'
import { NAV_ITEMS } from '@utils/constants'
```

## Redux Store Structure

```typescript
interface RootState {
  ui: {
    theme: 'light' | 'dark'
    sidebarOpen: boolean
    loading: boolean
  }
  portfolio: {
    projects: Project[]
    skills: Skill[]
    experience: Experience[]
  }
}
```

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Open http://localhost:5173 in your browser

## Next Steps

- Add routing with React Router
- Implement portfolio data management
- Add animations and transitions
- Create contact form functionality
- Add project showcase components