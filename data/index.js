const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = '7d394e869c2e9fb504ea2d8b216e99d409e147b4' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbUserToken = 'EAAZAyAs3RUfkBANgnaoWZB7cge5K5dkP9B98Hn4FlYsh2PIOoP6rmt3cqIjSSswXSBpmhIwnKwHU5GIP6AVNZCZAQZBilxArBXtPBs0xpfZAdlsazqfQFbpRaU9aEvqs5BODTrxmDGqS4VfZA84evAom3RTUpIniSQfWywDl0WcVmxHNhk8OZCErMb1TDf9FvNoZD'
}) => new Promise((resolve, reject) => {
  oauth.getTmMemberId(tmToken).then(tmMemberId => {
    facebook.getMusic(fbUserId, fbUserToken).then(artistNames => {
      const vfPromise = firebase.getOngoingVerifiedFanOnsales(artistNames).catch(() => []);
      const discoPromise = discovery.getEvents(location, artistNames).catch(() => []);
      const ursaPromise = firebase.getSavedUrsaEvents(tmMemberId).catch(() => []);

      Promise.all([ vfPromise, ursaPromise, discoPromise ]).then(([ vfEvents, ursaEvents, discoEvents ]) => {
        return score({ ursaEvents, discoEvents }).then(events => resolve({ events, test: true })).catch(err => resolve(err));
        // resolve({ vfEvents, ursaEvents, discoEvents });
      });
    }).catch(() => resolve([]));
  }).catch(() => resolve([]));
});
