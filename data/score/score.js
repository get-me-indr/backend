const { exec } = require('child_process');

module.exports = ({ events, facebookLikes }) => new Promise((resolve, reject) => {
  const payload = JSON.stringify(Object.assign({}, events, facebookLikes));
  exec(`python ./score.py ${payload}`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
})
