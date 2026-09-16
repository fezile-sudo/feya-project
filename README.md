feyaPlan

feyaPlan is a full-stack project and task management application designed to help users organize projects, manage tasks, track progress, and visualize deadlines through a calendar.

The application uses a React frontend, an Express/Node.js backend, and PostgreSQL for persistent data storage. Authentication is handled using JWT tokens, with passwords securely hashed using bcrypt.

Features
Authentication

User registration

User login

JWT-based authentication

Protected application routes

Secure password hashing with bcrypt

Password change functionality

Logout functionality

User-specific data access

Projects

Create projects

Edit projects

Delete projects

View project details

Project status tracking

Project priority

Project due dates

Project progress based on associated tasks

Projects are owned by the authenticated user

Tasks

Create tasks

Edit tasks

Delete tasks

Task descriptions

Task status tracking

Task priority

Task progress

Task due dates

Assign tasks to projects

Search tasks

Filter tasks by status

Task statistics

Delete confirmation

User-specific task access

Calendar

Monthly calendar view

Weekly calendar view

Daily calendar view

Tasks displayed according to their due dates

Status-based task colors

Click a task to view its details

Edit tasks directly from the calendar

Drag and drop tasks to change their due dates

Calendar changes are persisted through the API

Dashboard

Project overview

Task overview

Progress information

Activity and status information

Data updates dynamically from the application state

Reports

Project and task information

Progress information

Status-based reporting

Data generated from the application's current project and task data

Settings

Profile information

Account settings

Password management

Appearance preferences

Notification preferences

Security preferences

General preferences

Application information

Reset settings functionality

Tech Stack
Frontend

React

React Router

FullCalendar

JavaScript

CSS

Backend

Node.js

Express

PostgreSQL

pg

bcryptjs

JSON Web Tokens

CORS

dotenv

Database

PostgreSQL is used for persistent storage.

The main data relationships include:

Users
  │
  ├── Projects
  │      │
  │      └── Tasks
  │
  └── Tasks


Projects and tasks are associated with the authenticated user.

Tasks are also associated with projects.

Application Architecture

The application follows a client/server architecture.

┌──────────────────────┐
│      React App       │
│      Frontend        │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           │ JWT
           ▼
┌──────────────────────┐
│    Express API       │
│      Backend         │
└──────────┬───────────┘
           │
           │ SQL
           ▼
┌──────────────────────┐
│     PostgreSQL       │
│       Database       │
└──────────────────────┘


The frontend communicates with the Express API.

The API authenticates requests using JWT tokens and performs database operations using PostgreSQL.

Authentication Flow

When a user logs in:

User
 │
 │ Email + Password
 ▼
Express API
 │
 │ Check user
 │
 │ bcrypt password verification
 ▼
JWT Token
 │
 ▼
React Application
 │
 │ Store token
 ▼
Authenticated API Requests


Protected API requests include the token:

Authorization: Bearer <token>


The backend validates the token before allowing access to protected resources.

User Data Isolation

Projects and tasks are associated with the authenticated user's ID.

For example, project queries use the authenticated user:

SELECT *
FROM projects
WHERE user_id = $1;


Task queries follow the same principle.

The API also verifies project ownership before allowing a task to be created or moved to a project.

This prevents users from accessing or modifying resources belonging to another user.

Database

The application uses PostgreSQL.

The main tables are:

Users

Stores account and profile information.

Typical fields include:

id
name
email
password_hash
avatar
phone
job_title
bio

Projects

Stores user-owned projects.

Typical fields include:

id
name
description
status
priority
due_date
user_id

Tasks

Stores user-owned tasks associated with projects.

Typical fields include:

id
title
description
status
priority
progress
due_date
created_at
project_id
user_id


Relationships:

users.id
   │
   ├──────── projects.user_id
   │
   └──────── tasks.user_id

projects.id
   │
   └──────── tasks.project_id

API

The backend provides REST API endpoints for authentication, projects, and tasks.

Authentication
POST /api/auth/register
POST /api/auth/login

Projects
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id


Protected endpoints require a valid JWT token.

Project Structure

A simplified project structure:

feyaPlan/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   ├── Calendar/
│   │   │   ├── Layout/
│   │   │   ├── Project/
│   │   │   ├── Settings/
│   │   │   └── Task/
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ProjectContext.jsx
│   │   │   ├── TaskContext.jsx
│   │   │   └── SettingsContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetails.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Calendar.jsx
│   │   │   ├── Reports.jsx
│   │   │   ├── Settings.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   └── utils/
│   │
│   └── package.json
│
├── server/
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md


The exact structure may vary depending on the final project organization.

Getting Started
Prerequisites

Make sure the following are installed:

Node.js

npm

PostgreSQL

Installation

Clone the repository and enter the project directory:

git clone <repository-url>
cd feyaPlan


Install the frontend dependencies:

cd client
npm install


Install the backend dependencies:

cd ../server
npm install

Environment Variables

Create a .env file inside the backend/server directory.

Example:

PORT=5000

DATABASE_URL=postgresql://username:password@localhost:5432/feyaplan

JWT_SECRET=your_secure_jwt_secret


Do not commit .env to version control.

Add it to .gitignore:

.env
node_modules/

Database Setup

Create a PostgreSQL database:

CREATE DATABASE feyaplan;


Create the required tables and constraints using the SQL schema for the project.

The database should include relationships between:

users
projects
tasks


Foreign keys should enforce the relationships between users, projects, and tasks.

Running the Application
Start the Backend

From the server directory:

npm start


The API runs on:

http://localhost:5000


You should see:

Server running on http://localhost:5000

Start the Frontend

From the client directory:

npm start


The React application will normally be available at:

http://localhost:3000

Development Workflow

During development, changes generally flow through:

React Component
      ↓
Context
      ↓
Fetch API
      ↓
Express Route
      ↓
Authentication Middleware
      ↓
PostgreSQL


For example, creating a task:

TaskForm
   ↓
TaskContext.addTask()
   ↓
POST /api/tasks
   ↓
JWT authentication
   ↓
Project ownership check
   ↓
INSERT INTO tasks
   ↓
PostgreSQL
   ↓
API response
   ↓
React state update

Security

The application uses several security measures:

Passwords are hashed using bcrypt.

Password hashes are never returned as part of normal user responses.

Protected API routes require JWT authentication.

Project ownership is verified before task assignment.

Database queries use parameterized SQL values.

User-specific resources are filtered by authenticated user ID.

Sensitive environment variables are stored outside the source code.

Error Handling

The API returns appropriate HTTP status codes for common failures.

Examples include:

400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error


Example:

{
    "error": "Invalid email or password"
}


The frontend can display these API errors to the user where appropriate.

Current Status

feyaPlan currently includes the main functionality required for a full-stack project and task management application.

Implemented:

Authentication       
PostgreSQL           
Express API          
JWT protection       
Projects             
Tasks                
Project ownership   
Task ownership       
Calendar             
Dashboard            
Reports              
Settings             
Profile management   
Password management  


The application is currently in the testing and refinement stage, where the focus is on error handling, edge cases, UI consistency, and general polishing.

Future Improvements

Potential future enhancements include:

Password reset through email

Email verification

More advanced reporting

Task categories/tags

Project team members

Task comments

File attachments

Activity history

More advanced calendar functionality

Notifications

Deployment configuration

Automated testing

API documentation

Production security hardening

These features are not required for the current core application and can be added incrementally.

License

This project is currently a private/personal project.

Add a license here if the project is later released publicly.

Author

Fezile Gulwa

A full-stack project and task management application built with React, Express, PostgreSQL, and JWT authentication.
