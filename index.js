const { promisify } = require('util');

function parseBody (stream, callback) {
  if (!stream) {
    throw Object.assign(new Error('You did not set a stream.'), {
      code: 'NO_STREAM_OBJECT'
    });
  }

  const body = [];

  let finished = false;
  function finish () {
    if (finished) {
      return;
    }
    finished = true;
    callback(null, Buffer.concat(body));
  }

  stream
    .on('data', function (chunk) {
      body.push(chunk);
    })
    .on('end', finish)
    .on('close', finish)
    .on('error', function (error) {
      if (finished) {
        console.log(error);
        return;
      }
      callback(error);
    });
}

module.exports = function (...args) {
  if (args.length === 1) {
    return promisify(parseBody)(...args);
  }

  return parseBody(...args);
};
