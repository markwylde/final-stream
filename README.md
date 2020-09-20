# Final Stream
[![Build Status](https://travis-ci.org/markwylde/final-stream.svg?branch=master)](https://travis-ci.org/markwylde/final-stream)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/final-stream)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/final-stream)](https://github.com/markwylde/final-stream/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/final-stream)](https://github.com/markwylde/final-stream/blob/master/LICENSE)

A tool to read a full stream and callback once finished with the data

## Example Usage
### With callbacks
```javascript
const finalStream = require('final-stream');
finalStream(request, function (error, result) {
  console.log(error, result.toString());
});
```

### With promises
```javascript
const finalStream = require('final-stream');
const result = await finalStream(request);
console.log(result.toString());
```

## License
This project is licensed under the terms of the MIT license.
