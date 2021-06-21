const test = require('basictap');
const fs = require('fs');
const Readable = require('stream').Readable;

const finalStream = require('../');

test('promise - basic stream to string', async t => {
  t.plan(1);

  const testFilePath = './test/testFiletoStream.txt';
  const testFileContent = fs.readFileSync(testFilePath, 'utf8');
  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32 });

  const result = await finalStream(stream);
  t.equal(result.toString(), testFileContent);
});

test('promise - with no stream object', async t => {
  t.plan(1);

  try {
    await finalStream(null);
  } catch (error) {
    t.equal(error.code, 'NO_STREAM_OBJECT');
  }
});

test('promise - when stream errors', t => {
  t.plan(1);

  const stream = new Readable({
    read (size) {}
  });

  finalStream(stream).catch(error => {
    t.equal(error.toString(), 'Error: oh no');
  });

  stream.emit('error', new Error('oh no'));
});

test('basic stream to string', t => {
  t.plan(1);

  const testFilePath = './test/testFiletoStream.txt';
  const testFileContent = fs.readFileSync(testFilePath, 'utf8');
  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32 });

  finalStream(stream, function (error, result) {
    if (error) { console.log(error); }
    t.equal(result.toString(), testFileContent);
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

test('when stream is destroyed prematurely', async t => {
  t.plan(1);

  const testFilePath = './test/testFiletoStream.txt';
  const testFileContent = fs.readFileSync(testFilePath, 'utf8');
  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32 });
  stream.destroy();

  const result = await finalStream(stream);
  t.equal(result.toString(), '');
});

test('when stream is closed prematurely', async t => {
  t.plan(1);

  const testFilePath = './test/testFiletoStream.txt';
  const testFileContent = fs.readFileSync(testFilePath, 'utf8');
  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32 });
  stream.close();

  const result = await finalStream(stream);
  t.equal(result.toString(), '');
});
