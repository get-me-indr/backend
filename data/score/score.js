const { exec } = require('child_process');
const fs = require('fs');

module.exports = ({ discoEvents, ursaEvents }) => new Promise((resolve, reject) => {
  const json = JSON.stringify({ discovery_events: discoEvents || [], ursa_events: ursaEvents || [] });
  fs.writeFile(__dirname + '/events.json', json, () => {
    exec(`python ${__dirname}/score.py`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(stdout));
    });
  });
});
