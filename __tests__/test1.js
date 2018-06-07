const frisby = require('frisby');
var nock = require('nock');
const config = require('./config.json');

// Nock will supply a default reply for all requests to http://some-end-point:3000/users/1.
// Nock will override what is actually on ../users/1 (if that endpoint actually exists)
nock(config.baseURL)
  .get(config.path + '/1')
  .reply(200, {
    id: '123ABC',
    first_name: 'XXXXX',
    last_name: 'YYYYY',
    phone: '111-111-11111111'
  });

it('GET against a mock endpoint AND intercept response with NOCK', function () {
  return frisby
    .get(config.baseURL + config.path + '/1')
    .then(function (res) {
      expect(res.json.id).toBe('123ABC');
      expect(res.json.first_name).toBe('XXXXX');
      expect(res.json.last_name).toBe('YYYYY');
      expect(res.json.phone).toBe('111-111-11111111');
    })
});

it('GET against a mock endpoint AND intercept response with NOCK', function () {

  // Nock configured within a test.
  nock(config.baseURL)
    .get(config.path + '/1')
    .reply(200, {
      id: '456ABC',
      first_name: 'AAA',
      last_name: 'BBB',
      phone: '111-111-22222222'
    });

  return frisby
    .get(config.baseURL + config.path + '/1')
    .then(function (res) {
      expect(res.json.id).toBe('456ABC');
      expect(res.json.first_name).toBe('AAA');
      expect(res.json.last_name).toBe('BBB');
      expect(res.json.phone).toBe('111-111-22222222');
    })
})