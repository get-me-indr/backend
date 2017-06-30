const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getPersonalizedEvents } = require('./data');
const { firebase } = require('./data/sources');

const discovery = require('./data/sources/discovery');

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

app.post('/interactions', (req, res) => {
  const { tmUserId, event, direction } = req.body;
  console.log({ tmUserId, event, direction });
  firebase.insertUserInteraction(tmUserId, Object.assign({}, event, direction))
    .then(result => {
      console.log('interactions POST result', { result });
      res.json({ result });
    })
    .catch(error => {
      res.json({ error });
    })
});

module.exports = app;
