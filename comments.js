// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install nodemon
// npm install cors
// npm install dotenv
// npm install helmet
// npm install morgan
// npm install winston
// npm install express-async-errors

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');
const morgan = require('morgan');
const winston = require('winston');
require('express-async-errors');

const comments = require('./routes/comments');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
  .then(() => winston.info('Connected to MongoDB'))
  .catch(err => winston.error('Could not connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use('/api/comments', comments);

// Error handling
app.use((err, req, res, next) => {
  winston.error(err.message, err);
  res.status(500).send('Something went wrong');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}`));