## URL SHORTENER
## Project Demo Video

YouTube Video:
https://youtu.be/V3tgSNQ7zlM


## Netlify
 https://app.netlify.com/projects/fantastic-eclair-5212aa/deploys/6a2d8eae13aa5e000853514f
# Full Stack URL Shortener with Analytics

A full-stack URL Shortener application built using the MERN Stack (MongoDB, Express.js, React.js, and Node.js). The application enables users to create shortened URLs, manage them through a personalized dashboard, and monitor link performance through analytics.
## Features

* User Authentication (Signup & Login)
* JWT-based Authorization
* URL Shortening
* Custom Short URLs
* Analytics Dashboard
* Click Tracking
* Responsive UI
* Secure REST APIs
* MongoDB Atlas Integration
## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT
## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Environment Variables

Create a `.env` file inside the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```
## Assumptions Made

* Users must register and log in before creating shortened URLs.
* MongoDB Atlas is used as the cloud database.
* Each shortened URL is unique.
* Analytics are tracked based on successful redirects.
* Users can view only their own URLs and analytics.
* Internet connectivity is available during application usage.
* JWT tokens are used for securing protected routes.
## AI Planning Document

### Problem Statement

Build a secure URL shortening platform that allows users to:

1. Create shortened URLs.
2. Manage URLs from a dashboard.
3. Monitor analytics for each shortened link.
4. Securely authenticate and authorize users.

### Planning Process

#### Phase 1: Requirement Analysis

* User Authentication
* URL Shortening
* Analytics Tracking
* Dashboard Management

#### Phase 2: System Design

* Frontend using React
* Backend using Express & Node.js
* MongoDB Atlas database
* JWT Authentication

#### Phase 3: Implementation

* Authentication APIs
* URL Shortening APIs
* Analytics APIs
* Dashboard UI

#### Phase 4: Testing

* Authentication testing
* URL redirection testing
* Analytics validation
* API testing


## Architecture Diagram

                ┌───────────────┐
                │   React App   │
                └───────┬───────┘
                        │
                 REST API Calls
                        │
                        ▼
                ┌───────────────┐
                │ Express Server│
                └───────┬───────┘
                        │
         ┌──────────────┼──────────────┐
         ▼                             ▼
 ┌─────────────┐               ┌─────────────┐
 │ JWT Auth    │               │ URL Service │
 └─────────────┘               └──────┬──────┘
                                      │
                                      ▼
                            ┌────────────────┐
                            │ Analytics Logic│
                            └──────┬─────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │ MongoDB Atlas│
                           └──────────────┘

## Project Structure

```text
frontend/
backend/
README.md
```
## Future Enhancements

* QR Code Generation
* Geo-location Analytics
* Device Analytics
* Link Expiration
* Custom Domains
* Password-Protected URLs

## Author

Indhu A

##  This project is a part of a hackathon run by https://katomaran.com
