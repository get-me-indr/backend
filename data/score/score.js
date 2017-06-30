const { exec } = require('child_process');
const fs = require('fs');

module.exports = ({ discoEvents, ursaEvents }) => new Promise((resolve, reject) => {
  const json = JSON.stringify({ discoEvents, ursaEvents });
  fs.writeFile(__dirname + '/events.json', json, () => {
    exec(`python ${__dirname}/score.py`, (err, stdout, stderr) => {
      if (err) {
        console.log('err', err);
        reject(err);
        return;
      }
      console.log('stdout', stdout);
      resolve(JSON.parse(stdout));
    });
  });
});
