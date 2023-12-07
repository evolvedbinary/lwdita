# JDita
![Version 0.1.0](https://img.shields.io/badge/version-0.1.0-blue)
[![Build Status](https://travis-ci.com/evolvedbinary/jdita.svg?branch=main)](https://travis-ci.com/evolvedbinary/jdita)
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

For development, you will only need Node.js and a node package manager, like Yarn, to be installed in your environement.

* Minimal Node version: v12
* Optional: This project uses Yarn as a package manager, but you're still able to use only npm. The used version of Yarn is v1.22.21.

### Build

```shell
yarn build
```

will create a `/lib` folder in the root of the project, which contains binaries and can be copied to your own project.

### Test

Run the tests with

```shell
// Using Mocha
yarn test

// Code coverage
yarn coverage
```

### Example

We have an example file to test the conversion: `src/example.ts`.
Test it with:

```shell
yarn run ts-node ./src/example.ts
```
