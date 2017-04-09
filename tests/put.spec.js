let mocha = require('mocha');
let chakram = require('chakram');

let before = mocha.before;
let after = mocha.after;
let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

let config = require('./config.js');

describe("PUT", function() {
  before(done => {
    console.log("before put");
    done();
  });
  after(done => {
    console.log("after put");
    done();
  });

  it("Get random object", function () {
    let response = chakram.put(config.target);
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });
});
