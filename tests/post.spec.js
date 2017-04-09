let mocha = require('mocha');
let chakram = require('chakram');

let before = mocha.before;
let after = mocha.after;
let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

describe("POST", function() {
  before(done => {
    console.log("before post");
    done();
  });
  after(done => {
    console.log("after post");
    done();
  });

  it("with nothing", function () {
    let response = chakram.post("http://localhost:8080/");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });

  it("with string", function () {
    let response = chakram.post("http://localhost:8080/", 'value1');
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });

  it("with empty array", function () {
    let response = chakram.post("http://localhost:8080/", {length: 0});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });
  it("with object", function () {
    let response = chakram.post("http://localhost:8080/", {pattern: 'chakram'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });
  it("with complex array of object", function () {
    let response = chakram.post("http://localhost:8080/", {length: 5, test: "sdff", poi: "date"});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    return chakram.wait();
  });
});
