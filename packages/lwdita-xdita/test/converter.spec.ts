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


import { expect } from 'chai';
import { astToJdita, jditaToAst, serializeToXdita, xditaToAst, xditaToJdita } from '../src/converter';
import { DocumentNode } from "@evolvedbinary/lwdita-ast";
import { fullAstObject, fullJditaObject, fullXditaExample } from './test-utils';
import { InMemoryTextSimpleOutputStreamCollector } from '../src/stream';
import { XditaSerializer } from '../src/xdita-serializer';

describe('xditaToAst', () => {

  const expectConvertedJdita = function (jdita: DocumentNode) {
    const topicNode = jdita.children[0];
    const titleNode = topicNode.children[0];
    const textNode = titleNode.children[0];

    // Assert the structure of the converted JDITA DocumentNode
    expect(jdita).to.not.be.undefined;
    expect(jdita._children?.length).to.equal(1);
    // test the topic node
    expect(topicNode.static.nodeName).to.equal('topic');
    expect(topicNode.readProp('id')).to.equal('topicID');
    expect(topicNode.children.length).to.equal(1);
    // test the title node
    expect(titleNode.static.nodeName).to.equal('title');
    expect(titleNode.children.length).to.equal(1);
    // test the text node
    expect(textNode.static.nodeName).to.equal('text');
    expect(textNode.readProp("content")).to.equal('text content');
  };

  it('converts unindented XDITA XML without XML Declaration and without Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<topic id="topicID"><title>text content</title></topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts indented XDITA XML without XML Declaration and without Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<topic id="topicID">\n    <title>text content</title>\n</topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts unindented XDITA XML with XML Declaration to JDITA DocumentNode', async () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?><topic id="topicID"><title>text content</title></topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts indented XDITA XML with XML Declaration to JDITA DocumentNode', async () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<topic id="topicID">\n    <title>text content</title>\n</topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts unindented XDITA XML with Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="topicID"><title>text content</title></topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts indented XDITA XML with Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic id="topicID">\n    <title>text content</title>\n</topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts unindented XDITA XML with XML Declaration and Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic id="topicID"><title>text content</title></topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('converts indented XDITA XML with XML Declaration and Document Type Declaration to JDITA DocumentNode', async () => {
    const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic id="topicID">\n    <title>text content</title>\n</topic>';
    const jdita = await xditaToAst(xml);

    expectConvertedJdita(jdita);
  });

  it('rejects with errors if XML parsing fails', async () => {
    const xml = `<invalid-xml`;

    expect(xditaToAst(xml)).to.be.throw;
  });
});

describe('jditaToXdita', () => {
  it('converts XDITA DocumentNode to JDITA json', async () => {
    const xdita = `<topic id="topicID"><title>text content</title></topic>`;

    const xditaJson = await xditaToJdita(xdita);
    const json = {
      "nodeName": "document",
      "attributes": {
        "xmlDecl": undefined,
        "docTypeDecl": undefined
      },
      "children": [
        {
          "nodeName": "topic",
          "attributes": {
            "dir": undefined,
            "xml:lang": undefined,
            "translate": undefined,
            "outputclass": undefined,
            "class": undefined,
            "id": "topicID",
            "xmlns:ditaarch": undefined,
            "ditaarch:DITAArchVersion": undefined,
            "specializations": undefined
          },
          "children": [
            {
              "nodeName": "title",
              "attributes": {
                "dir": undefined,
                "xml:lang": undefined,
                "translate": undefined,
                "outputclass": undefined,
                "class": undefined
              },
              "children": [
                {
                  "nodeName": "text",
                  "content": "text content"
                }
              ]
            }
          ]
        }
      ]
    }

    // Assert the converted XDITA XML
    expect(xditaJson).to.deep.equal(json);
  });
});

describe('serializeToXdita', () => {
  it('serializes the root node to XML', async () => {
    const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;
    const xdita = declaration + `<topic id="topicID"><title>text content</title></topic>`;
    const ast = await xditaToAst(xdita);

    const result = serializeToXdita(ast);

    // Assert the serialized XML output
    expect(result).to.equal(xdita);
  });

  it('serializes the root node to XML with indentation', async () => {
    const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;
    const xdita = `<topic id="topicID">\n  <title>text content</title>\n</topic>\n`;
    const ast = await xditaToAst(xdita);

    const result = serializeToXdita(ast, ' ', 2);

    const expected = declaration + xdita;
    // Assert the serialized XML output
    expect(result).to.equal(expected);
  });
});

