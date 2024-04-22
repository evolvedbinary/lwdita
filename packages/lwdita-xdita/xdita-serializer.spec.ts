import { expect } from 'chai';
import { XditaSerializer } from './xdita-serializer';
import { InMemorySimpleTextStreamCollector, SimpleTextStream } from './stream';
import { DocumentNode, TextNode, TitleNode, TopicNode } from "@evolvedbinary/lwdita-ast"

describe('XditaSerializer', () => {
  let outStream: InMemorySimpleTextStreamCollector;
  let serializer: XditaSerializer;

  beforeEach(() => {
    outStream = new InMemorySimpleTextStreamCollector();
    serializer = new XditaSerializer(outStream);
  });

  it('skip the document node', () => {
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
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);

    // configure serializer with indentation
    serializer = new XditaSerializer(outStream, true, ' ', 4);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with indentation
    expect(outStream.getText()).equal("<topic>\n    <title/>\n</topic>\n");
  });

  it('serialize a document with text content', () => {
    // test setup
    const document = new DocumentNode();
    const topic = new TopicNode();
    document.add(topic);
    const title = new TitleNode();
    topic.add(title);
    const text = new TextNode('Hello World');
    title.add(text);

    // perform serialization
    serializer.serialize(document);

    // expect the output stream to contain the correct XML with text content
    expect(outStream.getText()).equal("<topic><title>Hello World</title></topic>");
  });

  it('serialize a document with attributes', () => {
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
});
