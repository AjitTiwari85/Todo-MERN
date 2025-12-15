# Todo App

A full-stack Todo application with user authentication built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User registration and login with JWT authentication
- Create, view, update, and delete tasks
- Protected routes for authenticated users
- Responsive UI with TailwindCSS and animations using Framer Motion

## Tech Stack

### Backend

- **Node.js** with **Express.js** for the server
- **MongoDB** with **Mongoose** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend

- **React** with **Vite** for fast development
- **React Router** for navigation
- **Axios** for API calls
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Icons** for icons

## Prerequisites

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either local installation or a cloud service like [MongoDB Atlas](https://www.mongodb.com/atlas)

## Setup Instructions

### 1. Clone or Download the Repository

Ensure you have the project files in a directory, e.g., `Serviots-Todo-App`.

### 2. Backend Setup

1. Open a terminal and navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   - Replace `your_mongodb_connection_string` with your MongoDB URI. For MongoDB Atlas, it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority`
   - Replace `your_jwt_secret_key` with a secure random string (e.g., generate one using an online tool or `openssl rand -base64 32`).

4. Start the backend server:

   - For development (auto-restart on changes):

     ```bash
     npm run dev
     ```

   - For production:

     ```bash
     npm start
     ```

   The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

1. Open a new terminal (keep the backend running) and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or check the terminal output for the exact URL).

## Usage

1. Open your browser and go to the frontend URL (e.g., `http://localhost:5173`).
2. Register a new account or log in with existing credentials.
3. Once logged in, you can create new tasks, view your tasks, edit them, or delete them.
4. Tasks are stored in the database and associated with your user account.

## API Endpoints
**Base URL:** `http://localhost:5000`

The backend provides the following API endpoints:

### Authentication

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a JWT token

### Tasks (Protected - requires authentication)

- `GET /tasks` - Get all tasks for the logged-in user
- `POST /tasks` - Create a new task
- `PUT /tasks/:id` - Update a specific task
- `DELETE /tasks/:id` - Delete a specific task

### API DOCUMENTATION

//Authentication APIs
1️# Register User

POST /auth/register

Body

{
  "name": "Ajit",
  "email": "ajit@example.com",
  "password": "password123"
}


Success (201)

{
  "message": "User registered successfully"
}




2️# Login User

POST /auth/login

Body

{
  "email": "ajit@example.com",
  "password": "password123"
}


Success (200)

{
  "token": "jwt_token_here"
}




//Token must be sent in headers for protected routes.

//Task APIs (Protected)
Authorization Header
Authorization: Bearer <JWT_TOKEN>



3️# Get All Tasks

GET /tasks

Success (200)

[
  {
    "_id": "65f1...",
    "title": "Learn MERN",
    "completed": false
  }
]




4️# Create Task

POST /tasks

Body

{
  "title": "Learn MERN",
  "description": "Build Todo App"
}


Success (201)

{
  "message": "Task created successfully"
}



5️# Update Task

PUT /tasks/:taskId

Body

{
  "title": "Updated Task",
  "completed": true
}


Success (200)

{
  "message": "Task updated successfully"
}



6# Delete Task

DELETE /tasks/:taskId

Success (200)

{
  "message": "Task deleted successfully"
}


