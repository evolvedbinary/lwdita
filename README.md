# JDita
[![Version](https://img.shields.io/npm/v/jdita)](https://www.npmjs.com/package/jdita)
[![Build Status](https://circleci.com/gh/evolvedbinary/jdita.svg?style=svg)](https://circleci.com/gh/evolvedbinary/jdita)
[![Coverage Status](https://coveralls.io/repos/github/evolvedbinary/jdita/badge.svg?branch=main)](https://coveralls.io/github/evolvedbinary/jdita?branch=main)

This tool generates JSON data from XDita files

---

## Usage

You can add JDita to your project using `npm` or `yarn`

```bash
npm install --save jdita
```
or
```bash
yarn add jdita
```

```javascript
const { xditaToJson } = require("jdita");

const xml = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
<topic>...</topic>
`
xditaToJson(xml)
  .then(JDitaDocument => console.log(JSON.stringify(result, null, 2)))
  .catch(error => console.log('Failed to convert:', error));
```

By default, `xditaToJson` will fail when it encounters any error (XML syntax errors, validation errors,...).
If you want to ignore any errors and work with whatever data the function could collect, set the second argument `abortOnError` to `false`:

```javascript
xditaToJson(xml, false)
```

## Development

For development, you will need Node.js and a node package manager, like Yarn, to be installed in your environement.

* Minimal Node version: v12
* Optional: This project uses Yarn as its build system. Although we don't support it, if you prefer, it should also be possible to use npm instead of Yarn. The version of Yarn that we have used is v1.22.21.

### Build

To build the project, run:

```shell
yarn build
```

will create a `./lib` folder in the root of the project, which contains binaries that can be copied to your own project.

### Test

This project also has tests which are written using the Mocha framework.
To execute the test suite and view the code coverage, run:

```shell
yarn test
yarn coverage
```

### Example

We have an example file to test the conversion: `src/example.ts`.
This file contains a small example in `XDITA` format.

If you want to test this library and its conversion from `XDITA` to `JDITA`, run:

```shell
yarn run ts-node ./src/example.ts
```
