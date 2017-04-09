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

function times(length, iteratee) {
  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = iteratee(index)
  }
  return result
}

function passHere(req, res, next) {
  res.send(req.params && Object.keys(req.params).length > 0 && parseParams(req.params) || createRandom());
  next();
}

function createRandom() {
  return {id: chance.natural()}
}

function parseParams(params) {
  if (!params) {
    return parseObject({});
  } else if (typeof params === "string") {
    return params;
  } else if (params['__length']) {
    let length = params['__length'];
    delete params['__length'];
    return times(length, () => parseObject(params));
  } else {
    return parseObject(params);
  }
}

function parseObject(obj) {
  const result= {};
  Object.keys(obj).map(key => {
    if (key.startsWith('_')) return;

    const value = obj[key];
    if (chance[value]) {
      const valueOptions = obj['_' + key];
      result[key] = chance[value](valueOptions);
    } else {
      result[key] = value;
    }
  });
  return result;
}

export default server;