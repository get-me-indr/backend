const {
  discovery,
  facebook,
  ursa,
  oauth
} = require('./sources');

module.exports.getPersonalizedEvents = ({
  tmToken = 'd53f12c1454fd893aab8849093982b8846171abe' /* gabo's tmToken */,
  tmUserId,
  fbUserId = '10154599707336563' /* gabo's id */,
  location
}) => new Promise((resolve, reject) => {
  // facebook.getMusic(fbUserId).then(console.log);
  // oauth.getTmMemberId(tmToken).then(tmMemberId => console.log({ tmMemberId }));
  resolve([]);
});
