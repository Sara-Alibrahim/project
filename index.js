require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const authRoutes = require('./src/routes/authRoutes');
const courseRoutes = require('./src/routes/courseRoutes');
const deadlineRoutes = require('./src/routes/deadlineRoutes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGO_URI)
.then(() => { console.log('MongoDB Atlas connected'); })
.catch((err) => { console.log('MongoDB connection error:', err); });

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/deadlines', deadlineRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'singUp.html'));
});

app.get('/:page', (req, res) => {
  let page = req.params.page;
  
  if (page.toLowerCase() === 'dashboard.html' || page.toLowerCase() === 'dashboard') {
    return res.sendFile(path.join(__dirname, 'dashboard.html'));
  }

  if (page.endsWith('.html')) {
    res.sendFile(path.join(__dirname, page));
  } else {
    res.sendFile(path.join(__dirname, `${page}.html`));
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`); });