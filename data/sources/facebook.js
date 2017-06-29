require('isomorphic-fetch');

module.exports = {
  getMusic: fbUserId => {
    return fetch(`https://graph.facebook.com/v2.9/${fbUserId}/music?access_token=EAAZAyAs3RUfkBAEfbNhbBAaAnFruil8koOyZAZAeQBld25c61rTD9ITAvhTrlkZAGBmecZBA5YomKoNPfw5LtmArIZBmqLsa48PPQ66SEqQZBZBobHkn3FcSPyShJYkz4NuXT95uepJppxKkEdxs8AWL07ymL5uf6rDwBY8i7u67ThgcqhxYRY66UqilXuzq7qMZD&pretty=0`)
      .then(res => res.json())
      .then(json => json.data);
    }
};
