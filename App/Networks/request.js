let Config = require('../configs');
let QS = require('./qs');

// A promised fetch with timeout
let timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error("fetch timeout"))
    }, ms);
    promise.then(resolve, reject);
  })
};

let Request = {
  post(endpoint, data, cb) {
    return timeout(
      Config.timeout,
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then((response) => response.json())
      .then((responseData) => {
        cb && cb(responseData);
      })
      .catch((error) => {
        console.log('post request error');
        console.log(error);
      })
      .done();
    );
  },

  get(endpoint, queries, cb) {
    let url = endpoint + '?' + QS.stringify(queries);
    return timeout(
      Config.timeout,
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
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
    );
  }
};

module.exports = Request;
