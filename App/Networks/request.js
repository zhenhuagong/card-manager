var SuperAgent = require('superagent');
var P = require('bluebird');

var Request = {
  post(url, data) {
    return new P((resolve, reject) => {
      SuperAgent.post(url)
        .type('form')
        .send(data)
        .end((err, res) => {
          if (err || !res.body) {
            reject(err);
          } else {
            resolve(res.body);
          }
        });
    })
  }
}

module.exports = Request;
