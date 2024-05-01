const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();
const { client } = require('./utils/db');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/test-db', (req, res) => {
  try {
    res.json({
      client: client.s.namespace,
      message: 'Connected to MongoDB',
    });
  } catch (error) {
    res.json({
      message: 'Error connecting to MongoDB',
      error: error.message,
    });
  }
});

app.use('/content-management-service/', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
