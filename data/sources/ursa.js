require('isomorphic-fetch');

module.exports = {
  getRecommendations: userId => {
    return fetch(`http://ursa-qa.datasciences.tmcs/recommend?filter=default&max=50&dedupe=true&callerId=fgsci&type=personalized&marketId=27&userId=${userId}`)
      .then(res => res.json())
      .then(recommendations => {
        return events = recommendations['personalizedRecommendations']['artists']
                .reduce((accum, recomm) => {
                  var artistScore = recomm['score'];
                  var artistId = recomm['artistId'];
                  if (recomm['events'] && recomm['events'].length) {
                    var firstEvent = recomm['events'][0];
                    firstEvent['ursaScore']= artistScore;
                    firstEvent['artistId'] = artistId
                    accum.push(firstEvent);
                  }
                  return accum;
                }, []);
      })
    }
};
