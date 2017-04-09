let mocha = require('mocha');
let chakram = require('chakram');

let after = mocha.after;
let before = mocha.before;
let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

describe("GET", function() {

  before(done => {
    console.log("before get");
    done();
  });

  after(done => {
    console.log("after get");
    done();
  });

  // Get from url value
  it("with nothing", function () {
    let response = chakram.get("http://localhost:8080/");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });
  // Get from url value
  it("with defined object", function () {
    let response = chakram.get("http://localhost:8080/?test=chakram");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.comprise.of.json({test: "chakram" });
    return chakram.wait();
  });
});