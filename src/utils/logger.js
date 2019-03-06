const fs = require('fs');
const DateFormatter = require('./formatter');

class Logger {
  constructor({ enabled = true, file }) {
    this.enabled = enabled;
    this.file = file;
  }

  log (message, code = 200) {
    /**
     * Only one level used in this case,
     * if need more log levels just add, `fatal`, `debug` and etc.
     */

     if (!this.enabled) {
       return undefined;
     }

    const datetime = new DateFormatter();
    const line = `[${datetime.short()}] ${code} ${message}\n`;

    this.writeLine(this.file, line);
  }

  writeLine (location, message) {
    // ... some fs magic for test log dir exists
    fs.appendFile(location, message, (error) => {
        if (error) {
          console.log(error);
        }
    });
  }
}

module.exports = Logger;