const ErrorWithObject = require('error-with-object');

function parseBody (stream, mutation, callback) {
  if (!callback) {
    callback = mutation;
    mutation = undefined;
  }

  if (!stream) {
    return callback(new ErrorWithObject({
      code: 'NO_STREAM_OBJECT',
      message: 'You did not set a stream.'
    }));
  }

  let body = [];

  stream
    .on('data', function (chunk) {
      body.push(chunk);
    })

    .on('end', function () {
      body = Buffer.concat(body).toString();

      if (body) {
        try {
          return callback(null, mutation ? mutation(body) : body);
        } catch (error) {
          return callback(new ErrorWithObject({ code: 400, error, body }));
        }
      }

      return callback(null, null);
    })
    .on('error', function (error) {
      callback(error);
    });
}

module.exports = parseBody;
