# FeyaPlan - Project Management Application

![FeyaPlan Screenshot](./screenshots/dashboard.png)

## Overview

FeyaPlan is a modern project management application built with React.
It helps users organize projects, manage tasks, track progress, and customize
their workspace through a flexible settings system.

The application focuses on reusable components, centralized styling,
persistent user preferences, and a clean user experience.

---

## Features

### Dashboard
- Overview of projects and tasks
- Project statistics
- Progress tracking
- Activity overview

### Project Management
- Create projects
- Edit projects
- Delete projects
- Track project status
- Monitor completion progress

### Task Management
- Create and manage tasks
- Assign priorities
- Track task status
- Organize workflow

### Customization
- Light and dark themes
- Custom accent colors
- Compact mode
- Persistent user preferences

### Settings
- Profile settings
- Account settings
- Appearance settings
- Notification preferences
- Security settings
- Application preferences

---

## Technologies Used

### Frontend

- React
- JavaScript (ES6+)
- CSS3
- React Router
- Context API
- Local Storage

### Development Tools

- Vite
- npm
- Git

---

## Architecture

The application uses a component-based architecture.

src
│
├── components
│ ├── Dashboard
│ ├── Projects
│ ├── Tasks
│ └── Settings
│
├── context
│ └── SettingsContext
│
├── pages
│
├── styles
│
└── App.js


### State Management

Global application settings are managed through React Context.

The SettingsContext handles:

- Theme preferences
- Accent colors
- Notification settings
- Security preferences
- User preferences

Settings are persisted using localStorage.

---

## Design System

FeyaPlan uses a centralized CSS variable system.

Example:

```css
--primary
--surface
--background
--text
--success
--danger

Screenshots
Dashboard

(Add screenshot)

Projects

(Add screenshot)

Settings

(Add screenshot)

Installation

Clone the repository:

Navigate into the project:

cd feyaplan

Install dependencies:

npm install

Start the development server:

npm run dev
Future Improvements

Possible future features:

User authentication
Backend database integration
Team collaboration
Real-time notifications
Calendar integration
File attachments
Advanced analytics
Author

Your Name
Fezile Gulwa
Built as a React portfolio project.