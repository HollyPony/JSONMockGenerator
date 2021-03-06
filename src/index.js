const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const Chance = require('chance');

const cors = corsMiddleware({})
const chance = new Chance();

const server = restify.createServer();
server.pre(cors.preflight);

server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(cors.actual);

server.get('/*', parseRequest);
server.post('/*', parseRequest);
server.put('/*', parseRequest);
server.del('/*', parseRequest);

server.listen(process.env.PORT || 8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});

function parseRequest(req, res, next) {
  const result = parseParams(Object.assign({}, req.query, req.body));
  res.send(result);
  next();
}

function parseParams(params) {
  if (!params) {
    return parseObject({});
  } else if (typeof params === "string") {
    return params;
  } else if (params['_length'] !== undefined) {
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
  return Object.keys(result).length > 0 && result || { id: chance.natural() };
}

module.exports = server;
