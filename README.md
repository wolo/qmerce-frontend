qmerce-rest
===========

A small library providing convenient methods to call a JSON-style REST API.

## Installation

  npm install qmerce-rest --save

## Usage

  var rest = require('qmerce-rest')
      api = rest(URL, { user: USER, password: PASSWORD });

  api.getAsync()
  .then((data) {
     data.counter++;
     return api.putAsync(data);
  }
  .then(() => api.deleteAsync())
  .catch((err) => console.log(err));

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
