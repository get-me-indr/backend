
const moment = require('moment');
require('isomorphic-fetch');



    function createEventResponse(evt){
       let eventInfo = {};
                         eventInfo.eventName = evt.name;
                         eventInfo.eventId = evt.id;
                         eventInfo.distance = evt.distance;
                         eventInfo.distanceUnits = evt.units;
                         eventInfo.url = evt.url;
                         eventInfo.startLocalDate = evt.dates.start.localDate;
                         eventInfo.startLocalTime = evt.dates.start.localTime;
                         eventInfo.venueName = evt._embedded.venues[0].name;
                         eventInfo.venueCity = evt._embedded.venues[0].city.name;
                         eventInfo.venueState = evt._embedded.venues[0].state;
                         eventInfo.artists = evt._embedded.attractions;

                         for(let img of evt.images){
                             if(img.ratio === '4_3'){
                             eventInfo.imageUrl = img.url;
                             break;
                             }
                         }
                         return eventInfo;

    }


module.exports = {
  getEvents: function(geoPoint, artists) {
    let minReturnedObjects = 200;
    let radius = 50;
    let units= 'miles';
    let apiKey = 'DAGQUQARKor32zsH3Fn7AFxJTE8R7aI7';
    let size= 200;
    let startDateTime = moment().format("YYYY-MM-DDTHH:mm:ss") + "Z";
    let endDateTime = moment().add(7, 'days').format("YYYY-MM-DDTHH:mm:ss") + "Z";
    // console.log("after lets");

  let uri = 'https://app.ticketmaster.com/discovery/v2/events.json?geoPoint='+ geoPoint + '&radius=' + radius + '&unit=' + units + '&size=' + size + '&startDateTime=' + startDateTime + '&endDateTime=' + endDateTime + '&apikey=' + apiKey;
    return fetch(uri)
     .then(function(response) {
     // console.log("inside .then");
        if (response.status >= 400) {
            throw new Error("Bad response from server");
         }
         return response.json();
     })
     .then(function(events) {
        // console.log("Inside 2nd then");
         let eventList = [];
         let usedArtist = [];
         // console.log(events);
        // let artists=[ { name: 'Colorado Rockies vs. Cincinnati Reds', id: '43228062105', created_time: '2017-04-30T21:00:31+0000' }, { name: 'The Classic', id: '1245845202203415', created_time: '2017-03-29T18:59:48+0000' }, { name: 'Pearl Jam Comunidad México', id: '121350044550344', created_time: '2016-04-27T02:04:34+0000' }, { name: 'CTE Podcast', id: '1571611589756348', created_time: '2015-04-29T20:23:28+0000' }, { name: 'Gloria Trevi', id: '17185884831', created_time: '2015-01-02T13:48:36+0000' }, { name: 'CHVRCHES', id: '334533196573280', created_time: '2014-11-18T16:38:59+0000' }, { name: 'MOLOTOV OFICIAL', id: '109535115748100', created_time: '2014-01-24T02:44:10+0000' }, { name: 'Reactor 105', id: '154373541271252', created_time: '2013-05-14T02:22:52+0000' }, { name: 'Rebel Cats', id: '34647477839', created_time: '2013-02-10T23:19:17+0000' }, { name: 'Chesapeake Sons', id: '9212981724', created_time: '2012-07-06T20:22:57+0000' }, { name: 'Pearl Jam', id: '7659317484', created_time: '2011-08-31T15:59:05+0000' }, { name: 'The Mars Volta', id: '8755222559', created_time: '2011-07-12T21:04:58+0000' }, { name: 'Wasting Light', id: '135747776496669', created_time: '2011-04-27T19:53:16+0000' }, { name: 'Foo Fighters', id: '25098475544', created_time: '2011-04-27T19:53:08+0000' }, { name: 'Sparta', id: '115305381823308', created_time: '2010-09-03T20:42:41+0000' }, { name: 'Soundgarden', id: '271730225599', created_time: '2010-08-28T02:11:26+0000' }, { name: 'Within Temptation', id: '7185342985', created_time: '2010-07-28T03:10:33+0000' }, { name: 'Soundgarden', id: '109103475775981', created_time: '2010-05-04T17:53:13+0000' }, { name: 'White Stripes', id: '108127359222140', created_time: '2010-05-04T17:53:12+0000' }, { name: 'Stone Temple Pilots', id: '134914122905', created_time: '2010-05-04T17:53:12+0000' }, { name: 'The Killers', id: '35718435694', created_time: '2010-05-04T17:53:13+0000' }, { name: 'Weezer', id: '20355427272', created_time: '2008-03-12T14:08:01+0000' }, { name: 'Oasis', id: '9949696967', created_time: '2008-05-04T08:44:17+0000' }, { name: 'Muse', id: '8762738724', created_time: '2010-05-04T17:53:13+0000' }, { name: 'Wolfmother', id: '8138062666', created_time: '2009-08-11T15:39:43+0000' } ];
         for(let evt of events._embedded.events){
             for(let artist of artists){
                let artistName = artist.toLowerCase();
                 let eventName = evt.name.toLowerCase();
                 // console.log(artistName + ',' + eventName);
                 if((artistName.includes(eventName) || eventName.includes(artistName)) && !usedArtist.includes(artistName)){
                    usedArtist.push(artistName);
                    let eventInfo = createEventResponse(evt);
                     eventList.push(eventInfo)
                 }


             }

         }
        //  if(eventList.length < minReturnedObjects){
        //      for(let evt of events._embedded.events){
        //         if(!usedArtist.includes(evt.name.toLowerCase())){
        //         usedArtist.push(evt.name.toLowerCase());
        //         let eventInfo = createEventResponse(evt);
        //         eventList.push(eventInfo)
        //         }
        //         if(eventList.length >= minReturnedObjects){
        //         break;
        //         }
        //      }
        //  }
         // console.log(eventList);
         return eventList;
     });
    }
};
