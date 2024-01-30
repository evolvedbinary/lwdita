import { xditaToJson, xditaToJdita } from "./converter";
import { BaseNode, TextNode, TopicNode } from "@evolvedbinary/lwdita-ast/nodes";
import { Visitor } from "@evolvedbinary/lwdita-ast/visitor";

function serializeToXML(root) {
  const outStream = console;

  const visitor = new Visitor(outStream);

  root.accept(visitor);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="program-bulbs-to-groups"><title>Programming Light Bulbs to a Lighting Group</title><shortdesc>You can program one or more light bulbs to a lighting group to operate that group with your remote control.</shortdesc><body><p>New Example</p></body></topic>`

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
    serializeToXML(result);
  })
  .catch(e => console.log('Failed to convert:', e));


