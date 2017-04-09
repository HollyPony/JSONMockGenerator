let mocha = require('mocha');
let chakram = require('chakram');

let before = mocha.before;
let after = mocha.after;
let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

let config = require('./config.js');
let common = require('./common.spec');

describe("POST", function() {
  before(done => {
    console.log("before post");
    done();
  });
  after(done => {
    console.log("after post");
    done();
  });

  common("post");

  it("with string", function () {
    let response = chakram.post(config.target, 'value1');
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });

  it("with empty array", function () {
    let response = chakram.post(config.target, {"__length": 0});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });

  it("with object", function () {
    let response = chakram.post(config.target, {pattern: 'chakram'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });

  it("with array of object with params", function () {
    let response = chakram.post(config.target, {"__length": 5, test: "sdff", poi: "date", "_poi": {year: 1983}});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.schema({"type": "array"});
    return chakram.wait();
  });

  it("with value number typed", function () {
    let response = chakram.post(config.target, {test1: 0});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });

  it("with two levels array of object", function () {
    let response = chakram.post(config.target, {"__length": 5, test: "sdff", poi: "date", inside: {"__length": 5, test: "sdff", poi: "date"}});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.schema({"type": "array"});
    return chakram.wait();
  });
});
