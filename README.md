# FeyaPlan

FeyaPlan is a full-stack project and task management application designed to help users organize projects, manage tasks, track progress, and visualize deadlines through a calendar.

The application is built with a React frontend, an Express/Node.js REST API, and PostgreSQL for persistent data storage.

Authentication uses JWT tokens, while user passwords are securely hashed using bcryptjs.

---

## Live Application

### Frontend

https://feyaplan.onrender.com

### Backend API

https://feyaplan-api.onrender.com

The frontend and backend are deployed separately.

The React frontend communicates with the Express API, which connects to the production PostgreSQL database hosted through Neon.

---

# Features

## Authentication

- User registration
- Existing-user login
- JWT-based authentication
- Protected application routes
- Secure password hashing with bcryptjs
- Password change functionality
- Logout functionality
- Persistent login state
- User-specific data access

Users can log in using an account that already exists in the production database. Registration is only required when creating a new account.

---

## Projects

- Create projects
- Edit projects
- Delete projects
- View project details
- Project status tracking
- Project priority
- Project due dates
- Project progress based on associated tasks
- Projects are owned by the authenticated user

---

## Tasks

- Create tasks
- Edit tasks
- Delete tasks
- Task descriptions
- Task status tracking
- Task priority
- Task progress
- Task due dates
- Assign tasks to projects
- Search tasks
- Filter tasks by status
- Task statistics
- Delete confirmation
- User-specific task access

---

## Calendar

- Monthly calendar view
- Weekly calendar view
- Daily calendar view
- Tasks displayed according to their due dates
- Status-based task colors
- Click a task to view its details
- Edit tasks directly from the calendar
- Drag and drop tasks to change their due dates
- Calendar changes are persisted through the API

---

## Dashboard

- Project overview
- Task overview
- Progress information
- Activity and status information
- Dynamic application data

---

## Reports

- Project information
- Task information
- Progress information
- Status-based reporting
- Reports generated from current project and task data

---

## Settings

- Profile information
- Account settings
- Password management
- Appearance preferences
- Notification preferences
- Security preferences
- General preferences
- Application information
- Reset settings functionality

---

# Technology Stack

## Frontend

- React
- React Router
- JavaScript
- CSS
- FullCalendar

## Backend

- Node.js
- Express
- PostgreSQL
- pg
- bcryptjs
- JSON Web Tokens
- CORS
- dotenv

## Database

- PostgreSQL
- Neon PostgreSQL

## Deployment

- Render Static Site — React frontend
- Render Web Service — Express backend
- Neon — PostgreSQL database

---

# Application Architecture

FeyaPlan follows a client/server architecture.

