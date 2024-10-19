const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

mongoose.connect('mongodb://localhost:27017/jobBoard');
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/job');
app.use(express.json());
app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/api/auth', authRoutes);
app.use('/api/job', jobRoutes);