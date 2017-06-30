require('isomorphic-fetch');

module.exports = {
  getMusic: (fbUserId, fbAccessToken) => {
    return fetch(`https://graph.facebook.com/v2.9/${fbUserId}/music?access_token=${fbAccessToken}&pretty=0`)
      .then(res => res.json())
      .then(json => json.data.map(artist => artist.name));
    }
};
