import { xditaToJdita } from "./converter";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
<topic id="program-bulbs-to-groups">
  <title>Programming Light Bulbs to a Lighting Group</title>
  <body>
    <p>wewe</p>
  </body>
</topic>
`
// entry point given xml string
xditaToJdita(xml, false)
  .then(result => {
    console.log("result:", JSON.stringify(result.json, null, 2));
  })
  .catch(e => console.log('Failed to convert:', e));