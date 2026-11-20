# Task Tracker — Frontend

React client for the Task Tracker code test. It talks to the Express API in
[task-tracker-backend](https://github.com/wunnaaung-dev/task-tracker-backend).

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · TanStack Query · Axios · lucide-react

## Quick start

Requires **Node.js 22+**. The client needs the API, so start the backend first.

**1. Backend** (first terminal)

```bash
git clone https://github.com/wunnaaung-dev/task-tracker-backend.git
cd task-tracker-backend
npm run setup
```

API runs on http://localhost:3000 (interactive docs at http://localhost:3000/docs).

**2. Frontend** (second terminal)

```bash
git clone https://github.com/wunnaaung-dev/task-tracker-frontend.git
cd task-tracker-frontend
npm run setup
```

App runs on http://localhost:5173.

`npm run setup` checks the Node version, installs dependencies (`npm ci`), creates `.env` from
`.env.example`, checks that the API is reachable, and starts the dev server.

| Command | What it does |
| --- | --- |
| `npm run setup` | Install, create `.env`, start the dev server |
| `npm run setup -- --prod` | Same, but build and serve the production bundle |
| `npm run setup -- --no-dev` | Install and create `.env` only |



### Environment

| Variable | Default | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | `http://localhost:3000/api/v1` | Base URL of the API. Read at build time. |

## Features

**From the brief**

- Task list loaded from the API, with loading, error (with retry) and empty states
- Add a task with title and priority; the Add button is disabled while the title is empty or only spaces
- Toggle a task between active and completed
- Delete a task
- Filter by All / Active / Completed (uses the API's `?status=` query)
- Counter showing how many tasks are left (`1 task left` / `N tasks left`)

**Extras**

- Edit a task's title and priority in a modal
- Confirmation dialog before deleting
- Only the task list scrolls, so the form and filters stay in view

## Project structure

```
src/
├── app/                  # App root and providers (React Query)
├── components/ui/        # Shared UI: Button, IconButton, ToggleButton, Select, Dialog, ConfirmDialog, Spinner
├── features/tasks/
│   ├── api/              # Axios calls, one function per endpoint
│   ├── hooks/            # React Query hooks (useTasks, useCreateTask, useUpdateTask, useDeleteTask)
│   ├── components/       # TaskPage, TaskForm, TaskFilters, TaskList, TaskItem, TaskEditDialog, TasksLeft
│   ├── constants.ts
│   └── types.ts
└── lib/                  # Axios instance, query client, class-name helper
```

Code is grouped by feature, so everything about tasks lives in `features/tasks`. Generic UI pieces
live in `components/ui` and don't know about tasks.

## Assumptions and trade-offs

- **Server is the source of truth.** After every create, update or delete the task queries are
  invalidated and refetched, instead of updating the cache optimistically. It's simpler and always
  matches what the API validated, at the cost of a short wait on slow networks.
- **The counter always shows active tasks**, whatever filter is selected. It reuses the cached
  "active" query, so it doesn't add a request when that filter has already been loaded.
- **`GET /tasks/:id` isn't used by the UI.** The list already returns every field, so the edit
  dialog reuses the task from the list. The endpoint exists on the API as the brief asks.
- **No UI component library.** The UI is small, so Tailwind utilities plus a few shared components
  keep the bundle light. The select and dialogs are built by hand:
  - Dialogs use the native `<dialog>` element, which gives focus trapping, Esc-to-close and a
    backdrop for free.
  - The select follows the WAI-ARIA "select-only combobox" pattern. It doesn't support type-ahead
    search, which isn't needed for three options.
- **Form state uses `useState`.** With two fields per form this is enough; see improvements below.
- **Errors from the API are shown as returned** (`{ "error": "..." }`), next to the form or row
  that caused them.

## What I would improve with more time

- **React Hook Form** for the add and edit forms, to manage form state and validation more
  efficiently (fewer re-renders, validation rules defined once, easier to add more fields).
- **Unit tests** with Vitest and React Testing Library for the shared UI components
  (Select keyboard behaviour, Dialog, Button loading state) and the task components.
- **End-to-end tests** with Playwright covering the main flow: add → toggle → filter → edit → delete.
- **Localization** with react-i18next, starting with English and Burmese: move all UI text into
  translation files, handle plurals (`1 task left` / `3 tasks left`), and load a font that renders
  Myanmar script well.
- **Light / dark mode toggle.** The app already follows the system theme through CSS variables;
  next step is a toggle (Light / Dark / System) that overrides it and remembers the choice in
  `localStorage`, applied before the first paint to avoid a flash of the wrong theme.