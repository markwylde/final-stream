const { promisify } = require('util');

function parseBody (stream, callback) {
  if (!stream) {
    throw Object.assign(new Error('You did not set a stream.'), {
      code: 'NO_STREAM_OBJECT'
    });
  }

  const body = [];

  stream
    .on('data', function (chunk) {
      body.push(chunk);
    })

    .on('close', function () {
      callback(null, Buffer.concat(body));
    })
    .on('error', function (error) {
      callback(error);
    });
}

module.exports = function (...args) {
  if (args.length === 1) {
    return promisify(parseBody)(...args);
  }

  return parseBody(...args);
};
