const {
  discovery,
  facebook,
  ursa,
  oauth,
  firebase
} = require('./sources');

module.exports.getPersonalizedEvents = ({
  tmToken = 'd53f12c1454fd893aab8849093982b8846171abe' /* gabo's tmToken */,
  tmUserId = '492196944',
  fbUserId = '10154599707336563' /* gabo's id */,
  location,
  fbUserToken = 'EAAZAyAs3RUfkBALokZCa28LHyR8LYcNznl4qV9eEtYptZAdRcJ4b2mMIyX3cLi8HrMGJFJX4Juc7pgNah3Jgr06YaGE7FYbSDr6DRmKLq8ZClIbf5UZAeQEsafSG8ZCeozcYpyFZBskQrHHxZCuRVO6Bi09fJZC8r1wLswZAh3ofKHjxOnenH9btXfePNFapPANsoZD'
}) => new Promise((resolve, reject) => {
  // facebook.getMusic(fbUserId, fbUserToken).then(console.log);
  // oauth.getTmMemberId(tmToken).then(tmMemberId => console.log({ tmMemberId }));
  // firebase.getOngoingVerifiedFanOnsales()
  // score({}).then(response => console.log('response', response));
  ursa.getRecommendations(tmUserId).then(events => {
    resolve(events);
  });

});
