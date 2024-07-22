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
import { serializeToXdita, xditaToAst, xditaToJdita } from '../src/converter';
import { DocumentNode } from "@evolvedbinary/lwdita-ast";

describe('xditaToAst', () => {

  const expectConvertedJdita = function(jdita: DocumentNode) {
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
      "attributes": undefined,
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
    const xdita = `<topic id="topicID"><title>text content</title></topic>`;
    const ast = await xditaToAst(xdita);

    const result = serializeToXdita(ast);

    // Assert the serialized XML output
    expect(result).to.equal(xdita);
  });

  it('serializes the root node to XML with indentation', async () => {
    const xdita = `<topic id="topicID"><title>text content</title></topic>`;
    const ast = await xditaToAst(xdita);

    const result = serializeToXdita(ast, ' ', 2);

    const expected = `<topic id="topicID">\n  <title>\n    text content\n  </title>\n</topic>\n`;

    // Assert the serialized XML output
    expect(result).to.equal(expected);
  });
});