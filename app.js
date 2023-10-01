require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const teamRoutes = require('./routes/team');
const wc22Routes = require('./routes/worldcup22');
const wcRoutes = require('./routes/worldcupMatch');
const intRoutes = require('./routes/internationalMatch');
const playRoutes = require('./routes/playground');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPITONS,GET,POST,DELETE,PUT,PATCH'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/all-teams', teamRoutes);
app.use('/worldcup22', wc22Routes);
app.use('/international-match', intRoutes);
app.use('/worldcup-match', wcRoutes);
app.use('/playground', playRoutes);

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
