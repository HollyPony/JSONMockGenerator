const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../src')

const expect = chai.expect

chai.use(chaiHttp)

const execute = (method = 'get', params = 'query') => {
  describe(method.toUpperCase(), () => {
    it("with nothing", done => {
      chai.request(server)[method]('/')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res).to.have.header('content-type', 'application/json')
          expect(res.body).to.have.property('id')
          done()
        })
    })

    it("with deep url", done => {
      chai.request(server)[method]('/deep/url.with.weird/pah.but.valid')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res).to.have.header('content-type', 'application/json')
          expect(res.body).to.have.property('id')
          done()
        })
    })

    it("with string", done => {
      chai.request(server)[method]('/')[params]('value1')
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('value1', '')
          done()
        })
    })

    it("with defined object", done => {
      chai.request(server)[method]('/')[params]({ val: 'jmgen' })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('val', 'jmgen')
          done()
        })
    })

    it("with empty array", done => {
      chai.request(server)[method]('/')[params]({ '_length': 0 })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array').that.is.empty
          done()
        })
    })

    it("with object", done => {
      chai.request(server)[method]('/')[params]({ pattern: 'jmgen' })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object').that.is.not.empty
          expect(res.body).to.have.property('pattern', 'jmgen')
          done()
        })
    })

    it("with array of object with params", done => {
      chai.request(server)[method]('/')[params]({
        _length: 5,
        test: "sdff",
        poi: "date",
        _poi: {
          year: 1983
        }
      })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array').that.is.not.empty
          res.body.every(i => expect(i).to.have.property('test'))
          res.body.every(i => expect(i).to.have.property('poi'))
          // res.body.every(i => expect(i).to.have.property('poi').to.be.a('date'))
          done()
        })
    })

    it("with value number typed as zero", done => {
      chai.request(server)[method]('/')[params]({
        test1: 0,
      })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object').that.is.not.empty
          expect(res.body).to.have.property('test1', params === 'query' ? '0' : 0)
          done()
        })
    })

    it("with value number typed as 2", done => {
      chai.request(server)[method]('/')[params]({
        test1: 2,
      })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('object').that.is.not.empty
          expect(res.body).to.have.property('test1', params === 'query' ? '2' : 2)
          done()
        })
    })

    it("with two levels array of object", done => {
      chai.request(server)[method]('/')[params]({
        _length: 5,
        test: "sdff",
        poi: "date",
        inside: {
          _length: 5,
          test: "sdff",
          poi: "date"
        }
      })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body).to.be.an('array').that.is.not.empty
          res.body.every(i => expect(i).to.have.property('test'))
          res.body.every(i => expect(i).to.have.property('inside').that.is.an('array'))
          done()
        })
    })
  })
}

describe("JSONMock", () => {
  execute('get', 'query')
  execute('post', 'send')
  execute('put', 'send')
  execute('delete', 'send')
})
