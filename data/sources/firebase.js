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

const insertUserInteraction = (userId, data) => {
  const ref = db.ref(`${namespace}/interactions/${userId}`);
  const key = ref.push().key;
  return ref.child(key).set(data);
}

module.exports = {
  getOngoingVerifiedFanOnsales: () => data,
  insertUserInteraction
};
