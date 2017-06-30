const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = 'eef0b90e5c818b873b711bb0d42225e3af443619' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbToken = 'EAAZAyAs3RUfkBAGOB6CsKOFeT3IHyfhyJALTsZCfpVd2fCBBXT92UiGeF876RZA9sxv2iyrnsZAnT8MT3JGYT9q5tvdyYuCAku7ZCFhDm4ZB1G6zwFOiblPWV1VIlx0Pvn848GBNzJS4UGY9bDtX1siM0LrKumO6VBicobftSOTgdaucysFQRZBewouI4ouZCh4ZD'
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
