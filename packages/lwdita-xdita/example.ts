import { xditaToJson, xditaToJdita, serializeToXML } from "./converter";
import { BaseNode, TextNode, TopicNode } from "@evolvedbinary/lwdita-ast/nodes";
import { storeOutputXML } from "./utils";
import path from 'path';
import fs from 'fs';

//TODO: input xml can't have new space between tags or else it's considered a text node, handle this.
//TODO: figure out how to put CDATA in the input
const xml =
  `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="intro-product"><title><ph keyref="product-name"/>Overview</title><shortdesc>The<ph keyref="product-name"/> kit allows you to operate network-based home lighting through a remote control</shortdesc><body><p id="cdataTest"><![CDATA[ &% reeeallllyyyyyyy special chatatewdasd 2qw45023w>Lasf ]]>The<ph keyref="product-name"/> kit includes a wireless smart lighting system that helps make the lighting in your home more energy efficient and easier to manage. The kit includes the following components:</p><dl><dlentry><dt>Remote Control</dt><dd><p>Allows you to power on, power off, and dim groups of lights on your network.</p></dd></dlentry><dlentry><dt>LED Light Bulbs</dt><dd><p>Energy-efficient network light bulbs you can install into standard light fixtures.</p></dd></dlentry></dl><fig><title><ph keyref="product-name"/>ready for installation</title><image href="../images/kit.png"><alt>Remote Lighting Kit</alt></image></fig><p id="warning">Electrical hazards can cause burns, shocks and electrocution (death).</p></body></topic>`
/**
 * XML example for testing a conversion
 *
 * @remarks
 * This is the entry point given xml string.
 * The xml needs to be preprocessed to remove all of the white space
 * and new lines from outside of the tags.
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
 * <topic><title>valid title</title><body><<p>text</p></body></topic>
 * ```
 */
xditaToJdita(xml)
  .then(result => {

    const res = serializeToXML(result).join('\n');
    console.log("Success!\nsaving to file...");
    const dir = path.join(__dirname, '../../out');
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }


    storeOutputXML(res, dir + "/output.xml");

  })
  .catch(e => console.log('Failed to convert:', e));


