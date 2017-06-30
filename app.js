const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { getPersonalizedEvents } = require('./data');

const discovery = require('./data/sources/discovery');

const app = express();

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

app.get('/discovery', (req, res) => {
  let artistList = req.query.artists.split(',');
  discovery.getEvents(req.query.geoPoint, artistList)
    .then(events => {
      return res.json({ events });
    })
    .catch(error => {
      return res.json({ error });
    });
});



module.exports = app;
