const test = require('tape');
const fs = require('fs');

const testFilePath = './test/testFiletoStream.txt'
const testFileContent = fs.readFileSync(testFilePath, 'utf8');
const finalStream = require('../');

test('basic stream to string', t => {
  t.plan(1);

  const stream = fs.createReadStream(testFilePath, { highWaterMark: 32});

  finalStream(stream, function (error, result) {
    t.equal(result, testFileContent);
  })
});
