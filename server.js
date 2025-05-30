require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/dbConnection');
const cors = require('cors');
const corsOptions = require('./config/corsOption');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');

const PORT = process.env.PORT || 3500;

connectDB();

// app.use('/' ,require('../src/'))
//
app.use(express.json());
app.use(cookieParser());

app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/logout', require('./routes/logout'));

app.use('/refresh', require('./routes/refresh'));

// app.use(verifyJWT);

app.use('/blogPost', require('./routes/api/blogPost'));

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
  app.listen(PORT, () => console.log(`Server running on port${PORT}`));
});
