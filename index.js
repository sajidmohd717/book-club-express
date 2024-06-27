// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5555;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Define Series model
const seriesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  views: { type: String, required: true },
  episodes: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  thumbnail: { type: String, required: true },
  link: { type: String, required: true }
}, { timestamps: true });

const Series = mongoose.model('Series', seriesSchema);

// API Routes
app.get('/api/series', async (req, res) => {
  try {
    const series = await Series.find();
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching series data', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});