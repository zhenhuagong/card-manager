let Config = require('../configs');
let QS = require('./qs');

// A promised fetch with timeout
let timeout = (ms, promise) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(new Error(Config.errorMsg.fetchTimeout))
    }, ms);
    promise.then(resolve, reject);
  })
};

let Request = {
  post(endpoint, data) {
    return timeout(
      Config.timeout,
      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }))
      .then((response) => response.json())
      .then((responseData) => {
        return Promise.resolve(responseData);
      });
  },

  get(endpoint, queries) {
    let url = endpoint + '?' + QS.stringify(queries);
    return timeout(
      Config.timeout,
      fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }))
      .then((response) => response.json())
      .then((responseData) => {
        return Promise.resolve(responseData);
      });
  },

  fetchAll(endpoint, queries, result) {
    result = result || [];
    return this.get(endpoint, queries)
      .then((data) => {
        result = result.concat(data.list);
        if (data.cnt === result.length) {
          return Promise.resolve(result);
        } else {
          // fetch next page
          queries.PAGE_NUM = parseInt(queries.PAGE_NUM, 10) + 1;
          return fetchAll(endpoint, queries, result);
        }
      });
  }
};

module.exports = Request;
