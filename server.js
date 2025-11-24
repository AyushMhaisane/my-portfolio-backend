const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors'); 
const path = require('path');

// MODIFICATION: dotenv.config() ko bilkul TOP par move kar diya
// Taaki environment variables sabhi imports se pehle load ho jaayein
dotenv.config();

// Ab baaki files ko import karein
const portfolioRoutes = require('./routes/portfolioRoute'); 
const connectDB = require('./config/db'); 

// Database connect karein
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname,'./client/build' )))

//routes
app.use('/api/v1/portfolio', portfolioRoutes);

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html' ))
});
//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`.bgCyan.white);
});