const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');

const seasonRoutes = require('./routes/seasonRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const donnaRoutes = require('./routes/donnaRoutes');

const app = express();

// Connect to database (non-blocking)
connectDB().catch(err => {
  console.error('Database connection failed:', err.message);
  console.log('Server will continue to run, but database features may not work.');
});

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/seasons', seasonRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/donna', donnaRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Error handling middleware (must be last)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

module.exports = app;
