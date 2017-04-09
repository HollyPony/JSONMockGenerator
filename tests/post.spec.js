let mocha = require('mocha');
let chakram = require('chakram');

let before = mocha.before;
let after = mocha.after;
let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

describe("With POST", function() {
  before(done => {
    console.log("before post");
    done();
  });
  after(done => {
    console.log("after post");
    done();
  });

  it("get random object", function () {
    let response = chakram.post("http://localhost:8080/");
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("id", () => true);
    return chakram.wait();
  });

  it("get defined object", function () {
    let response = chakram.post("http://localhost:8080/?test=chakram", {tesvvt: 'value1'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.comprise.of.json({test: "chakram" });
    return chakram.wait();
  });

  it("get defined list of objects", function () {
    let response = chakram.post("http://localhost:8080/", {test: 'chadkram'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.have.json("test", () => true);
    return chakram.wait();
  });
  it("should make HTTP assertions easy", function () {
    let response = chakram.post("http://localhost:8080/", {test: 'chakram'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.comprise.of.json({test: "chakram" });
    return chakram.wait();
  });
  it("should make HTTP assertions easy", function () {
    let response = chakram.post("http://localhost:8080/", {test: 'chakram'});
    expect(response).to.have.status(200);
    expect(response).to.have.header("content-type", "application/json");
    expect(response).to.comprise.of.json({test: "chakram" });
    return chakram.wait();
  });
});
