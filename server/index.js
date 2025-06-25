import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import eventRoutes from './routes/events.js';
import memberRoutes from './routes/members.js';
import contactRoutes from './routes/contact.js';
import researchRoutes from './routes/research.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : true,
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

// Database connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
if (mongoUri) {
  mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.log('Running in fallback mode without MongoDB');
  });
} else {
  console.log('No MongoDB URI provided, running in fallback mode');
}

// Check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/research', researchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler for SPA routing in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});