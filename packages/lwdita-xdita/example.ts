/*!
Copyright (C) 2020 Evolved Binary

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { xditaToAst, serializeToXdita } from "./src/converter";
import { storeOutputXML } from "./src/utils";
import path from 'path';
import fs from 'fs';
// import { InMemoryTextSimpleOutputStreamCollector } from "./stream";
// import { XditaSerializer } from "./xdita-serializer";

const xml =
  `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="intro-product"><title><ph keyref="product-name"/>Overview</title><shortdesc>The<ph keyref="product-name"/> kit allows you to operate network-based home lighting through a remote control</shortdesc><body><p id="cdataTest"><![CDATA[ &%<tagname/><!--comment-->]]>The<ph keyref="product-name"/> kit includes a wireless smart lighting system that helps make the lighting in your home more energy efficient and easier to manage. The kit includes the following components:</p><dl><dlentry><dt>Remote Control</dt><dd><p>Allows you to power on, power off, and dim groups of lights on your network.</p></dd></dlentry><dlentry><dt>LED Light Bulbs</dt><dd><p>Energy-efficient network light bulbs you can install into standard light fixtures.</p></dd></dlentry></dl><fig><title><ph keyref="product-name"/>ready for installation</title><image href="../images/kit.png"><alt>Remote Lighting Kit</alt></image></fig><p id="warning">Electrical hazards can cause burns, shocks and electrocution (death).</p></body></topic>`
/**
 * XML example for testing a conversion
 *
 * @remarks
 * This is the entry point given xml string.
 * The xml needs to be preprocessed to remove all of the white space
 * and new lines from outside of the tags.
 *
 * @privateRemarks
 * TODO: Implement missing handling of newlines and spaces bewtween tags in the input xml,
 * because otherwise the first whitespace or linebreak in the XML will be considered as a text node
 * and the transformation will break.
 *
 * @example
 * The whitespace needs to be elimited from the XML before processing
 * from e.g.:
 * ```xml
 * <topic>
 *   <title>valid title</title>
 *   <body>
 *     <p>text</p>
 *   </body>
 * </topic>
 * ```
 * to this:
 * ```xml
 * <topic><title>valid title</title><body><p>text</p></body></topic>
 * ```
 */
xditaToAst(xml)
  .then(ast => {
    // Console log an object containing the AST:
    console.log(JSON.stringify(ast.json, null, 2));

    /**
     * Start the serialization
     * `serializeToXdita(root, indentationChar?, tabSize?)` is offering three options to output the document:
     * 1. No indentation/formatting - all is output in one line (default)
     * 2. Indentation with tabs
     * 3. Indentation with Spaces - You can modify the desired number of spaces by setting `indentationSize`, per default it's set to 4 spaces.
     */

    // 1. Default option: The document will have no indentation and will be output in one line
    const xditaString = serializeToXdita(ast);

    // 2. Comment-in the following line to choose Tabs as indentation
    // const tab = '\t';
    //const xditaString = serializeToXdita(ast, tab);

    // 3. Comment-in the following line to choose spaces as indentation
    // const space = ' ';
    // const indentationSize = 4;
    //const xditaString = serializeToXdita(ast, space, indentationSize);

    // 4. Advanced - Instead of using `serializeToXdita` you can use a streaming approach if you prefer...
    // const outputStream = new InMemoryTextSimpleOutputStreamCollector();  // TODO replace InMemoryTextSimpleOutputStreamCollector with whatever Stream implementation you need
    // const serializer = new XditaSerializer(outputStream, true, space, indentationSize);
    // serializer.serialize(ast);
    // const xdita = outputStream.getText();

    /**
     * For development and testing the above XML example,
     * output the XML in a file
     * and store it in the filesystem...
     */

    // If the output folder doesn't exist
    const dir = path.join(__dirname, '../../out');
    if (!fs.existsSync(dir)) {
      // create one
      fs.mkdirSync(dir);
    }
    const outputFile = "/output.xml";
    storeOutputXML(xditaString, dir + outputFile);
    // ...and log the filepath with a success notification
    console.log("Success!\nSaved input to file " + "'./out" + outputFile + "'");
  })
  .catch(e => console.log('Failed to convert:', e));


