import { xditaToJdita } from "./converter";

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">
<topic>
  <body>
    <p>wewe</p>
  </body>
</topic>
`
xditaToJdita(xml, false)
  .then(result => {
    console.log(JSON.stringify(result.json, null, 2));
  })
  .catch(e => console.log('Failed to convert:', e));