```text
┌──────────────────────────┐
│                          │
│     React Frontend       │
│     Render Static Site   │
│                          │
└────────────┬─────────────┘
             │
             │ HTTPS / JSON
             │ JWT
             ▼
┌──────────────────────────┐
│                          │
│      Express API         │
│      Node.js Backend     │
│      Render Web Service  │
│                          │
└────────────┬─────────────┘
             │
             │ PostgreSQL
             ▼
┌──────────────────────────┐
│                          │
│    Neon PostgreSQL       │
│                          │

└──────────────────────────

The production services are:

Frontend
https://feyaplan.onrender.com

        ↓

Backend API
https://feyaplan-api.onrender.com

        ↓

Neon PostgreSQL

Authentication
FeyaPlan uses JWT authentication.

The authentication process is:
User
 │
 │ Email + Password
 ▼
React Frontend
 │
 │ POST /api/auth/login
 ▼
Express API
 │
 │ Find user by email
 ▼
PostgreSQL
 │
 │ User + password_hash
 ▼
bcryptjs
 │
 │ Compare supplied password
 │ with stored password hash
 ▼
JWT Token
 │
 ▼
React Application
 │
 │ Store authentication information
 ▼
Authenticated API Requests
Passwords are never stored as plain text.

During registration, the backend hashes the supplied password:
const passwordHash = await bcrypt.hash(password, 10);

During login, the supplied password is compared against the stored hash:
const passwordMatch = await bcrypt.compare(
    password,
    user.password_hash
);
A successful login generates a JWT:
const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
);

Protected requests use:
Authorization: Bearer <token>
The backend validates the token using the authentication middleware before allowing access to protected resources.

User Data Isolation
Projects and tasks are associated with the authenticated user's ID.

For example:
SELECT *
FROM projects
WHERE user_id = $1;

Tasks follow the same ownership model.

The API also verifies project ownership before allowing tasks to be associated with a project.

This prevents users from accessing or modifying project and task data belonging to another user.

Database
FeyaPlan uses PostgreSQL for persistent data storage.

The production database is hosted using Neon.

The main tables are:
users
projects
tasks

Users
Stores account and profile information.

Important fields include:
id
name
email
password_hash
avatar
phone
job_title
bio
created_at
updated_at

Projects
Stores projects belonging to users.

Important fields include:
id
name
description
status
priority
due_date
user_id

Tasks
Stores tasks belonging to users and associated with projects.

Important fields include:
id
title
description
status
priority
progress
due_date
created_at
user_id
project_id

Database Relationships
The relationships are:

users.id
   │
   ├────────────── projects.user_id
   │
   └────────────── tasks.user_id


projects.id
   │
   └────────────── tasks.project_id

his means:

One user can own multiple projects.

One user can own multiple tasks.

A project can contain multiple tasks.

A task belongs to a project.

Projects and tasks are associated with their owning user.

Foreign keys enforce these relationships at the database level.

REST API
The backend provides REST API endpoints for authentication, projects, and tasks.

Authentication
Register

POST /api/auth/register

Creates a new user account.

Example request:
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "password"
}

Login
POST /api/auth/login

Authenticates an existing user and returns a JWT.

Example request:
{
  "email": "user@example.com",
  "password": "password"
}

Projects
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id

These endpoints require authentication.

Tasks
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

These endpoints require authentication.

Project Structure
The current repository is organized around the React frontend and Express backend.
feya-project/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Calendar/
│   │   ├── Layout/
│   │   ├── Project/
│   │   ├── Settings/
│   │   └── Task/
│   │
│   ├── context/
│   │   ├── AuthContext.js
│   │   ├── ProjectContext.js
│   │   └── TaskContext.js
│   │
│   ├── pages/
│   │
│   └── ...
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
├── .gitignore
├── package.json
├── package-lock.json
└── README.md

The exact component structure may continue to evolve as the application is developed.

Getting Started
Prerequisites
Install the following:

Node.js

npm

PostgreSQL for local database development

For production, FeyaPlan uses Neon PostgreSQL instead of a local PostgreSQL server.

Clone the Repository
git clone https://github.com/fezile-sudo/feya-project.git
cd feya-project

Install Dependencies
Install the frontend dependencies from the project root:
npm install

Install the backend dependencies:
cd server
npm install

cd server
npm install
Environment Variables
Environment variables must not be committed to Git.

The backend uses environment variables for database access and JWT authentication.

Backend .env
Create:
server/.env

Example:
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secure_random_secret

Frontend Environment Variables
The React frontend uses:
REACT_APP_API_URL=https://feyaplan-api.onrender.com
For local development, this can instead point to the local backend:
REACT_APP_API_URL=http://localhost:5000

The frontend uses this variable when making API requests:
const API_URL = process.env.REACT_APP_API_URL;

Production Environment
The production deployment uses separate environment configuration for the frontend and backend.

Render Static Site
Service:
feyaplan
Production URL: https://feyaplan.onrender.com
Required frontend environment variable:REACT_APP_API_URL=https://feyaplan-api.onrender.com

Render Web Service
Service: feyaplan-api
Production URL: https://feyaplan-api.onrender.com
Required backend environment variables: DATABASE_URL=<Neon PostgreSQL connection string>
JWT_SECRET=<secure JWT secret>

The backend reads these values through process.env.

Neon PostgreSQL
The production database is hosted using Neon PostgreSQL.

The production backend connects to Neon through: DATABASE_URL
The application database contains:users
projects
tasks

Local Development
Start the Backend
From the server directory: npm start
The backend normally runs on: http://localhost:5000
You should see: Server running on port 5000

Start the Frontend
From the project root: npm start
The React development server normally runs on: http://localhost:3000
The frontend should have: REACT_APP_API_URL=http://localhost:5000
when running against the local backend.

Development Request Flow
During development, requests generally follow this path:

React Component
      ↓
React Context
      ↓
Fetch API
      ↓
Express Route
      ↓
JWT Authentication
      ↓
Authorization / Ownership Check
      ↓
PostgreSQL
      ↓
API Response
      ↓
React State Update

For example, creating a task:

Task Form
   ↓
TaskContext
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

Deployment
FeyaPlan is deployed using Render.

The deployment is split into two services.

Frontend
Render Static Site
        │
        ▼
https://feyaplan.onrender.com
The frontend is built using: npm run build

Backend
Render Web Service
        │
        ▼
https://feyaplan-api.onrender.com

The backend is started using: npm start
which runs: node server.js

Deployment Relationship

GitHub
  │
  ├── main branch
  │
  ├──────────────► Render Static Site
  │                 │
  │                 └── React production build
  │
  └──────────────► Render Web Service
                    │
                    └── Node.js / Express API
                              │
                              ▼
                       Neon PostgreSQL

Changes pushed to the main branch can be deployed through the configured Render services.

Database Migration and Backups
PostgreSQL database backups can be created using PostgreSQL tools such as pg_dump.

The project database contains: users
projects
tasks
A database backup should be stored securely and should not be committed to the public Git repository if it contains user information.

Database backups may contain:

User email addresses

Profile information

Password hashes

Projects

Tasks

Other application data

Even though passwords are hashed, database backups should still be treated as sensitive.

Security
FeyaPlan uses several security practices.

Password hashing
Passwords are hashed using bcryptjs.

JWT authentication
Protected API routes require a valid JWT.

Parameterized SQL
Database queries use parameterized values rather than directly concatenating user input into SQL statements.

User ownership
Projects and tasks are associated with authenticated users.

Project ownership checks
The API verifies that a user owns a project before allowing operations involving that project.

Environment variables
Sensitive values such as: DATABASE_URL
JWT_SECRET

Error Handling
The API uses HTTP status codes to communicate common errors.

Examples include: 400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error

Example authentication error: {
  "error": "Invalid email or password"
}

Current Production Status
FeyaPlan currently has a working production deployment consisting of:

React frontend

Express/Node.js backend

Neon PostgreSQL database

JWT authentication

bcrypt password hashing

User registration

Existing-user login

Protected API routes

Project management

Task management

User-specific project and task data

Calendar functionality

Dashboard

Reports

Profile management

Account settings

Password management

Render deployment

The production frontend and backend communicate through the configured production API URL.

Known Development Considerations
The project is still under active development.

Areas that may require further refinement include:

Improved API error handling

More comprehensive automated testing

Improved loading and error states

Production security hardening

API documentation

Password reset/email functionality

Email verification

More advanced reporting

Task categories and tags

Project team members

Task comments

File attachments

Activity history

Notifications

More advanced calendar functionality

Future Improvements
Potential future enhancements include:

Password reset through email

Email verification

Two-factor authentication

More advanced reporting

Task categories and tags

Project team members

Task comments

File attachments

Activity history

Notifications

Improved calendar functionality

Automated testing

API documentation

Improved monitoring and logging

Production security hardening

Important Production Notes
The production database is separate from a developer's local PostgreSQL database.

The production application should always use the production Neon connection through: DATABASE_URL

The frontend should communicate with the production backend through: REACT_APP_API_URL
The backend should use: JWT_SECRET
for signing and validating authentication tokens.

These values should be configured through Render's environment-variable settings rather than committed to the repository.

License
This project is currently a personal/development project.

A formal open-source license can be added if the project is later released under an open-source license.

Author
Fezile Gulwa
FeyaPlan is a full-stack project and task management application built with:

React

Node.js

Express

PostgreSQL

Neon

JWT

bcryptjs

Render

Project Links
GitHub

https://github.com/fezile-sudo/feya-project

Live Application

https://feyaplan.onrender.com

Production API

https://feyaplan-api.onrender.com


