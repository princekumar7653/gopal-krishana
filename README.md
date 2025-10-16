# Modern Portfolio - React Migration

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features visitor tracking, email notifications, and smooth animations.

## 🚀 Features

- **Modern React Architecture**: Built with React 19, TypeScript, and Vite
- **Visitor Entry System**: Track visitors with email notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: GSAP-powered animations and transitions
- **Performance Optimized**: Lazy loading, code splitting, and performance monitoring
- **Email Notifications**: Automatic email alerts for new visitors
- **Local Analytics**: Visitor statistics and tracking

## 📁 Project Structure

```
my-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API and utility services
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend
│   ├── server.js          # Express server
│   ├── logs/              # Visitor logs (auto-created)
│   └── package.json       # Backend dependencies
├── start-dev.bat          # Development startup script
└── README.md              # This file
```

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd my-portfolio
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Configure environment variables**
```bash
# Frontend (.env in client folder)
VITE_BACKEND_URL=http://localhost:3003

# Backend (.env in server folder)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
PORT=3003
```

4. **Start development servers**
```bash
# Option 1: Use the batch script (Windows)
./start-dev.bat

# Option 2: Manual start
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

## 🌐 URLs

- **Portfolio**: http://localhost:5173
- **Visitor Entry**: http://localhost:5173/visitor-entry
- **Backend API**: http://localhost:3003
- **Health Check**: http://localhost:3003/api/health

## 📧 Email Configuration

### Gmail Setup

1. Enable 2-Factor Authentication on your Gmail account
2. Go to Google Account Settings → Security → 2-Step Verification → App passwords
3. Generate a new app password for "Mail"
4. Update the `.env` file in the server folder:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
```

## 🎯 Visitor Entry System

The visitor entry system allows you to:

- **Collect visitor information** (name, email, purpose)
- **Send automatic email notifications** when someone visits
- **Track visitor statistics** and analytics
- **Store visitor data locally** in JSON format

### How it works:

1. Visitors go to `/visitor-entry` page
2. Fill out the welcome form with their details
3. System sends email notification to you
4. Visitor gets redirected to main portfolio
5. Data is stored locally for analytics

## 🔧 Development

### Available Scripts

**Frontend (client folder):**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend (server folder):**
```bash
npm start            # Start production server
npm run dev          # Start development server with nodemon
```

### Adding New Components

1. Create component in `client/src/components/`
2. Add TypeScript interfaces in `client/src/types/`
3. Export from appropriate index files
4. Use in your pages/sections

### API Endpoints

- `POST /api/visitor` - Register new visitor
- `GET /api/stats` - Get visitor statistics
- `GET /api/health` - Health check

## 🎨 Customization

### Colors & Styling
- Update `tailwind.config.js` for theme colors
- Modify `client/public/assets/css/custom.css` for custom styles
- Use CSS variables for consistent theming

### Content
- Update personal information in `client/src/utils/constants.ts`
- Modify project data in `client/public/data/projects.json`
- Update skills in `client/public/data/skills.json`

### Animations
- GSAP animations in `client/src/services/animations.ts`
- Custom CSS animations in `custom.css`
- Performance-based animation controls

## 📊 Analytics & Monitoring

The system includes:
- **Visitor tracking** with detailed information
- **Performance monitoring** for optimization
- **Error boundaries** for graceful error handling
- **Local storage** for visitor analytics

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Railway/Heroku)
```bash
cd server
# Deploy server folder with package.json
```

### Environment Variables for Production
```env
# Frontend
VITE_BACKEND_URL=https://your-backend-url.com

# Backend
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
NOTIFICATION_EMAIL=your-email@gmail.com
PORT=3003
NODE_ENV=production
```

## 🔒 Security Features

- Rate limiting (10 requests per 15 minutes)
- CORS protection
- Input validation with Joi
- Helmet security headers
- Environment variable protection

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**
   - Check Gmail app password
   - Verify 2FA is enabled
   - Check .env configuration

2. **CORS errors**
   - Verify frontend URL in server CORS settings
   - Check VITE_BACKEND_URL in frontend .env

3. **Port conflicts**
   - Change PORT in server .env
   - Update VITE_BACKEND_URL accordingly

4. **Build errors**
   - Clear node_modules and reinstall
   - Check TypeScript errors
   - Verify all dependencies are installed

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review server logs for errors
- Verify environment configuration
- Test API endpoints manually