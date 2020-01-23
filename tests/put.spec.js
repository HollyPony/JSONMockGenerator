let mocha = require('mocha');

let before = mocha.before;
let after = mocha.after;
let describe = mocha.describe;
let common = require('./common.spec');

describe("PUT", function () {
  before(done => {
    console.log("before put");
    done();
  });
  after(done => {
    console.log("after put");
    done();
  });

  common("put");
});
