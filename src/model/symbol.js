const fetch = require('../core/fetch');

class Symbol {
  constructor(name) {
    /**
     * These paths are used only in this model, so they do not need to have a separate config
     */
    const fetchQuote = fetch(`https://api.iextrading.com/1.0/stock/${name}/quote`);
    const fetchLogo = fetch(`https://api.iextrading.com/1.0/stock/${name}/logo`);
    const fetchNews = fetch(`https://api.iextrading.com/1.0/stock/${name}/news/last/1`);

    return new Promise((resolve, reject) => {
      Promise
        .all([fetchQuote, fetchLogo, fetchNews])
        .then(([quote, logo, news]) => {
          const [latestNews] = news.body;
          const body =  {
            price: quote.body.latestPrice,
            logo: logo.body.url,
            news: latestNews.url
          }

          resolve({ statusCode: 200, body });
        })
        .catch(error => reject(error));
    });
  }
}

module.exports = Symbol;
