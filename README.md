# JDita
[![Node.js Version](https://img.shields.io/node/v-lts/jdita)](https://nodejs.org)
[![Npm Package Version](https://img.shields.io/npm/v/jdita)](https://www.npmjs.com/package/jdita)
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

* Minimal Node version: v20.1.0
* Optional: This project uses Yarn as its build system. Although we don't support it, if you prefer, it should also be possible to use npm instead of Yarn. The version of Yarn that we have used is v1.22.21.

### Packages

This project uses [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces).
The current packages, aka. "workspaces" are `lwdita-xml` and `lwdita-xml` and can be found in folder `packages/`.
Package `lwdita-xml` contains all files and modules for parsing an xml document.
Package `lwdita-ast` contains all files and modules for creating the abstract syntax tree ("AST") of the parsed XML document, provided by package `lwdita-xml`.

Both packages depend on each other, as indicated by the `dependency` in their respective package.json files, and they share the same global node modules and commands as declared in the `package.json` file in the root of the project.

If in the future different node modules or commands should be defined for the packages, then you are able to address the packages directly with command

```shell
yarn workspace <workspace_name> <command>
```

In the global package.json you can e.g. define specific commands for each package like following pattern:

```json
"scripts": {
  "start:package-a": "yarn workspace package-a start",
  "start:package-b": "yarn workspace package-b start"
}
```

To get more information about contained workspaces, run command

```shell
yarn workspaces info
```

### Build

To build the project, run:

```shell
yarn build
```

will create a `./lib` folder in the root of the project, which contains binaries that can be copied to your own project.

### Generate the TSDoc Documentation

You can generate the documentation by running

```shell
yarn run generate-docs
```

This will generate a new folder `docs` containing an HTML file with the entire TSDoc jdita documentation.
Open this file in a browser to navigate through the documentation.

### Test

This project also has tests which are written using the Mocha framework.
To execute the test suite and view the code coverage, run:

```shell
yarn test
yarn coverage
```

### Example

We have an example file to test the conversion: `example.ts`.
This file contains a small example in `XDITA` format.

If you want to test this library and its conversion from `XDITA` to `JDITA`, run:

```shell
yarn run ts-node ./example.ts
```

## How jdita Works

Jdita takes in documents in authoring format XDITA, and converts it to a document node tree.

XDITA is the LwDITA authoring format that uses XML to structure information. XDITA is a subset of DITA, with new multimedia element types added to support interoperability with HTML5.
[Source: https://www.dita-ot.org/4.1/topics/lwdita-input](https://www.dita-ot.org/4.1/topics/lwdita-input)

The conversion process starts by building a document node,  then appending each element tag as a node while saving the tag attributes as node properties.
This will generate a full document tree that represents the original XDITA document as a JavaScript object.

![Diagram of converter.ts](diagrams/jdita-diagram-conversion.svg "Diagram of converter.ts")

Here's how the nodes are created:

![Diagram the node creation](diagrams/jdita-diagram-node-creation.svg "Diagram the node creation")

Examples of the nodes `<title>` and `<topic>`:

![Diagram of example nodes](diagrams/jdita-diagram-nodes.svg "Diagram of example nodes")