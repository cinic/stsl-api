const Symbol = require('../model/symbol');

class ControllerSymbol {
  static getByName({ match }) {
    return new Symbol(match.name);
  }
}

module.exports = ControllerSymbol