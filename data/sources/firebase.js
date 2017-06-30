// Import Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("../../tm-verified-fan-firebase-adminsdk-vv1ns-712a8f2674.json");

const namespace = 'verified-fan';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tm-verified-fan.firebaseio.com"
});

// Get a database reference to our posts
const db = admin.database();

let data = {};

const vfRef = db.ref("verified-fan/events");

// updates ongoing verified fan artists
vfRef.on("value", function(snapshot) {
  data = snapshot.val();
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

const insertUserInteraction = (userId, data) => {
  const ref = db.ref(`${namespace}/interactions/${userId}`);
  const key = ref.push().key;
  return ref.child(key).set(data);
}

const getSavedUrsaEvents = tmUserId => new Promise((resolve, reject) => {
  const ref = db.ref(`${namespace}/ursa/${tmUserId}`);
  ref.on("value", function(snapshot) {
    const val = snapshot.val();
    const key = Object.keys(val)[0]
    resolve(val[key]);
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});

const saveUrsaEvents = ({events, tmUserId}) => {
  const ref = db.ref(`${namespace}/ursa/${tmUserId}`);
  const key = ref.push().key;
  return ref.child(key).set(events);
}

module.exports = {
  getOngoingVerifiedFanOnsales: () => data,
  insertUserInteraction,
  getSavedUrsaEvents,
  saveUrsaEvents
};
