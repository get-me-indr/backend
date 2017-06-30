// Import Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("../../tm-verified-fan-firebase-adminsdk-vv1ns-712a8f2674.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tm-verified-fan.firebaseio.com"
});

// Get a database reference to our posts
const db = admin.database();
const ref = db.ref("verified-fan/events");

let data = {};

module.exports = {
  getOngoingVerifiedFanOnsales: () => data
};
