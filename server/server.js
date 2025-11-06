/**
 * Portfolio Visitor Notification Server
 * Node.js backend for handling visitor entries and email notifications
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5501', 'http://127.0.0.1:5501', 'http://localhost:5500'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 10 requests per windowMs
    message: {
        error: 'Too many requests from this IP, please try again later.'
    }
});

app.use('/api/', limiter);

// Email transporter setup
const createEmailTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER || 'your-email@gmail.com',
            pass: process.env.EMAIL_PASS || 'your-app-password'
        }
    });
};

// Validation schema
const visitorSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().optional().allow(''),
    purpose: Joi.string().max(50).optional().allow(''),
    timestamp: Joi.string().isoDate().required(),
    userAgent: Joi.string().max(500).optional().allow(''),
    referrer: Joi.string().uri().optional().allow(''),
    language: Joi.string().max(10).optional().allow(''),
    timezone: Joi.string().max(50).optional().allow('')
});

// Utility functions
const getBrowserFromUserAgent = (userAgent) => {
    if (!userAgent) return 'Unknown';

    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
};

const createEmailHTML = (visitorData) => {
    const visitTime = new Date(visitorData.timestamp).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    });

    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Portfolio Visitor</title>
        <style>
            body { 
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                line-height: 1.6; 
                color: #333; 
                margin: 0; 
                padding: 0; 
                background-color: #f4f4f4; 
            }
            .container { 
                max-width: 600px; 
                margin: 20px auto; 
                background: white; 
                border-radius: 12px; 
                overflow: hidden; 
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
            }
            .header { 
                background: linear-gradient(135deg, #0ea5e9, #8b5cf6); 
                color: white; 
                padding: 30px 20px; 
                text-align: center; 
            }
            .header h1 { 
                margin: 0; 
                font-size: 24px; 
                font-weight: 600; 
            }
            .header p { 
                margin: 10px 0 0 0; 
                opacity: 0.9; 
                font-size: 16px; 
            }
            .content { 
                padding: 30px 20px; 
            }
            .info-card { 
                background: #f8f9fa; 
                border-left: 4px solid #0ea5e9; 
                padding: 15px 20px; 
                margin: 15px 0; 
                border-radius: 0 8px 8px 0; 
            }
            .info-label { 
                font-weight: 600; 
                color: #0ea5e9; 
                display: inline-block; 
                min-width: 100px; 
            }
            .info-value { 
                color: #333; 
                margin-left: 10px; 
            }
            .highlight { 
                background: linear-gradient(135deg, #0ea5e9, #06b6d4); 
                color: white; 
                padding: 20px; 
                border-radius: 8px; 
                margin: 20px 0; 
                text-align: center; 
            }
            .footer { 
                background: #f8f9fa; 
                padding: 20px; 
                text-align: center; 
                font-size: 14px; 
                color: #666; 
                border-top: 1px solid #e9ecef; 
            }
            .footer a { 
                color: #0ea5e9; 
                text-decoration: none; 
            }
            .emoji { 
                font-size: 18px; 
                margin-right: 8px; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 New Portfolio Visitor!</h1>
                <p>Someone just discovered your amazing work</p>
            </div>
            
            <div class="content">
                <div class="highlight">
                    <h2 style="margin: 0; font-size: 20px;">
                        <span class="emoji">👤</span>
                        ${visitorData.name}
                    </h2>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">
                        ${visitorData.purpose ? `Interested in: ${visitorData.purpose}` : 'Just browsing your portfolio'}
                    </p>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">📧</span>Email:</span>
                    <span class="info-value">${visitorData.email || 'Not provided'}</span>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">🕒</span>Visit Time:</span>
                    <span class="info-value">${visitTime}</span>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">🌐</span>Browser:</span>
                    <span class="info-value">${getBrowserFromUserAgent(visitorData.userAgent)}</span>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">🌍</span>Location:</span>
                    <span class="info-value">${visitorData.timezone || 'Unknown'}</span>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">🗣️</span>Language:</span>
                    <span class="info-value">${visitorData.language || 'Unknown'}</span>
                </div>
                
                <div class="info-card">
                    <span class="info-label"><span class="emoji">🔗</span>Source:</span>
                    <span class="info-value">${visitorData.referrer || 'Direct visit'}</span>
                </div>
            </div>
            
            <div class="footer">
                <p>This notification was sent automatically from your portfolio visitor tracking system.</p>
                <p>
                    <a href="${process.env.PORTFOLIO_URL || 'http://localhost:5173'}">
                        Visit your portfolio →
                    </a>
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const logVisitor = async (visitorData) => {
    try {
        const logsDir = path.join(__dirname, 'logs');
        const logFile = path.join(logsDir, 'visitors.json');

        // Create logs directory if it doesn't exist
        try {
            await fs.access(logsDir);
        } catch {
            await fs.mkdir(logsDir, { recursive: true });
        }

        // Read existing logs or create empty array
        let visitors = [];
        try {
            const existingLogs = await fs.readFile(logFile, 'utf8');
            visitors = JSON.parse(existingLogs);
        } catch {
            // File doesn't exist or is invalid, start with empty array
        }

        // Add new visitor
        visitors.push({
            ...visitorData,
            id: Date.now().toString(),
            serverTimestamp: new Date().toISOString()
        });

        // Keep only last 1000 visitors
        if (visitors.length > 1000) {
            visitors = visitors.slice(-1000);
        }

        // Save updated logs
        await fs.writeFile(logFile, JSON.stringify(visitors, null, 2));

        console.log(`📝 Visitor logged: ${visitorData.name}`);
    } catch (error) {
        console.error('Error logging visitor:', error);
    }
};

// Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Portfolio visitor server is running',
        timestamp: new Date().toISOString()
    });
});

    // Contact form endpoint
    app.post('/api/visitor/contact', async (req, res) => {
        // Log incoming payload for debugging
        console.log('[/api/visitor/contact] incoming body:', JSON.stringify(req.body));

        try {
            const { name, email, subject, message } = req.body;

            if (!name || !email || !subject || !message) {
                console.log('[/api/visitor/contact] validation failed - missing fields', { name, email, subject, message });
                return res.status(400).json({ error: 'All fields are required' });
            }

            const transporter = createEmailTransporter();

            // Send email
            const mailOptions = {
                from: `"${name}" <${process.env.EMAIL_USER}>`,
                to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
                subject: `Portfolio Contact: ${subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #0ea5e9;">New Contact Form Submission</h2>
                        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <div style="margin-top: 20px;">
                                <h3>Message:</h3>
                                <p style="white-space: pre-wrap;">${message}</p>
                            </div>
                        </div>
                    </div>
                `,
                replyTo: email
            };

            const info = await transporter.sendMail(mailOptions);
            console.log('[/api/visitor/contact] email sent:', info && info.messageId);

            // Also log the contact in visitors.json
            await logVisitor({
                name,
                email,
                purpose: subject,
                message,
                timestamp: new Date().toISOString(),
                type: 'contact'
            });

            res.json({ 
                success: true, 
                message: 'Message sent successfully' 
            });
        } catch (error) {
            console.error('Error sending contact email:', error && (error.stack || error.message || error));
            // Return helpful error message in development
            res.status(500).json({ 
                error: 'Failed to send message',
                details: process.env.NODE_ENV === 'development' ? (error && (error.stack || error.message)) : undefined
            });
        }
    });

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const transporter = createEmailTransporter();

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message}</p>
            `,
            replyTo: email
        };

        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

app.post('/api/visitor', async (req, res) => {
    try {
        // Validate input
        const { error, value } = visitorSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.details[0].message
            });
        }

        const visitorData = value;

        // Log visitor data
        await logVisitor(visitorData);

        // Send email notification
        let emailSent = false;
        try {
            // Check if email is configured
            if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
                console.log('❌ EMAIL NOT CONFIGURED - Please set EMAIL_USER and EMAIL_PASS in .env file');
                throw new Error('Email not configured');
            }

            if (process.env.EMAIL_USER === 'your-email@gmail.com' || process.env.EMAIL_PASS === 'your-gmail-app-password-here') {
                console.log('❌ EMAIL CREDENTIALS NOT UPDATED - Please update EMAIL_USER and EMAIL_PASS in .env file');
                throw new Error('Email credentials not updated');
            }

            const transporter = createEmailTransporter();

            // Test the connection
            await transporter.verify();
            console.log('✅ EMAIL CONNECTION VERIFIED');

            const mailOptions = {
                from: `"Portfolio Visitor System" <${process.env.EMAIL_USER}>`,
                to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
                subject: `🎉 New Portfolio Visitor: ${visitorData.name}`,
                html: createEmailHTML(visitorData),
                text: `
New visitor to your portfolio!

Name: ${visitorData.name}
Email: ${visitorData.email || 'Not provided'}
Purpose: ${visitorData.purpose || 'Not specified'}
Visit Time: ${new Date(visitorData.timestamp).toLocaleString()}
Browser: ${getBrowserFromUserAgent(visitorData.userAgent)}
Location: ${visitorData.timezone || 'Unknown'}
Language: ${visitorData.language || 'Unknown'}
Source: ${visitorData.referrer || 'Direct visit'}
                `.trim()
            };

            const result = await transporter.sendMail(mailOptions);
            console.log(`✅ EMAIL SENT SUCCESSFULLY to ${process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER} for visitor: ${visitorData.name}`);
            emailSent = true;

        } catch (emailError) {
            console.log(`❌ EMAIL FAILED: ${emailError.message}`);

            // Log specific error details
            if (emailError.code === 'EAUTH') {
                console.log('❌ GMAIL AUTHENTICATION FAILED - Check your Gmail App Password');
            } else if (emailError.code === 'ECONNECTION') {
                console.log('❌ EMAIL CONNECTION FAILED - Check internet and Gmail settings');
            }
        }

        res.json({
            success: true,
            message: 'Visitor registered successfully',
            emailSent: emailSent,
            visitor: {
                name: visitorData.name,
                timestamp: visitorData.timestamp
            }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process visitor registration'
        });
    }
});

// Get visitor statistics (public endpoint)
app.get('/api/stats', async (req, res) => {
    try {
        const logFile = path.join(__dirname, 'logs', 'visitors.json');

        try {
            const logsData = await fs.readFile(logFile, 'utf8');
            const visitors = JSON.parse(logsData);

            const stats = {
                totalVisitors: visitors.length,
                todayVisitors: visitors.filter(v => {
                    const visitDate = new Date(v.timestamp).toDateString();
                    const today = new Date().toDateString();
                    return visitDate === today;
                }).length,
                recentVisitors: visitors.slice(-5).map(v => ({
                    name: v.name,
                    timestamp: v.timestamp,
                    purpose: v.purpose
                }))
            };

            res.json(stats);
        } catch {
            res.json({
                totalVisitors: 0,
                todayVisitors: 0,
                recentVisitors: []
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to get statistics' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Something went wrong!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: 'The requested endpoint does not exist'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
    console.log(`📧 EMAIL STATUS: ${process.env.EMAIL_USER && process.env.EMAIL_USER !== 'your-email@gmail.com' ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
    console.log(`🌐 CORS ENABLED FOR: http://localhost:5173, http://localhost:3000`);
});

module.exports = app;