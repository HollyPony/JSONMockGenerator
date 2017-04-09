import restify from 'restify';

let server = restify.createServer();
server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get(/.*/, passHere);
server.post(/.*/, passHere);
server.put(/.*/, passHere);
server.del(/.*/, passHere);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function passHere(req, res, next) {
  console.log(req.params && Object.keys(req.params).length > 0);
  res.send(req.params && Object.keys(req.params).length > 0 && parseParams(req.params) || createRandom());
  next();
}

function createRandom() {
  return {id: ""}
}

function parseParams(params) {
  return params
}

export default server;