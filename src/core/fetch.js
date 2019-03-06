const https = require('https'); // We know API protocol use SSL

function fetch(url) {
  const result = [];

  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        const { headers, statusCode } = response;
        const json = headers['content-type'].indexOf('application/json') !== -1;

        response
          .on('data', chunk => result.push(chunk))
          .on('end', () => {
            const bodyBuffer = Buffer.concat(result).toString();
            const body = json ? JSON.parse(bodyBuffer) : bodyBuffer;
            const data = { statusCode, body };

            return statusCode === 200 ? resolve(data) : reject(data);
          });
      })
      .on('error', error => reject(error))
      .end();
  });
}

module.exports = fetch;
