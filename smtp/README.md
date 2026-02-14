# SMTP Testing Platform

A comprehensive SMTP testing platform built with React, Express.js, and MongoDB. Test SMTP connections, send test emails, and maintain a complete history of all SMTP operations.

## Features

- ✅ **SMTP Connection Testing** - Verify SMTP server connectivity
- 📧 **Send Test Emails** - Send emails through configured SMTP servers
- 📋 **Request History** - Track all SMTP tests and email sends with timestamps
- 🔒 **Security** - Helmet protection, CORS, rate limiting, password hashing
- 🐳 **Docker Support** - Full Docker and Docker Compose setup for easy deployment
- 🎨 **Modern UI** - React with Vite and TailwindCSS
- 💾 **MongoDB Integration** - Persistent storage of test results

## Quick Start

### Docker Deployment (Recommended)

```bash
docker-compose up --build
```

Then visit:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Local Development

**Backend:**
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Project Structure

### Root Level Files

- **docker-compose.yml** - Orchestrates MongoDB, Express backend, and React frontend containers. Defines services, ports, environment variables, and dependencies.

- **README.md** - Project documentation and setup instructions.

### Backend (`/backend`)

#### Configuration & Startup
- **backend/Dockerfile** - Docker image definition for Node.js 18 backend. Installs dependencies, copies source code, exposes port 5000, and starts the server.

- **backend/package.json** - Node.js project metadata and dependencies:
  - Production: `express`, `mongoose`, `nodemailer`, `cors`, `helmet`, `express-rate-limit`, `bcrypt`, `dotenv`
  - Dev: `nodemon`, `jest`, `supertest`

#### Core Application

- **backend/src/server.js** - Application entry point. Initializes Express app, connects to MongoDB, and starts the HTTP server on port 5000.

- **backend/src/app.js** - Express application factory. Configures middleware:
  - Helmet for security headers
  - CORS for cross-origin requests
  - Express JSON body parser
  - Rate limiting (15-minute windows, 50 requests max)
  - Routes for `/api/smtp` endpoints

#### Database

- **backend/src/config/db.js** - MongoDB connection module. Uses Mongoose to connect to MongoDB Atlas cluster. Handles connection errors and process termination.

- **backend/src/models/SmtpTest.js** - MongoDB schema for SMTP test records:
  - `host` - SMTP server hostname
  - `port` - SMTP server port number
  - `encryption` - Encryption type (TLS/SSL)
  - `from` - Sender email address
  - `to` - Recipient email address
  - `status` - Test result (SUCCESS/FAILED)
  - `response` - Server response message
  - `error` - Error message if failed
  - `timestamps` - Auto-managed createdAt/updatedAt

#### API Layer

- **backend/src/routes/smtpRoutes.js** - Express route definitions:
  - `POST /api/smtp/test` - Test SMTP connection
  - `POST /api/smtp/send` - Send email via SMTP
  - `GET /api/smtp/history` - Retrieve all test records
  - `GET /api/smtp/history/:id` - Get specific record by ID
  - `DELETE /api/smtp/history/:id` - Delete record by ID

- **backend/src/controllers/smtpController.js** - Request handlers:
  - `testConnection()` - Verifies SMTP credentials, saves result to DB
  - `sendEmail()` - Sends email with provided credentials, logs result
  - `getHistory()` - Retrieves all records sorted by newest first
  - `getById()` - Fetches single record
  - `deleteById()` - Removes record from database

#### Services

- **backend/src/services/smtpService.js** - Nodemailer transporter factory. Creates configured SMTP transporter with:
  - Host/port configuration
  - SSL/TLS encryption support
  - Authentication (username/password)
  - Connection timeout settings

#### Testing

- **backend/tests/smtpService.test.js** - Jest unit tests for smtpService. Mocks nodemailer and verifies transporter creation with various configurations.

### Frontend (`/frontend`)

#### Configuration & Building

- **frontend/Dockerfile** - Docker image for React frontend. Multi-stage: installs Node 18, builds with Vite, and runs preview server on port 5173.

