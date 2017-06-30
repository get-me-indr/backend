const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPersonalizedEvents } = require('./data');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  getPersonalizedEvents(req.query || {})
    .then(events => {
      return res.json({ events });
    })
    .catch(error => {
      return res.json({ error });
    });
});


module.exports = app;
