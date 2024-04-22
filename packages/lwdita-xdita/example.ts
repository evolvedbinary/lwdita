import { xditaToJson, xditaToJdita, serializeToXML } from "./converter";
import { BaseNode, TextNode, TopicNode } from "@evolvedbinary/lwdita-ast/nodes";
import { storeOutputXML } from "./utils";
import path from 'path';
import fs from 'fs';
import { InMemorySimpleTextStreamCollector } from "./stream";
import { XditaSerializer } from "./xdita-serializer";

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
xditaToJdita(xml)
  .then(result => {
    // Console log an object containing the AST:
    console.log(JSON.stringify(result.json, null, 2));

    /**
     * Start the serialization
     * `serializeToXML(root, indentationChar?, tabSize?)` is offering three options to output the document:
     * 1. No indentation/formatting - all is output in one line (default)
     * 2. Indentation with tabs
     * 3. Indentation with Spaces - You can modify the desired number of spaces by setting `indentationSize`, per default it's set to 4 spaces.
     */

    // 1. Default option: The document will have no indentation and will be output in one line
    const res = serializeToXML(result);

    // 2. Comment-in the following line to choose Tabs as indentation
    const tab = '\t';
    //const res = serializeToXML(result, tab);

    // 3. Comment-in the following line to choose spaces as indentation
    const space = ' ';
    const indentationSize = 4;
    //const res = serializeToXML(result, space, indentationSize);

    // 4. Advanced - Instead of using `serializeToXML` you can use a streaming approach if you prefer...
    // const outputStream = new InMemorySimpleTextStreamCollector();  // TODO replace InMemorySimpleTextStreamCollector with whatever Stream implementation you need
    // const serializer = new XditaSerializer(outputStream, true, space, indentationSize);
    // const res = serializer.serialize(result);

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
    storeOutputXML(res, dir + outputFile);
    // ...and log the filepath with a success notification
    console.log("Success!\nSaved input to file " + "'./out" + outputFile + "'");
  })
  .catch(e => console.log('Failed to convert:', e));


