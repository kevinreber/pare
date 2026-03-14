# CLAUDE.md - Pare Codebase Guide

## Project Overview

Pare is a student networking platform built with React. It provides a social feed, course tracking, study groups, tutoring, and messaging for college students. The app uses Firebase for authentication, database (Firestore), and hosting.

**Live URL:** https://pare-afb7e.web.app/

## Tech Stack

- **Framework:** React 16.13 (Create React App) with TypeScript 4.1
- **State Management:** Redux + Redux Thunk + react-redux-firebase + redux-firestore
- **UI:** Material-UI 4.x, Bootstrap 4.5, custom CSS
- **Backend:** Firebase 7.x (Auth, Firestore, Storage)
- **Routing:** React Router DOM 5.x
- **External APIs:** Berkeleytime API (course data), Google Maps/Places API
- **Proxy:** `https://www.berkeleytime.com` (configured in package.json)

## Quick Reference Commands

```bash
npm install     # Install dependencies
npm start       # Dev server at http://localhost:3000
npm test        # Run tests (Jest + React Testing Library, watch mode)
npm run build   # Production build to /build
```

## Project Structure

```
src/
├── App.js              # Root component — shows Login or authenticated layout
├── index.js            # Entry point, Redux store + Firebase provider setup
├── routes/             # Route definitions (all behind PrivateRoute)
├── pages/              # Page-level components (one dir per page)
│   ├── Feed/           # Social feed with posts
│   ├── Courses/        # Course list and management
│   ├── CourseInfo/     # Individual course details + assignments
│   ├── StudyGroups/    # Study group creation/browsing
│   ├── StudyGroupChat/ # Real-time group messaging
│   ├── Tutors/         # Tutor discovery
│   ├── Messages/       # Direct messaging
│   ├── Notifications/  # User notifications
│   ├── UserProfile/    # Profile viewing and editing
│   ├── Login/          # Google OAuth login page
│   ├── PostInfo/       # Single post detail view
│   └── Search/         # Global search
├── components/         # Reusable UI components
│   ├── layout/         # Header, NavBar, Loader
│   ├── forms/          # CourseForm, PostForm, StudyGroupForm, BeTutorForm
│   └── ...             # Modal, Button variants, Dialog, Notification
├── store/              # Redux state management
│   ├── actions/        # Action creators (thunks for Firebase calls)
│   │   ├── auth.js
│   │   ├── posts.js
│   │   ├── courses.js
│   │   ├── messages.js
│   │   ├── studyGroups.js
│   │   ├── availability.js
│   │   ├── courseCatalog.js
│   │   ├── modal.js
│   │   ├── flashMessages.js
│   │   ├── search.js
│   │   └── types.js    # Action type constants
│   └── reducers/       # Redux reducers
│       ├── rootReducer.js  # Combined reducer
│       ├── authReducer.js
│       ├── postsReducer.js
│       ├── courseReducer.js
│       └── ...
├── config/             # Firebase configuration (fbConfig)
├── auth/               # PrivateRoute component
├── utils/              # Helper functions (formatting, Firebase operations)
├── hooks/              # Custom hooks (useFields, useLocalStorageToken)
├── constants/          # Application constants
├── icons/              # SVG icons
└── images/             # Logo and static images
```

## Architecture & Patterns

### Data Flow
1. User actions trigger Redux thunk action creators
2. Thunks call Firebase/Firestore APIs
3. Firestore updates propagate through `react-redux-firebase` and `redux-firestore` listeners
4. Redux state updates trigger React re-renders

### Authentication
- Google OAuth via Firebase (`auth.signInWithPopup`)
- `auth.onAuthStateChanged` in `App.js` dispatches `setCurrentUser`
- Unauthenticated users see only the `<Login />` page
- Protected routes use `PrivateRoute` component checking Redux auth state

### Component Conventions
- **Functional components** with React Hooks throughout
- Pages have a directory with an `index.js` barrel export and a `components/` subdirectory
- Redux state accessed via `useSelector`, dispatched via `useDispatch`
- Material-UI components for UI elements, Bootstrap for grid layout

### Redux Store Structure
- `state.auth` — current user info
- `state.posts` — feed posts
- `state.courses` — user's courses
- `state.courseCatalog` — course catalog from Berkeleytime
- `state.assignments` — course assignments
- `state.availability` — tutor availability
- `state.modal` — global modal state (`isOpen`, content)
- `state.flashMessages` — notification/toast messages
- `state.firebase` — synced Firebase auth state (via react-redux-firebase)
- `state.firestore` — synced Firestore data (via redux-firestore)

### Firestore Collections
- `users`, `feeds`, `courses`, `study-groups`, `messages`, `availability`

## Testing

- **Framework:** Jest (via react-scripts) + React Testing Library
- **Location:** Test files are co-located with components (`*.test.js`)
- **Run:** `npm test` (launches in watch mode; press `a` to run all)
- **Coverage:** Minimal — 10 test files focused on component rendering
- Tests verify rendering, text content, and CSS classes

## Environment Variables

Required in `.env` (not committed):
```
REACT_APP_FIREBASE_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN
REACT_APP_FIREBASE_DATABASE_URL
REACT_APP_FIREBASE_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET
REACT_APP_FIREBASE_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID
REACT_APP_FIREBASE_MEASUREMENT_ID
```

## Coding Conventions

- Mix of `.js` and `.tsx` files — TypeScript is enabled but adoption is partial
- `strict: true` in tsconfig.json
- ESLint extends `react-app` (Create React App default)
- No Prettier configuration
- Import order: dependencies first, then components/helpers, then styles
- Comment headers (`/** Dependencies */`, `/** Components & Helpers */`) used in some files
- Index barrel exports for pages (`export { default as PageName } from './PageName'`)

## Deployment

- Firebase Hosting — configured in `firebase.json`
- Build directory: `/build`
- SPA routing: all routes rewrite to `index.html`
- Deploy via Firebase CLI: `firebase deploy`

## Key Considerations for AI Assistants

- **No CI pipeline** — there are no GitHub Actions or other CI/CD workflows. Run `npm test` and `npm run build` locally to verify changes.
- **Firebase credentials** — never commit `.env` files or Firebase API keys.
- **Mixed JS/TS** — existing files use both `.js` and `.tsx`. Match the extension of the file you're editing. New files can use TypeScript.
- **Redux patterns** — follow the existing thunk-based async action pattern when adding new features. Action types are defined in `src/store/actions/types.js`.
- **Material-UI v4** — the project uses MUI v4 APIs (e.g., `makeStyles`, `@material-ui/core`), not v5.
- **React 16** — class component lifecycle and hooks are both valid, but prefer hooks to match the existing codebase style.
