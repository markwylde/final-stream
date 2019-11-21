const test = require('tape');
const fs = require('fs');
const Readable = require('stream').Readable;

const finalStream = require('../');

test('basic stream to string', t => {
  t.plan(1);

  const testFilePath = './test/testFiletoStream.txt';
  const testFileContent = fs.readFileSync(testFilePath, 'utf8');
  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32 });

  finalStream(stream, function (error, result) {
    if (error) { console.log(error); }
    t.equal(result, testFileContent);
  });
});

test('basic stream to json', t => {
  t.plan(1);

  const testFileContent = require('./testJsonFileToStream.json');
  const stream = fs.createReadStream('./test/testJsonFileToStream.json', { highWaterMark: 32 });

  finalStream(stream, JSON.parse, function (error, result) {
    if (error) { console.log(error); }
    t.deepEqual(result, testFileContent);
  });
});

test('with no stream object', t => {
  t.plan(1);

  try {
    finalStream(null, function (error, result) {
      if (error) { console.log(error); }
    });
  } catch (error) {
    t.equal(error.code, 'NO_STREAM_OBJECT');
  }
});

test('when stream errors', t => {
  t.plan(1);

  const stream = new Readable({
    read (size) {}
  });

  finalStream(stream, function (error, result) {
    t.equal(error.toString(), 'Error: oh no');
  });

  stream.emit('error', new Error('oh no'));
});
