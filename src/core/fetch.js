const https = require('https'); // We know API protocol use SSL

function fetch(url) {
  const result = [];

  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        const json = response.headers['content-type'].indexOf('application/json') !== -1;

        response
          .on('data', chunk => result.push(chunk))
          .on('end', () => {
            const body = Buffer.concat(result).toString();
            return json ? resolve(JSON.parse(body)) : reject('Internal server error');
          });
      })
      .on('error', error => reject(error))
      .end();
  });
}

module.exports = fetch;
