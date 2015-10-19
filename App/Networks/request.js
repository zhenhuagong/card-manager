var SuperAgent = require('superagent');

var Request = {
  post(url, params) {
    SuperAgent.post(url)
      .type('form')
      .send(params.data)
      .end((err, res) => {
        if (err || !res.body) {
          params.onFail && params.onFail();
        } else {
          params.onSuccess && params.onSuccess(res.body);
        }
      });
  }
}

module.exports = Request;
