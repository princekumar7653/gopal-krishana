# Portfolio Visitor Tracking Server

A Node.js backend server for tracking portfolio visitors and sending email notifications.

## Features

- 📝 Visitor registration and logging
- 📧 Email notifications for new visitors
- 📊 Visitor statistics
- 🔒 Rate limiting and security
- 💾 Local JSON file storage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Update `.env` file with your Gmail credentials:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
```

## Gmail App Password Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account settings
3. Navigate to Security > 2-Step Verification > App passwords
4. Generate a new app password for "Mail"
5. Use this app password in the `EMAIL_PASS` field

## Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### POST /api/visitor
Register a new visitor and send email notification.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "purpose": "hiring",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "userAgent": "Mozilla/5.0...",
  "referrer": "https://google.com",
  "language": "en-US",
  "timezone": "America/New_York"
}
```

### GET /api/stats
Get visitor statistics (public endpoint).

### GET /api/health
Health check endpoint.

## File Structure

```
server/
├── server.js          # Main server file
├── package.json       # Dependencies
├── .env              # Environment variables
├── .env.example      # Environment template
├── README.md         # This file
└── logs/             # Visitor logs (auto-created)
    └── visitors.json # Visitor data storage
```

## Security Features

- Rate limiting (10 requests per 15 minutes per IP)
- CORS protection
- Helmet security headers
- Input validation with Joi
- Error handling

## Troubleshooting

### Email Issues

1. **Authentication Failed**: Check Gmail app password
2. **Connection Failed**: Check internet connection
3. **Not Configured**: Update EMAIL_USER and EMAIL_PASS in .env

### Server Issues

1. **Port in use**: Change PORT in .env file
2. **CORS errors**: Add your frontend URL to CORS origins in server.js

## Development

The server automatically creates a `logs` directory and `visitors.json` file to store visitor data locally. This file is used for statistics and can be backed up as needed.