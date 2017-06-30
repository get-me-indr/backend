const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = 'd53f12c1454fd893aab8849093982b8846171abe' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbUserToken = 'EAAZAyAs3RUfkBAHojn3ZBNXdRmyOIcDWvX0ta5hrLWbKoXsWMzDRYrBx0s3Y4tUZBJDZBVSC32hywJPVYfns6NKrmVcTQjgnn6JQ2ZA6tSt4RE4S3XXgMKn38z61zAZATcuJr0YKKj9sVQMQG1iMLOLaQnNsyma1bE6MWEtZBelgoOckRQ9MvcZCdGBsBBeBj1IZD'
}) => new Promise((resolve, reject) => {

  const discoPromise = facebook.getMusic(fbUserId, fbUserToken).then(artistNames => {
    return discovery.getEvents(location, artistNames)
  });

  const ursaPromise = firebase.getSavedUrsaEvents(tmUserId);

  Promise.all([ discoPromise, ursaPromise ]).then(([discoEvents, ursaEvents]) => {
    const overlap = discoEvents.reduce((accum, cur) => {
      if (ursaEvents.find(uEvent => uEvent.eventName === cur.eventName)) {
        accum.push(cur.eventName);
      }
      return accum;
    }, []);
    resolve({ numDisco: discoEvents.length, numUrsa: ursaEvents.length, overlap, discoEvents, ursaEvents  });
  });

});
