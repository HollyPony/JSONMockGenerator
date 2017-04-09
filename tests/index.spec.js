let mocha = require('mocha');

let after = mocha.after;
let before = mocha.before;

before(done => {
  console.log("before all");
  done();
});

after(done => {
  console.log("after all");
  done();
});

require('./get.spec');
require('./post.spec');
require('./put.spec');
require('./del.spec');