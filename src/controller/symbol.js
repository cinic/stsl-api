const Symbol = require('../model/symbol');

class ControllerSymbol {
  static getByName(params) {
    return new Symbol(params.match.name);;
  }
}

module.exports = ControllerSymbol