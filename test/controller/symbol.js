require('chai').should();
const ControllerSymbol = require('../../src/controller/symbol');

describe('ControllerSymbol', function () {
  describe('#getByName', function () {
    it('responds with matching records', async function () {
      this.timeout(10000);
      const symbol = await ControllerSymbol.getByName({ match: { name: 'aapl' }});
      symbol.should.have.property('body').have.all.keys(['price', 'logo', 'news']);
    });

    it('responds with error', async function () {
      this.timeout(10000);
      return ControllerSymbol
        .getByName({ match: { name: '1' }})
        .catch(error => error.should.have.property('statusCode').to.not.equal(200));
    });
  })
});