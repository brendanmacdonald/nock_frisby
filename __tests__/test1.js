const frisby = require('frisby');
var nock = require('nock');
const config = require('./config.json');

// Nock will supply a default reply for all requests to http://localhost:3000/customers/1.
// Nock will override what is actually on ../customers/1.
// This endpoint doesn't need to be running for the test to pass.
nock(config.baseURL)
  .get(config.customerPath + '/1')
  .reply(200, {
    id: '123ABC',
    first_name: 'XXXXX',
    last_name: 'YYYYY',
    phone: '111-111-11111111'
  });

it('GET against a mock endpoint AND intercept response with NOCK', function () {
  return frisby
    .get(config.baseURL + config.customerPath + '/1')
    .then(function (res) {
      expect(res.json.id).toBe('123ABC');
      expect(res.json.first_name).toBe('XXXXX');
      expect(res.json.last_name).toBe('YYYYY');
      expect(res.json.phone).toBe('111-111-11111111');
    })
});



