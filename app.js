require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const playerRoutes = require('./routes/player');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPITONS,GET,POST,DELETE,PUT,PATCH'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/v1', playerRoutes);

app.use((error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500;
  return res.status(error.statusCode).json({
    message: error.message || 'Internal server error',
  });
});

mongoose
  .connect(process.env.URI)
  .then(result => app.listen(process.env.PORT))
  .catch(error => console.log(error));
