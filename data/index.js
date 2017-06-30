const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = '5d3641eefbad347f54c9e199d61b7c35e78febf3' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbToken = 'EAAZAyAs3RUfkBAKNX1JefzOLtewd6XRAf8lQBHZAAThhRFa2s2JwrqddA56BoMNvNDtlBf4vMrIhiUkH8zerfLi26QxZCs92iuA1YSi1QieZBcmP6AzxN84zF7p9PXpEZAEoSnMENqmUzrnl0ZApzW58aDOQ9Q35q0N2n50dlR8pxKPfm4LPsZCpLZB9w27l6kcZD'
}) => new Promise((resolve, reject) => {
  oauth.getTmMemberId(tmToken).then(tmMemberId => {
    facebook.getMusic(fbUserId, fbToken).then(artistNames => {
      const vfPromise = firebase.getOngoingVerifiedFanOnsales(artistNames).catch(() => []);
      const discoPromise = discovery.getEvents(location, artistNames).catch(() => []);
      const ursaPromise = firebase.getSavedUrsaEvents(tmMemberId).catch(() => []);

      Promise.all([ vfPromise, ursaPromise, discoPromise ]).then(([ vfEvents, ursaEvents, discoEvents ]) => {
        return score({ ursaEvents, discoEvents }).then((events) => {
          const final = events.map(event => event);
          vfEvents.forEach(vfEvent => {
            final.unshift(vfEvent);
          });
          resolve(final);
        }).catch(err => resolve(err));
      });
    }).catch(() => resolve([]));
  }).catch(() => resolve([]));
});
