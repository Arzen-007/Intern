const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const reportRoutes = require('./routes/reportRoutes');
const internRoutes = require('./routes/internRoutes');
const taskRoutes = require('./routes/taskRoutes');
const bootstrapDemoData = require('./utils/bootstrapDemoData');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Origin is not allowed by CORS'));
  }
}));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy', data: null, error: null });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/assign', assignmentRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/intern', internRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.connectDB();
    await sequelize.sync();
    if (process.env.SEED_DEMO_DATA === 'true') {
      await bootstrapDemoData();
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server startup error:', error.message);
    process.exit(1);
  }
};

startServer();
