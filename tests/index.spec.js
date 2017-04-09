let mocha = require('mocha');
let chakram = require('chakram');

let describe = mocha.describe;
let it = mocha.it;
let expect = chakram.expect;

describe("Create random object", function () {

  describe("With GET", function() {
    // Get from url value
    it("", function () {
      let response = chakram.get("http://localhost:8080/?test=chakram");
      expect(response).to.have.status(200);
      expect(response).to.have.header("content-type", "application/json");
      expect(response).to.comprise.of.json({test: "chakram" });
      return chakram.wait();
    });
  });

  describe("With POST", function() {

    // Get body instead of url values
    it("should make HTTP assertions easy", function () {
      let response = chakram.post("http://localhost:8080/?test=chakram", {tesvvt: 'value1'});
      expect(response).to.have.status(200);
      expect(response).to.have.header("content-type", "application/json");
      expect(response).to.comprise.of.json({test: "chakram" });
      return chakram.wait();
    });
    it("should make HTTP assertions easy", function () {
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

  describe("With PUT", function() {

  });

  describe("With DEL", function() {

  });
});
