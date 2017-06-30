const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = '2cb2cc003126fcca2f4b7eec962fd42e5d4afad9' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbUserToken = 'EAAZAyAs3RUfkBAFNLiIuBeNZAyYyBGvAhPtMJQXZBPQQlDMPVvvqqyElwA2s8O4NrFPLhBPtthpvG3zpapuc0oZAtoZCeZCIhXC1XQcISVOdjiZAdnAYDbzrOS6XgeCo1oacCuwGLZA8PwXvL0FI61nZANnxnkbSklwl4zNrgUFsFR6ZCrkZC9tn1YgJiAQqEgSricZD'
}) => new Promise((resolve, reject) => {
  oauth.getTmMemberId(tmToken).then(tmMemberId => {
    facebook.getMusic(fbUserId, fbUserToken).then(artistNames => {
      const vfPromise = firebase.getOngoingVerifiedFanOnsales(artistNames);
      const discoPromise = facebook.getMusic(fbUserId, fbUserToken).then(artistNames => {
        return discovery.getEvents(location, artistNames)
      });
      const ursaPromise = firebase.getSavedUrsaEvents(tmMemberId);

      Promise.all([ vfPromise, ursaPromise, discoPromise ]).then(([ vfEvents, ursaEvents, discoEvents ]) => {
        resolve({ vfEvents, ursaEvents, discoEvents });
      });
    });
  });
});
