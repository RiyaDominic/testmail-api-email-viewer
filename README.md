# Testmail API Email Viewer

A small full-stack app for inspecting test emails from a Testmail inbox. The React client displays message content and delivery metadata, while an Express server keeps the Testmail credentials on the server and exposes a simple API for the frontend.
## 🚀 Live Demo

**Frontend:**  
https://testmail-api-email-viewer.vercel.app/

**Backend:**  
https://testmail-api-email-viewer.onrender.com/

## Features

- Fetches messages from the Testmail API
- Displays sender, subject, date, text content, SPF, DKIM, and attachment count
- Refreshes the inbox without reloading the page
- Handles loading, empty-inbox, and API-error states
- Keeps Testmail credentials in environment variables
- Responsive React UI for desktop and mobile screens

## Stack

- Frontend: React 19, Vite, CSS, browser Fetch API
- Backend: Node.js, Express, Axios, CORS, dotenv
- Email provider: [Testmail](https://testmail.app/)

## Prerequisites

- Node.js 18 or newer
- A Testmail account
- A Testmail API key and namespace

## Setup

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/RiyaDominic/testmail-api-email-viewer.git
cd testmail-api-email-viewer
npm install
cd frontend
npm install
cd ..
```

Create a root `.env` file from `.env.example`:

```bash
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead.

Add your Testmail credentials to `.env`:

```env
TESTMAIL_API_KEY=your_testmail_api_key_here
TESTMAIL_NAMESPACE=your_namespace_here
PORT=3000
```

The `.env` file is ignored by Git. Never commit API keys or other credentials.

## Run Locally

Start the backend from the repository root:

```bash
node server.js
```

The API is available at `http://localhost:3000`.

In a second terminal, start the Vite frontend:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`. Send a test email to the address configured for your Testmail namespace, then select **Refresh Emails** in the viewer.

## API

### `GET /`

Returns a server health response:

```json
{
      "success": true,
      "message": "Testmail API Email Viewer Server is running"
}
```

### `GET /api/emails`

Fetches messages for the configured Testmail namespace. A successful response has this shape:

```json
{
      "success": true,
      "count": 1,
      "emails": []
}
```

The `emails` array contains the message objects returned by Testmail. If the upstream request fails, the server returns an error response with `success: false` and a short message.

## Project Structure

```text
.
├── .env.example       # Environment variable template
├── package.json       # Backend dependencies
├── server.js          # Express server and Testmail proxy route
└── frontend/
            ├── package.json   # Frontend scripts and dependencies
            └── src/
                        ├── App.jsx    # Inbox fetching and UI
                        ├── App.css    # Component styles
                        └── main.jsx   # React entry point
```

## Frontend Commands

Run these from the `frontend` directory:

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

The root package currently runs the backend with `node server.js`; it does not define a combined development script.


## Deployment

The project is deployed as two separate services.

Frontend — Vercel

The React/Vite frontend is deployed on Vercel.

Live URL:
https://testmail-api-email-viewer.vercel.app/

Backend — Render

The Node.js/Express backend is deployed on Render.

Live URL:
https://testmail-api-email-viewer.onrender.com/

The backend uses environment variables for the Testmail API credentials.


## Security Notes
The browser never receives `TESTMAIL_API_KEY` or `TESTMAIL_NAMESPACE`. The Express server reads them from `.env` and sends them only to Testmail. The backend currently enables CORS for all origins, which is convenient for local development but should be restricted to the deployed frontend origin before production use.

## Possible Improvements

- Add search, filtering, sorting, and pagination
- Add a message detail view with HTML preview
- Add attachment download support
- Add automated backend and frontend tests
- Add deployment configuration and a combined development command

## Author

Riya Dominic - [GitHub](https://github.com/RiyaDominic)