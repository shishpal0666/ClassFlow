
# ClassFlow

ClassFlow is a modern, real-time Q&A web platform built with the MERN stack. It allows users to create questions, set answer deadlines, submit answers, and view all Q&A activity in real time—no page reloads required. The UI is fully responsive, supports light/dark mode, and provides a smooth experience on both desktop and mobile.

## Features
- Real-time Q&A with Socket.io (no reloads needed)
- Optional answer deadlines for questions
- Responsive, modern UI with light/dark mode
- User authentication and profile management
- Error handling with clear, user-friendly messages
- Mobile-first design

## Tech Stack
- **Frontend:** React, Tailwind CSS, DaisyUI, Redux
- **Backend:** Node.js, Express, MongoDB, Socket.io

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shishpal0666/ClassFlow.git
   cd ClassFlow
   ```
2. Install dependencies for both client and server:
   ```bash
   cd ClassFlow-Server
   npm install
   cd ../ClassFlow-Client
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `ClassFlow-Server` and `ClassFlow-Client` and fill in the required values.

### Running the App
1. Start the backend server:
   ```bash
   cd ClassFlow-Server
   npm start
   ```
2. Start the frontend dev server:
   ```bash
   cd ../ClassFlow-Client
   npm run dev
   ```
3. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Usage
- Sign up or log in.
- Create a new question (optionally set an answer deadline).
- Share the question code with others.
- Submit and view answers in real time.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