- **frontend/package.json** - React project configuration:
  - Scripts: `dev` (Vite dev server), `build` (production build), `preview`
  - Production: `react`, `react-dom`, `react-router-dom`, `axios`
  - Dev: `vite`, `@vitejs/plugin-react`, `tailwindcss`

- **frontend/vite.config.js** - Vite build configuration. Enables React plugin and sets dev server port to 5173.

- **frontend/index.html** - HTML entry point. Links React app to DOM at `<div id="root">` and loads main.jsx.

#### Core Application

- **frontend/src/main.jsx** - React DOM initialization. Renders App component in strict mode at root element, imports global styles.

- **frontend/src/App.jsx** - Main application component. Sets up React Router with:
  - Navigation bar with Home and History links
  - Route to Home page (`/`)
  - Route to History page (`/history`)
  - Active link highlighting

#### API Integration

- **frontend/src/api.js** - Axios instance for backend communication. Configured with base URL `http://localhost:5000/api`.

#### Pages

- **frontend/src/pages/Home.jsx** - Home page. Displays SMTP testing form and instructions for testing connections and sending emails.

- **frontend/src/pages/History.jsx** - History page. Fetches SMTP test records from backend on mount and displays as formatted JSON.

#### Components

- **frontend/src/components/SmtpForm.jsx** - Main form component for SMTP testing. Manages form state for:
  - SMTP credentials (host, port, username, password)
  - Email details (from, to, subject, message)
  - Form submission to `/smtp/test` or `/smtp/send` endpoints
  - Result display as formatted JSON

#### Styling

- **frontend/src/styles.css** - Global stylesheet with dark theme (black background, light text). Defines:
  - Root colors and typography
  - App shell layout (max-width 1080px, centered)
  - Navigation bar with active state styling
  - Page card container styling
  - SMTP form grid layout (2-column responsive)
  - Input/textarea styling with dark background
  - Button styles and hover states
  - Output display formatting

## API Endpoints

### SMTP Routes

| Method | Endpoint | Body | Purpose |
|--------|----------|------|---------|
| POST | `/api/smtp/test` | SMTP config | Verify SMTP connection |
| POST | `/api/smtp/send` | SMTP config + email | Send test email |
| GET | `/api/smtp/history` | - | List all test records |
| GET | `/api/smtp/history/:id` | - | Get record by ID |
| DELETE | `/api/smtp/history/:id` | - | Delete record by ID |

### Request Body Example

```json
{
  "host": "smtp.gmail.com",
  "port": "587",
  "encryption": "TLS",
  "username": "user@gmail.com",
  "password": "app-password",
  "from": "sender@gmail.com",
  "to": "receiver@gmail.com",
  "subject": "Test Email",
  "message": "This is a test email"
}
```

## Environment Configuration

The application uses environment variables for sensitive configuration. Create a `.env` file in the backend directory:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
```

## Security Features

- **Helmet** - Sets HTTP security headers
- **CORS** - Enables safe cross-origin requests
- **Rate Limiting** - Prevents abuse (50 requests per 15 minutes)
- **Password Hashing** - bcrypt for secure password storage (when needed)
- **Input Validation** - Express middleware validation

## Technology Stack

- **Backend:** Node.js, Express.js, MongoDB with Mongoose
- **Frontend:** React 18, Vite, React Router, Axios
- **Email:** Nodemailer
- **Containerization:** Docker & Docker Compose
- **Testing:** Jest & Supertest
- **Styling:** CSS3 with dark theme

## Development Workflow

1. **Setup:** Run `npm install` in both backend and frontend directories
2. **Development:** Run `npm run dev` in each directory
3. **Testing:** Run `npm test` in backend directory
4. **Docker:** Use `docker-compose up --build` for full stack deployment
5. **Production:** Use `npm start` to run with Node directly

## Troubleshooting

- **MongoDB Connection Failed:** Verify MONGODB_URI in .env and network access to MongoDB Atlas
- **CORS Errors:** Check that frontend URL is allowed in backend CORS configuration
- **Port Already in Use:** Change PORT in .env or use `docker-compose` for isolation
- **Rate Limit Hit:** Wait 15 minutes or modify rate limit in app.js
