import restify from 'restify';
import Chance from 'chance';
import logger from 'morgan'

const chance = new Chance();

const server = restify.createServer();
server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(logger('common'));

server.get(/.*/, parseRequest);
server.post(/.*/, parseRequest);
server.put(/.*/, parseRequest);
server.del(/.*/, parseRequest);

server.listen(process.env.PORT || 8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});

function parseRequest(req, res, next) {
  const result = parseParams(req.params);
  console.log(result);
  res.send(result);
  next();
}

function parseParams(params) {
  if (!params) {
    return parseObject({});
  } else if (typeof params === "string") {
    return params;
  } else if (params['_length'] && parseInt(params['_length']) > 1) {
    return Array.apply(null, new Array(parseInt(params['_length']))).map(() => parseObject(params));
  } else {
    return parseObject(params);
  }
}

function parseObject(obj) {
  const result = {};
  obj && Object.keys(obj).forEach(key => {
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
  return Object.keys(result).length > 0 && result || {id: chance.natural()};
}

export default server;