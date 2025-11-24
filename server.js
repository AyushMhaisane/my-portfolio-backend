const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');

// Load environment variables at the top
dotenv.config();

// Import route and DB
const portfolioRoutes = require('./routes/portfolioRoute');
const connectDB = require('./config/db');

// Connect DB
connectDB();

// Initialize app
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN,   // Example: https://my-portfolio.vercel.app
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

// ❌ REMOVE the client build serving (Not needed on Render)
// app.use(express.static(path.join(__dirname, './client/build')));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

// API routes
app.use('/api/v1/portfolio', portfolioRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.json({ message: "Backend is running successfully!" });
});

// Port
const PORT = process.env.PORT || 8080;

// Start server
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`.bgCyan.white);
});
