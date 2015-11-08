let Config = require('../configs');
let QS = require('./qs');

let Request = {
  post(endpoint, data) {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  },

  get(endpoint, queries, cb) {
    let url = endpoint + '?' + QS.stringify(queries);
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      cb && cb(responseData);
    })
    .catch((error) => {
      console.log('get request error');
      console.log(error);
    })
    .done();
  }
}

module.exports = Request;
