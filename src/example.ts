import { xditaToJdita } from "./converter";

const xml = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic><title>valid title</title><body><p>text</p><audio></audio></body></topic>`
// the xml needs to be preprocessed to remove all of the white space 
//and new lines from outside of the tags

/**
<topic>
<title>valid title</title>
  <body>
    <p>text</p>
  </body>
</topic>
 * 
 * this needs to be pre processed to:
 * <topic><p>valid text</p></topic>
 */
// entry point given xml string
xditaToJdita(xml, true)
  .then(result => {
    console.log(JSON.stringify(result.json, null, 2));
  })
  .catch(e => console.log('Failed to convert:', e));