module.exports = {
  getTmMemberId: tmToken => {
    return fetch(`https://uapi.ticketmaster.com/oauth/token/${tmToken}`, {
      headers: {
        "Content-Type": "application/json",
        "X-SSL-CERT-UID": "0EC1A8FD-B5E1-A656-E050-A8C033A83F68"
      },
    }).then(res => res.json())
      .then(json => json.member_id);
  }
};
