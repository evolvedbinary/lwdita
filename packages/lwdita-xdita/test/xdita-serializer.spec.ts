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
import { XditaSerializer } from '../src/xdita-serializer';
import { InMemoryTextSimpleOutputStreamCollector } from '../src/stream';
import { CDataNode, DocumentNode, TextNode, TitleNode, TopicNode, BodyNode, PNode, PhNode } from "@evolvedbinary/lwdita-ast"
import { xditaToAst } from '../src/converter';
import { newSerializer } from './test-utils';

describe('XditaSerializer', () => {

  it('skip the document node', () => {
    const {serializer, outStream} = newSerializer();

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML
    expect(outStream.getText()).equal("<topic><title/></topic>");
  });

  it('serialize a document with indentation', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with indentation
    expect(outStream.getText()).equal("<topic>\n    <title/>\n</topic>\n");
  });

  it('serialize a document with text content', () => {
    const {serializer, outStream} = newSerializer();

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);
    const titleText = new TextNode('Hello World');
    title.add(titleText);
    const body = new BodyNode();
    const para = new PNode();
    const paraText = new TextNode('Good Morning');
    para.add(paraText);
    body.add(para);
    topic.add(body);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with text content
    expect(outStream.getText()).equal("<topic><title>Hello World</title><body><p>Good Morning</p></body></topic>");
  });

  it('serialize a document with attributes', () => {
    const {serializer, outStream} = newSerializer();

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode({ dir: 'ltr', class: 'title' });
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal('<topic><title dir="ltr" class="title"/></topic>');
  });

  it('serialize a document with cdata', () => {
    const {serializer, outStream} = newSerializer();

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const cdata = new CDataNode('cdata');
    title.add(cdata);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal('<topic><title><![CDATA[cdata]]></title></topic>');
  });

  it('serialize a document without adding significant white space', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal("<topic>\n    <title/>\n</topic>\n");
  });

  it('serialize a document containing body element without adding significant white space', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    const body = new BodyNode();
    const p = new PNode();
    body.add(p);
    topic.add(body);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal("<topic>\n    <title/>\n    <body>\n        <p/>\n    </body>\n</topic>\n");
  });

  it('serialize a document containing text without adding significant white space', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const text = new TextNode('Hello World');
    title.add(text);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal("<topic>\n    <title>Hello World</title>\n</topic>\n");
  });

  it('serialize a document containing inline element without adding significant white space', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const ph = new PhNode();
    title.add(ph);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal("<topic>\n    <title><ph/></title>\n</topic>\n");
  });

  it('should preserve significant white space, indent off', () => {
    const {serializer, outStream} = newSerializer();

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const text = new TextNode('Hello \n World');
    title.add(text);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal("<topic><title>Hello \n World</title></topic>");
  });

  it('should preserve significant white space, indent on', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const text = new TextNode('Hello \n World');
    title.add(text);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    const tab = '    ';

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal(`<topic>\n${tab}<title>Hello \n${tab} World</title>\n</topic>`);
  });

  it('indent text content after new lines', () => {
    const {serializer, outStream} = newSerializer(true);

    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    const text = new TextNode('Septate\nLine 1\nLine 2');
    title.add(text);
    topic.add(title);

    // perform serialization
    serializer.serialize(document);

    const tab = '    ';

    // expect the output stream to contain the correct XML with attributes
    expect(outStream.getText()).equal(`<topic>\n${tab}<title>Septate\n${tab}Line 1\n${tab}Line 2</title>\n</topic>`);
  });

  
});

describe('complete round trip using xdita serializer', () => {
  it('round trip from xdita and back with cdata', async () => {
    const orginalXdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic><title><![CDATA[cdata]]></title></topic>`
    
    const orginalAst = await xditaToAst(orginalXdita);
    // perform serialization
    const {serializer, outStream} = newSerializer();
    serializer.serialize(orginalAst);

    const xdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">` + outStream.getText();

    expect(orginalXdita).deep.equal(xdita);
  });

  it('round trip from xdita and back with text content', async () => {
    const orginalXdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic><title>Hello World</title></topic>`
    
    const orginalAst = await xditaToAst(orginalXdita);
    // perform serialization
    const {serializer, outStream} = newSerializer();
    serializer.serialize(orginalAst);

    const xdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">` + outStream.getText();

    expect(orginalXdita).deep.equal(xdita);
  });

  it('round trip from xdita and back with indentation', async () => {
    const orginalXdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd"><topic>\n    <title>Hello World</title>\n</topic>`
    
    const orginalAst = await xditaToAst(orginalXdita);
    // perform serialization
    const {serializer, outStream} = newSerializer(true);
    serializer.serialize(orginalAst);

    const xdita = `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">` + outStream.getText();

    expect(orginalXdita).deep.equal(xdita);
  });
});