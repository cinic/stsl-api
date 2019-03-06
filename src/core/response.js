class Response {
  constructor(response, requestUrl, logger) {
    this.response = response;
    this.requestUrl = requestUrl;
    this.response.statusCode = 200;
    this.logger = logger;
    this.error404 = this.error404.bind(this);
    this.toJson = this.toJson.bind(this);
    this.error500 = this.error500.bind(this);
    this.ok = this.ok.bind(this);
    this.response.setHeader('Content-Type', 'application/json');
  }

  error404 (message = 'Not found') {
      this.response.statusCode = 404;
      this.toJson({ message });
  }

  toJson (data) {
    this.response.end(JSON.stringify(data));

    if (typeof this.logger === 'object') {
      this.logger.log(this.requestUrl, this.response.statusCode);
    }
  }

  ok (data) {
    this.toJson(data);
  }

  error500 (message = 'Internal server error') {
    this.response.statusCode = 500;
    this.toJson({ message });
  }

  error(message, code) {
    this.response.statusCode = code;
    this.toJson({ message });
  }
}

module.exports = Response;
