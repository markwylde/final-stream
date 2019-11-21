# Callarest
[![Build Status](https://travis-ci.org/markwylde/callarest.svg?branch=master)](https://travis-ci.org/markwylde/callarest)
[![David DM](https://david-dm.org/markwylde/callarest.svg)](https://david-dm.org/markwylde/callarest)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/callarest)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/callarest)](https://github.com/markwylde/callarest/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/callarest)](https://github.com/markwylde/callarest/blob/master/LICENSE)

A simple tool to natively make http(s) requests in node

## Example Usage
```javascript
const callarest = require('callarest')
callarest({
  url: 'https://www.example.com'
}, function (error, result) {
  console.log({error, result})
})
```

## License
This project is licensed under the terms of the MIT license.
