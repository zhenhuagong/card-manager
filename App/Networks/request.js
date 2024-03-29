let Config = require('../configs');
let QS = require('./qs');

// A promised fetch with timeout
let timeout = (ms, promise) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error(Config.errorMsg.fetchTimeout));
    }, ms);
    promise.then(resolve, reject);
  })
};

let Request = {
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
      })
    )
    .then((response) => response.json())
    .then((responseData) => Promise.resolve(responseData))
  },

  fetchAll(endpoint, queries, result) {
    result = result || [];
    return timeout(
      Config.timeout,
      this.get(endpoint, queries)
      .then((data) => {
        result = result.concat(data.list);
        if (data.cnt === result.length) {
          return Promise.resolve(result);
        } else {
          // fetch next page
          queries.PAGE_NUM = parseInt(queries.PAGE_NUM, 10) + 1;
          return this.fetchAll(endpoint, queries, result);
        }
      })
    );
  }
};

module.exports = Request;
