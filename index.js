const ErrorWithObject = require('error-with-object');

function parseBody (stream, mutation, callback) {
  if (!callback) {
    callback = mutation;
    mutation = undefined;
  }

  if (!stream) {
    throw new ErrorWithObject({
      code: 'NO_STREAM_OBJECT',
      message: 'You did not set a stream.'
    });
  }

  const body = [];

  stream
    .on('data', function (chunk) {
      body.push(chunk);
    })

    .on('end', function () {
      const bodyString = Buffer.concat(body).toString();

      callback(null, bodyString && mutation ? mutation(bodyString) : bodyString);
    })
    .on('error', function (error) {
      callback(error);
    });
}

module.exports = parseBody;
