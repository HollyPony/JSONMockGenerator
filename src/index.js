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

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function passHere(req, res, next) {
  const result = (req.params && Object.keys(req.params).length > 0)
    ? parseParams(req.params) : createRandom();
  //console.log(result);
  res.send(result);
  next();
}

function createRandom() {
  return {id: chance.natural()}
}

function parseParams(params) {
  if (!params) {
    return parseObject();
  } else if (typeof params === "string") {
    return params;
  } else if (params['__length'] && params['__length'] > 1) {
    return Array.apply(null, new Array(params['__length'])).map(() => parseObject(params));
  } else {
    return parseObject(params);
  }
}

function parseObject(obj) {
  const result= {};
  Object.keys(obj).map(key => {
    if (key.startsWith('_')) return;

    const value = obj[key];
    result[key] = typeof value === 'number'
      ? value
      : typeof value === "string"
        ? (chance[value])
          ? chance[value](obj['_' + key])
          : value
        : parseParams(value);
  });
  return result;
}

export default server;