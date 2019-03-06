const path = require('path');
const ControllerSymbol = require('./controller/symbol');
const Server = require('./core/server');
const Logger = require('./utils/logger');

const { NODE_HOST, NODE_PORT, LOG } = process.env;
const HOST_NAME = NODE_HOST || '127.0.0.1';
const PORT = NODE_PORT || 3009;
const LOG_ENABLED = LOG || true;
const LOG_FILE = path.join(process.cwd(), 'stsl.log');


new Server({ host: HOST_NAME, port: PORT })
  .get('/symbols/:name', ControllerSymbol.getByName)
  .useLogger(new Logger({ enabled: LOG_ENABLED, file: LOG_FILE }))
  .start()
  