import restify from 'restify';
import Chance from 'chance';
import logger from 'morgan'

const chance = new Chance();

const server = restify.createServer();
server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(logger('common'));

server.get(/.*/, passHere);
server.post(/.*/, passHere);
server.put(/.*/, passHere);
server.del(/.*/, passHere);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function passHere(req, res, next) {
  res.send(req.params && Object.keys(req.params).length > 0 && parseParams(req.params) || createRandom());
  next();
}

function createRandom() {
  return {id: chance.natural()}
}

function parseParams(params) {
  return params
}

export default server;