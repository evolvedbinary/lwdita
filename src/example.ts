import { xditaToJdita } from "./converter";

const xml = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic><title>valid title</title><body><p>text</p><audio></audio></body></topic>`

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
 * ```
 * <topic>
 *   <title>valid title</title>
 *   <body>
 *     <p>text</p>
 *   </body>
 * </topic>
 * ```
 * to this:
 * `<topic><title>valid title</title><body><<p>text</p></body></topic>`
 */
xditaToJdita(xml, true)
  .then(result => {
    console.log(JSON.stringify(result.json, null, 2));
  })
  .catch(e => console.log('Failed to convert:', e));