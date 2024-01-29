# lwdita-xml //TODO rename this

lwdita-parser is a parser made for LWDITA (only XDita is supported at this time). Responsible for converting lwdita files to a JSON tree structure.

This project depends on `lwdita-ast-xdita` package to provides the mapping from dtd //TODO insert link here to an abstract syntax tree

## Usage
You can add lwdita-parser to your project using `npm` or `yarn`

```bash
npm install --save lwdita-parser
```
or
```bash
yarn add lwdita-parser
```

```javascript
const { xditaToJson } = require("lwdita-parser");

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
