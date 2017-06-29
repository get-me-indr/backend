const {
  discovery,
  facebook,
  ursa
} = require('./sources');

module.exports.getPersonalizedEvents = ({ tmUserId, fbToken, location }) =>
  new Promise((resolve, reject) => {
    resolve([]);
  });
