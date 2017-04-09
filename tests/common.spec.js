let mocha = require('mocha');
let chakram = require('chakram');

let it = mocha.it;
let expect = chakram.expect;

let config = require('./config.js');

module.exports = function (method) {
  it("with nothing", function () {
    let response = chakram[method](config.target);
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });
};