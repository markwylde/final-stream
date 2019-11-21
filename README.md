# FinalStream
[![Build Status](https://travis-ci.org/markwylde/final-stream.svg?branch=master)](https://travis-ci.org/markwylde/final-stream)
[![David DM](https://david-dm.org/markwylde/final-stream.svg)](https://david-dm.org/markwylde/final-stream)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/final-stream)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/final-stream)](https://github.com/markwylde/final-stream/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/final-stream)](https://github.com/markwylde/final-stream/blob/master/LICENSE)

A tool to read a full stream and callback once finished with the data

## Example Usage
### As a pure string
```javascript
const finalStream = require('final-stream')
finalStream(response, function (error, result) {
  console.log({error, result})
})
```

### With a mutator
```javascript
const finalStream = require('final-stream')
finalStream(response, JSON.parse, function (error, result) {
  console.log({error, result})
})
```

## License
This project is licensed under the terms of the MIT license.
