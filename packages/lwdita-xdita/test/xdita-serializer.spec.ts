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
import { CDataNode, DocumentNode, TextNode, TitleNode, TopicNode, BodyNode, PNode, ItalicNode } from "@evolvedbinary/lwdita-ast"
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
    const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;
    const xdita = "<topic><title/></topic>";
    const expected = declaration + xdita;

    // expect the output stream to contain the correct XML
    expect(outStream.getText()).equal(expected);
  });

  [
    {indent: false, expected: '<topic><title/></topic>'},
    {indent: true,  expected: '<topic>\n    <title/>\n</topic>\n'}
  ].forEach(param => {
      it('serialize a document, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

        // test setup
        const document = new DocumentNode();
        const topic = new TopicNode();
        document.add(topic);
        const title = new TitleNode();
        topic.add(title);

        // perform serialization
        serializer.serialize(document);
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with indentation
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title>Hello World</title><body><p>Good Morning</p></body></topic>'},
    {indent: true,  expected: '<topic>\n    <title>Hello World</title>\n    <body>\n        <p>Good Morning</p>\n    </body>\n</topic>\n'}
  ].forEach(param => {
      it('serialize a document with text content, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

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
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with text content
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title dir="ltr" class="title"/></topic>'},
    {indent: true,  expected: '<topic>\n    <title dir="ltr" class="title"/>\n</topic>\n'}
  ].forEach(param => {
      it('serialize a document with attributes, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

        // test setup
        const document = new DocumentNode();
        const topic = new TopicNode();
        document.add(topic);
        const title = new TitleNode({ dir: 'ltr', class: 'title' });
        topic.add(title);

        // perform serialization
        serializer.serialize(document);
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with attributes
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title><![CDATA[cdata]]></title></topic>'},
    {indent: true,  expected: '<topic>\n    <title><![CDATA[cdata]]></title>\n</topic>\n'}
  ].forEach(param => {
      it('serialize a document with cdata, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

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
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with attributes
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title>Hello <i>World</i></title></topic>'},
    {indent: true,  expected: '<topic>\n    <title>Hello <i>World</i></title>\n</topic>\n'}
  ].forEach(param => {
      it('serialize a document containing inline element without introducing significant whitespace, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

        // test setup
        const document = new DocumentNode();
        const topic = new TopicNode();
        document.add(topic);
        const title = new TitleNode();
        const helloText = new TextNode("Hello ");
        title.add(helloText);
        const i = new ItalicNode();
        const worldText = new TextNode("World");
        i.add(worldText);
        title.add(i);
        topic.add(title);

        // perform serialization
        serializer.serialize(document);
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with attributes
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title>Hello \n World</title></topic>'},
    {indent: true,  expected: '<topic>\n    <title>Hello \n World</title>\n</topic>\n'}
  ].forEach(param => {
      it('should preserve significant white space, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

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
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;


        // expect the output stream to contain the correct XML with attributes
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

  [
    {indent: false, expected: '<topic><title>Separate\nLine 1\nLine 2</title></topic>'},
    {indent: true,  expected: '<topic>\n    <title>Separate\nLine 1\nLine 2</title>\n</topic>\n'}
  ].forEach(param => {
      it('indent text content after new lines, indent: ' + param.indent, () => {
        const {serializer, outStream} = newSerializer(param.indent);

        // test setup
        const document = new DocumentNode();
        const topic = new TopicNode();
        document.add(topic);
        const title = new TitleNode();
        const text = new TextNode('Separate\nLine 1\nLine 2');
        title.add(text);
        topic.add(title);

        // perform serialization
        serializer.serialize(document);
        const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;

        // expect the output stream to contain the correct XML with attributes
        expect(outStream.getText()).equal(declaration + param.expected);
      });
  });

});

describe('complete round trip using xdita serializer', () => {

  [
    {indent: false, expected: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic><title><![CDATA[cdata]]></title></topic>'},
    {indent: true,  expected: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic>\n    <title><![CDATA[cdata]]></title>\n</topic>\n'}
  ].forEach(param => {
      it('round trip from xdita and back with cdata, indent: ' + param.indent, async () => {
        const {serializer, outStream} = newSerializer(param.indent);

        const input = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic><title><![CDATA[cdata]]></title></topic>'        
        const orginalAst = await xditaToAst(input);
        serializer.serialize(orginalAst);

        expect(outStream.getText()).equal(param.expected);
      });
  });

  [
    {indent: false, expected: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'},
    {indent: true,  expected: '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic>\n    <title>Hello World</title>\n    <body>\n        <p>Good\nMorning</p>\n    </body>\n</topic>\n'}
  ].forEach(param => {
      it('round trip from xdita and back with text content. indent: ' + param.indent, async () => {
        const {serializer, outStream} = newSerializer(param.indent);
        
        const input = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'
        const orginalAst = await xditaToAst(input);
        serializer.serialize(orginalAst);

        expect(outStream.getText()).equal(param.expected);
      });
  });
});

describe('handles custom xml declaration and doctype', () => {
  it('should read and output custom xml version', async () => {
    const { serializer, outStream } = newSerializer(false);

    const input = '<?xml version="1.6" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);


    const declaration = `<?xml version="1.6" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;
    const expected = declaration + "<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>"

    const actual = outStream.getText()
    // expect the output stream to contain the correct XML with attributes
    expect(actual).equal(expected);
  })

  it('should read and output custom doctype', async () => {
    const { serializer, outStream } = newSerializer(false);

    const input = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE test PUBLIC "PUB" "SYS">\n<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'
    
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);


    const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE test PUBLIC "PUB" "SYS">\n`;
    const expected = declaration + "<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>"

    const actual = outStream.getText()
    // expect the output stream to contain the correct XML with attributes
    expect(actual).equal(expected);
  })

  it('should output the default if nothing was provided', async () => {
    const { serializer, outStream } = newSerializer(false);

    const input = '<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);


    const declaration = `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n`;
    const expected = declaration + "<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>"

    const actual = outStream.getText()
    // expect the output stream to contain the correct XML with attributes
    expect(actual).equal(expected);
  })
})

describe('Full round trip with Paragraph', () => {
  it('should round trip with paragraph', async () => {
    const { serializer, outStream } = newSerializer(false);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = '<topic><title>Hello World</title><body><p>Good\nMorning</p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + input

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })

  it('should round trip with paragraph with empty text', async () => {
    const { serializer, outStream } = newSerializer(false);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = '<topic><title>Hello World</title><body><p> </p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the paragraph will be serialized as <p/>
    const expected =  header + '<topic><title>Hello World</title><body><p/></body></topic>'

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })

  it('should round trip with paragraph with image and indent off', async () => {
    const { serializer, outStream } = newSerializer(false);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = '<topic><title>Hello World</title><body><p><image href="test"><alt>no image</alt></image></p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + input

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })

  it('should round trip with paragraph with one image', async () => {
    const { serializer, outStream } = newSerializer(true);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = '<topic><title>Hello World</title><body><p><image href="test"><alt>no image</alt></image></p></body></topic>'
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + `<topic>
    <title>Hello World</title>
    <body>
        <p>
            <image href="test">
                <alt>no image</alt>
            </image>
        </p>
    </body>
</topic>\n`

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })


  it('should round trip with paragraph with one image and wrong indentation', async () => {
    const { serializer, outStream } = newSerializer(true);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = `<topic><title>Hello World</title><body><p>
       <image href="test"><alt>no image</alt></image>    </p></body></topic>`
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + `<topic>
    <title>Hello World</title>
    <body>
        <p>
            <image href="test">
                <alt>no image</alt>
            </image>
        </p>
    </body>
</topic>\n`

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })


  it('should round trip with paragraph with more then one image', async () => {
    const { serializer, outStream } = newSerializer(true);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = `<topic><title>Hello World</title><body><p><image href="test"><alt>no image</alt></image><image href="test"><alt>no image</alt></image></p></body></topic>`
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + `<topic>
    <title>Hello World</title>
    <body>
        <p>
            <image href="test">
                <alt>no image</alt>
            </image>
            <image href="test">
                <alt>no image</alt>
            </image>
        </p>
    </body>
</topic>\n`

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })

  it('should round trip with paragraph with more then one image', async () => {
    const { serializer, outStream } = newSerializer(true);
    const header = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE topic PUBLIC "-//OASIS//DTD LIGHTWEIGHT DITA Topic//EN" "lw-topic.dtd">\n'
    const input = `<topic><title>Hello World</title><body><p>initial text<image href="test"><alt>no image</alt></image>and<image href="test"><alt>no image</alt></image>trailing text</p></body></topic>`
    const orginalAst = await xditaToAst(input);
    serializer.serialize(orginalAst);

    // the input and output should be identical
    const expected =  header + `<topic>
    <title>Hello World</title>
    <body>
        <p>initial text<image href="test">
                <alt>no image</alt>
            </image>and<image href="test">
                <alt>no image</alt>
            </image>trailing text</p>
    </body>
</topic>\n`

    const actual = outStream.getText()

    expect(actual).equal(expected);
  })
})