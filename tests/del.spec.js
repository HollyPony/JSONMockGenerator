let mocha = require('mocha');

let describe = mocha.describe;

let common = require('./common.spec');

describe("DEL", function () {

  common("del");
});