describe('jditaToAst', () => {
  it('converts jdita to ast', () => {
    const jdita = `
                  {
                    "nodeName": "document",
                    "children": [
                      {
                        "nodeName": "topic",
                        "attributes": {},
                        "children": [
                          {
                            "nodeName": "title",
                            "attributes": {},
                            "children": [
                              {
                                "nodeName": "text",
                                "content": "text"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }`;

    const ast = jditaToAst(JSON.parse(jdita));

    // Assert the converted JDITA DocumentNode
    expect(ast).to.not.be.undefined;
    expect(ast.children.length).to.equal(1);
    const topicNode = ast.children[0];
    expect(topicNode.static.nodeName).to.equal('topic');
    expect(topicNode.children.length).to.equal(1);
    const titleNode = topicNode.children[0];
    expect(titleNode.static.nodeName).to.equal('title');
    expect(titleNode.children.length).to.equal(1);
    const textNode = titleNode.children[0];
    expect(textNode.static.nodeName).to.equal('text');
    expect(textNode.readProp("content")).to.equal('text');
  });

  it('converts jdita to ast including cdata', () => {
    const jdita = `
    {
      "nodeName": "document",
      "children": [
        {
          "nodeName": "topic",
          "attributes": {},
          "children": [
            {
              "nodeName": "title",
              "attributes": {},
              "children": [
                {
                  "nodeName": "cdata",
                  "content": "cdata"
                }
              ]
            }
          ]
        }
      ]
    }`;

    const ast = jditaToAst(JSON.parse(jdita));

    // Assert the converted JDITA DocumentNode
    expect(ast).to.not.be.undefined;
    expect(ast.children.length).to.equal(1);
    const topicNode = ast.children[0];
    expect(topicNode.static.nodeName).to.equal('topic');
    expect(topicNode.children.length).to.equal(1);
    const titleNode = topicNode.children[0];
    expect(titleNode.static.nodeName).to.equal('title');
    expect(titleNode.children.length).to.equal(1);
    const textNode = titleNode.children[0];
    expect(textNode.static.nodeName).to.equal('cdata');
    expect(textNode.readProp("content")).to.equal('cdata');
  })
});


describe('A round trip conversion between xdita, ast, and jdita', () => {
  // This test ensures that the conversion between the three formats is lossless and reversible.

  const xdita = fullXditaExample;

  it('converts xdita to ast', async () => {
    const ast = await xditaToAst(xdita);
    expect(ast).to.deep.equal(fullAstObject);
  });

  it('converts ast to jdita', async () => {
    const ast = await xditaToAst(xdita);
    const jdita = astToJdita(ast);
    expect(jdita).to.deep.equal(fullJditaObject);
  });

  it('converts jdita to ast', async () => {
    const ast = await xditaToAst(xdita);
    const jdita = astToJdita(ast);
    const newAst = jditaToAst(jdita);
    expect(newAst).to.deep.equal(fullAstObject);
  });

  it('converts ast to xdita', async () => {
    const ast = await xditaToAst(xdita);
    const jdita = astToJdita(ast);
    const newAst = jditaToAst(jdita);
    const outStream = new InMemoryTextSimpleOutputStreamCollector();
    const serializer = new XditaSerializer(outStream);
    serializer.serialize(newAst);
    const newXdita = outStream.getText();
    expect(newXdita).to.equal(xdita);
  });
});

describe('Round trip with custom doctype and xml declaration', () => {
  [
    {test:"custom doctype", header: `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD Custom Topic//EN" "lw-topic.dtd">\n`},
    {test:"custom XML declaration", header: `<?xml version="1.6" encoding="UTF-8" standalone="yes"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`},
    {test:"default XML declaration", header: `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`},
  ].forEach(({test, header}) => {
    it(`round trip with ${test}`, async () => {
      const xdita = `<topic id="topicID"><title>text content</title></topic>`;

      // xdita -> ast
      const ast = await xditaToAst(header + xdita);
      
      // ast -> jdita
      const jdita = astToJdita(ast);

      // jdita -> ast
      const newAst = jditaToAst(jdita);

      // ast -> xdita
      const outStream = new InMemoryTextSimpleOutputStreamCollector();
      const serializer = new XditaSerializer(outStream);
      serializer.serialize(newAst);
      const newXdita = outStream.getText();

      expect(newXdita).to.equal(header + xdita);
    });
  });
});



describe('Round trip with special chars', () => {
    it(`round trip with paragapth with special chars`, async () => {
      const header = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`
      const xdita = `<topic id="topicID"><title>t</title><body><p>Escape &lt;special&gt; characters &amp;, &lt;, &gt;.</p></body></topic>`;

      // xdita -> ast
      const ast = await xditaToAst(header + xdita);
      
      // ast -> jdita
      const jdita = astToJdita(ast);

      // jdita -> ast
      const newAst = jditaToAst(jdita);

      // ast -> xdita
      const outStream = new InMemoryTextSimpleOutputStreamCollector();
      const serializer = new XditaSerializer(outStream);
      serializer.serialize(newAst);
      const newXdita = outStream.getText();

      expect(newXdita).to.equal(header + xdita);
    });


    it(`round trip with attributes with special chars`, async () => {
      const header = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`
      const xdita = `<topic id="topicID"><title outputclass="test&amp;test&quot;s">t</title></topic>`;

      // xdita -> ast
      const ast = await xditaToAst(header + xdita);
      
      // ast -> jdita
      const jdita = astToJdita(ast);

      // jdita -> ast
      const newAst = jditaToAst(jdita);

      // ast -> xdita
      const outStream = new InMemoryTextSimpleOutputStreamCollector();
      const serializer = new XditaSerializer(outStream);
      serializer.serialize(newAst);
      const newXdita = outStream.getText();

      expect(newXdita).to.equal(header + xdita);
    });
});