# CodeFusion Frontend

A collaborative, real-time code editor web application. CodeFusion enables multiple users to join a room and edit code together, with live updates, language switching, user presence indicators, and code execution—all in a modern, responsive UI.

## Features

- **Real-time collaborative code editing** (Socket.IO, Monaco Editor)
- **Room-based sessions**: Join or create a room with a unique ID
- **Live user presence**: See who is in the room and who is typing
- **Typing indicators**: Know when others are editing
- **Language selection**: Switch between supported languages (e.g., JavaScript, Python, Java)
- **Font size adjustment** for the code editor
- **User input modal**: Provide stdin for code execution
- **Terminal output**: View stdout, stderr, status, and execution time
- **Copy room ID** to clipboard for easy sharing
- **Responsive, modern UI** (Tailwind CSS, DaisyUI)
- **Toast notifications** for user actions and errors

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Socket.IO Client](https://socket.io/) for real-time communication
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) for code editing
- [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) for styling
- [React Hook Form](https://react-hook-form.com/) for forms
- [React Router v7](https://reactrouter.com/)
- [Axios](https://axios-http.com/) for API requests

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A running backend server that exposes:
  - REST API endpoints: `/api/v1/code/run`, `/api/v1/code/languages`
  - Socket.IO endpoint: `/editor`
- Backend must support CORS.

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

## Usage

1. **Join a Room:** Enter your name and a 4-character room ID to join or create a session.
2. **Collaborate:** Edit code in real-time with others. See who is present and who is typing.
3. **Switch Language:** Use the header to change the programming language for the session.
4. **Run Code:** Click "Run Code" to execute. Provide user input if needed via the modal.
5. **View Output:** See results, errors, and execution time in the terminal panel.
6. **Share Room:** Copy the room ID and invite others to join.

## Project Structure

```
src/
  apis/CodePlayground/        # API modules for code execution and language fetching
  components/CodePlayground/  # Editor, Sidebar, Header, Terminal, UserInput UI
  configs/                    # Axios and Socket.IO config
  pages/                      # JoinRoom, CodePlayground pages
  redux/                      # Redux store and slices
  router/                     # React Router setup
  types/                      # TypeScript type definitions
  index.css                   # Tailwind & DaisyUI imports
  App.tsx, main.tsx           # App entry points
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the terms of the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.

