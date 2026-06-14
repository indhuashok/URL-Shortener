# URL-Shortener
## You-Tube Link
    https://youtu.be/V3tgSNQ7zlM
# Full Stack URL Shortener with Analytics
A full-stack URL Shortener application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). This application allows users to convert long URLs into short, shareable links while tracking detailed analytics such as clicks, user activity, and link performance.
##  Features
- User Authentication (Signup & Login)
- JWT-based Authorization
- URL Shortening
- Custom Short URLs
- URL Management Dashboard
- Click Tracking & Analytics
- Total Clicks & Unique Clicks Monitoring
- Secure REST APIs
- Responsive User Interface
- MongoDB Atlas Integration
##  Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JSON Web Tokens (JWT)

### Authentication Page
- User Signup
- User Login

### Dashboard
- View all shortened URLs
- Manage links
- Analytics Overview

### Analytics
- Total Clicks
- Unique Clicks
- Link Performance Tracking
##  Installation
### Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm start
```
## Environment Variables
Create a `.env` file inside the backend directory and add:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

CLIENT_URL=http://localhost:3000
##  Analytics Features

The application tracks:

- Total Clicks
- Unique Visitors
- Link Usage Statistics
- URL Performance Metrics
- User-specific Analytics
##  Project Structure

```text
project-root
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   └── server.js
│
└── README.md
##  Workflow

1. User registers or logs in.
2. User enters a long URL.
3. Application generates a short URL.
4. User shares the short URL.
5. Every click is recorded.
6. Analytics are displayed on the dashboard.

##  Key Learnings

- Full Stack Development using MERN
- JWT Authentication & Authorization
- REST API Development
- MongoDB Database Design
- Analytics Tracking
- Secure Web Application Development
- Frontend and Backend Integration
