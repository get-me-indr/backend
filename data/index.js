const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');
const score = require('./score/score.js');

module.exports.getPersonalizedEvents = ({
  tmToken = 'ba6ef91537e06b3cac1c255635582f47ca251f06' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location = '9q5cgpbtz',
  fbToken = 'EAAZAyAs3RUfkBACXqE8EsdT2IpTwZBP5UdQWPpSZBuCLXMl5AYttGk5TUXWRxYdCseoJjrbuBZB92ZAnhEDIpLeZAkuNF3el0X6EYQMW2edUT1UfTvh4dR4OBeZCamdmHmTC3oPLbuF6oxvOP9VidRbtC1kneswZBboasgR9tTZCcAv0VJK7V9BUSKjMe8n6BSPEZD'
}) => new Promise((resolve, reject) => {
  oauth.getTmMemberId(tmToken).then(tmMemberId => {
    facebook.getMusic(fbUserId, fbToken).then(artistNames => {
      const vfPromise = firebase.getOngoingVerifiedFanOnsales(artistNames).catch(() => []);
      const discoPromise = discovery.getEvents(location, artistNames).catch(() => []);
      const ursaPromise = firebase.getSavedUrsaEvents(tmMemberId).catch(() => []);

      Promise.all([ vfPromise, ursaPromise, discoPromise ]).then(([ vfEvents, ursaEvents, discoEvents ]) => {
        return score({ ursaEvents, discoEvents }).then(resolve).catch(err => resolve(err));
      });
    }).catch(() => resolve([]));
  }).catch(() => resolve([]));
});
