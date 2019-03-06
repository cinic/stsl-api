'use strict';
const http = require('http');
const Response = require('./response');
const isEmpty = require('../utils/isEmpty');

/**
 * Initialize a new `Server` with the given `options`.
 *
 * @param {Object} [options]
 * @return {Server} which is an callable function
 * @public
 */
class Server {
  constructor(options = {}) {
    const { port, host, logger } = options;
    this.port = port;
    this.host = host;
    this.routes = [];
    this.server = http.createServer();
    this.logger = logger;
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleRequest(request, response) {
    const { method, url } = request;
    const _response = new Response(response, url, this.logger);
    // allow only GET requests
    if (!(/get/i).test(method)) {
      return _response.error500('Method not allowed');
    }

    const [filteredRoute] = this.routes.filter(item => item.pattern.test(url));

    if (!filteredRoute || isEmpty(filteredRoute)) {
      return _response.error404();
    }

    const { pattern, param, controller } = filteredRoute;
    const [_, paramValue] = pattern.exec(url);
    const match = {
      [param]: paramValue,
    }
    
    return controller({ match })
      .then(data => _response.ok(data))
      .catch(error => _response.error500(error));
  }

  get(path, callback) {
    const validCallback = validPathHandler(callback);
    const validPath = validPathParam(path);
    
    if (!validCallback) {
      console.warn('Route callback must be a function, but u try pass a ', typeof callback);
      
      return this;
    }

    if (!validPath) {
      console.warn('Route param must be a string, but u try pass a ', typeof path);
      
      return this;
    }

    const route = {
      ...pathToRegexp(path),
      controller: callback
    };

    this.routes = this.routes.concat(route);

    return this;
  }

  post(route, callback) {
    /**
     * May be need in future for post requests
     */
  }

  useLogger(logger) {
    this.logger = logger;
    
    return this;
  }

  start(logger) {
    this.server
      .on('request', this.handleRequest)
      .listen(this.port, this.host, () => console.log(`Server running at http://${this.host}:${this.port}/`));
  }
}

function validPathHandler(callback) {
  return typeof callback === 'function';
}

function validPathParam(path) {
  return typeof path === 'string';
}

function pathToRegexp(path) {
  /**
   * We can use npm path-to-regexp (https://github.com/pillarjs/path-to-regexp)
   * or RegExp pattern to find all matches,
   * or place RegExp in routes config, but is redundant in this case
   * just return mock data
   */
  let param = '';
  const route = path
    .split('/')
    .map(item => {
      const matched = item.match(/:(\w+)/i);
      const [_, match] = matched || ['', ''];
      param = match;
      
      return !matched ? item : '([^\/]+?)\/?$'
    })
    .join('\\/');
  const pattern = new RegExp(route, 'i');
  
   return {
     pattern,
     param
   }
}

module.exports = Server;
