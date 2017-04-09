let mocha = require('mocha');
let chakram = require('chakram');

let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

describe("With DEL", function() {
  it("Get random object", function () {
    let response = chakram.del("http://localhost:8080/");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });
});
