require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

mongoose.connect(MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);