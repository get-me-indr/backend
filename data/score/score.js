const { exec } = require('child_process');

module.exports = ({ events, facebookLikes }) => new Promise((resolve, reject) => {
  const payload = JSON.stringify(Object.assign({ hello: "world" }, events, facebookLikes));
  exec(`python ${__dirname}/score.py ${payload}`, (err, stdout, stderr) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(stdout);
  });
})
