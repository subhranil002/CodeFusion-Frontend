# CodeFusion Frontend

A collaborative, real-time code editor web application built with React, TypeScript, Vite, Redux Toolkit, Socket.IO, Tailwind CSS, and DaisyUI. CodeFusion enables multiple users to join a room and edit code together, with live updates, language switching, and user presence indicators.

## Features

- **Real-time collaborative code editing** powered by Socket.IO
- **Room-based sessions**: Join or create a room with a unique ID
- **Live user presence**: See who is in the room and who is typing
- **Language selection**: Switch between JavaScript, Python, and Java
- **Write lock**: Toggle between editable and read-only modes
- **Font size adjustment** for the code editor
- **Copy room ID** to clipboard for easy sharing
- **Responsive, modern UI** with Tailwind CSS and DaisyUI
- **Toasts and feedback** for user actions

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Socket.IO Client](https://socket.io/) for real-time communication
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for code editing
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) for styling
- [React Hook Form](https://react-hook-form.com/) for forms
- [React Router v7](https://reactrouter.com/)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A running backend server that exposes a Socket.IO endpoint for `/editor` (see `VITE_BACKEND_URL`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/subhranil002/CodeFusion-Frontend.git
   cd CodeFusion-Frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set environment variables:**
   - Create a `.env` file in the root directory.
   - Add your backend URL:
     ```env
     VITE_BACKEND_URL=http://localhost:5000
     ```

### Running the App

- **Development mode:**
  ```bash
  npm run dev
  ```
  The app will be available at [http://localhost:5173](http://localhost:5173) by default.

- **Production build:**
  ```bash
  npm run build
  npm run preview
  ```

### Linting
```bash
npm run lint
```

## Project Structure

```
src/
  components/CodePlayground/   # Editor, Sidebar, Header UI
  configs/                     # Socket.IO config
  pages/                       # JoinRoom, CodePlayground pages
  redux/                       # Redux store and slices
  router/                      # React Router setup
  index.css                    # Tailwind & DaisyUI imports
  App.tsx, main.tsx            # App entry points
```

