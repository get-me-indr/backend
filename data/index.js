const {
  discovery,
  facebook,
  ursa
} = require('./sources');

module.exports.getPersonalizedEvents = ({ tmUserId = '492196944', fbUserId = '10154599707336563' /* gabo's id */, location }) =>
  new Promise((resolve, reject) => {
    resolve([]);
  });
