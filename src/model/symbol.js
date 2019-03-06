const fetch = require('../core/fetch');

class Symbol {
  constructor(name) {
    /**
     * These paths are used only in this model, so they do not need to have a separate config
     */
    const paths = {
      quote: `https://api.iextrading.com/1.0/stock/${name}/quote`,
      news: `https://api.iextrading.com/1.0/stock/${name}/news/last/1`,
      logo: `https://api.iextrading.com/1.0/stock/${name}/logo`
    }

    const fetchQuote = fetch(paths.quote);
    const fetchLogo = fetch(paths.logo);
    const fetchNews = fetch(paths.news);
    const promises = Promise.all([fetchQuote, fetchLogo, fetchNews])

    return new Promise((resolve, reject) => {
      promises
        .then(result => {
          const [quote, logo, news] = result;
          const [latestNews] = news;

          return resolve({
            price: quote.latestPrice,
            logo: logo.url,
            news: latestNews.url
          })
        },
        error => reject(error));
    });
  }
}

module.exports = Symbol;
