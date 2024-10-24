# lwdita-xdita

`lwdita-xdita` is a XDITA parser and serializer for [LwDITA](https://github.com/oasis-tcs/dita-lwdita).
It is responsible for converting LwDITA files to/from an object tree structure.

This project depends on the [`@evolvedbinary/lwdita-ast`](https://www.npmjs.com/package/@evolvedbinary/lwdita-xdita) package to provide the mapping from the [XDita schema](https://github.com/oasis-tcs/dita-lwdita/blob/spec/org.oasis.xdita/dtd/lw-topic.mod).

## Usage

You can add `lwdita-xdita` to your project using `npm` or `yarn`.

```bash
npm install --save @evolvedbinary/lwdita-xdita
```

or

```bash
yarn add @evolvedbinary/lwdita-xdita
```

### XDITA Parsing Example

The following example code shows how to parse XDITA to an lwdita-ast object tree.

```javascript
import { xditaToAst, astToJdita } from "@evolvedbinary/lwdita-xdita/converter";

const xdita = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
<topic>...</topic>
`

const abortOnError = true;

xditaToAst(xdita, abortOnError)
  .then(ast => console.log(JSON.stringify(ast.json, null, 2))
  .catch(e => console.log('Failed to convert:', e));
```

As `abortOnError` is set to `true` above, `xditaToAst` will fail when it encounters any error (XML syntax errors, validation errors, etc.). If instead you want to ignore any errors and work with whatever data the function could collect, `abortOnError` to `false` instead.

#### Experimental JDita Model
If you would prefer a simpler object model than the lwdita-ast to work with, we have an experimental object model called JDita. To use this, you can pass the output of `xditaToAst` through the experimental converter function `astToJdita`. Note that this API is subject to change! For example:

```javascript
xditaToAst(xdita, abortOnError)
  .then(ast => astToJdita(ast))
  .then(jdita => console.log(JSON.stringify(jdita.json, null, 2))
  .catch(e => console.log('Failed to convert:', e));
```

### XDITA Serialization Example

A full example with an additional option for serializing the AST object back into XML can be found in the file [example.ts](packages/lwdita-xdita/example.ts).

```javascript
import { InMemoryTextSimpleOutputStreamCollector, XditaSerializer } from "@evolvedbinary/lwdita-xdita/xdita-serializer";

const indentXmlOutput = true;
const indentation = '\t';
const indentationSize = 1;

const outputStream = new InMemoryTextSimpleOutputStreamCollector();
const serializer = new XditaSerializer(outputStream, indentXmlOutput, indentation, indentationSize);
const xdita = serializer.serialize(ast);

console.log(xdita);
```

* You can replace `InMemoryTextSimpleOutputStreamCollector` with your own OutputStream implementation by implementing the interface `SimpleOutputStream`.

* The serialized XML will faithfully contain all XML node types.

For more information, see [https://github.com/evolvedbinary/lwdita](https://github.com/evolvedbinary/lwdita).
