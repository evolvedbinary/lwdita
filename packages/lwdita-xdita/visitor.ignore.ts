// import { expect } from 'chai';
// // import { TextContent, Visitor, XMLTag } from './visitor';
// import { DocumentNode, TextNode, TitleNode, TopicNode } from "@evolvedbinary/lwdita-ast"

// describe('XMLTag', () => {
//   it('should print selfclosing tags correctly', () => {
//     const tag = new XMLTag('title', {}, true, true);
//     expect(tag.serialize()).equal('<title/>');
//   });

//   it('should print start tags correctly', () => {
//     const tag = new XMLTag('title', {}, false, true);
//     expect(tag.serialize()).equal('<title>');
//   });

//   it('should print end tags correctly', () => {
//     const tag = new XMLTag('title', {}, false, false);
//     expect(tag.serialize()).equal('</title>');
//   });

//   it('should print tags with attributes correctly', () => {
//     const tag = new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, true, true);
//     expect(tag.serialize()).equal('<title dir="ltr" class="title" outputclass="title" translate="no" xml:lang="en"/>');
//   });

//   it('should print tags with attributes and indentation correctly', () => {
//     const tag = new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, true, true);
//     expect(tag.serialize(true, 4, 1)).equal('    <title dir="ltr" class="title" outputclass="title" translate="no" xml:lang="en"/>\n');
//   });

// });

// describe('Visitor', () => {
//   let visitor: Visitor;
//   let outPutArray: XMLTag[];

//   beforeEach(() => {
//     outPutArray = [];
//     visitor = new Visitor(outPutArray);
//   });

//   it('should visit XMLNodes correctly', () => {
//     // test setup
//     //create a document node 
//     const document = new DocumentNode();
//     //create a topic node
//     const topic = new TopicNode();
//     document.add(topic);
//     //create a title node
//     const title = new TitleNode();
//     // add title to the topic node
//     topic.add(title);

//     // visit the document node
//     document.accept(visitor);

//     // expect the outPutArray to contain the correct XMLTags
//     expect(outPutArray).deep.equal([
//       new XMLTag('topic', {}, false, true),
//       new XMLTag('title', {}, true, true),
//       new XMLTag('topic', {}, false, false)
//     ]);
    
//   });

//   it('should visit XMLNodes with text node', () => {
//     // test setup
//     //create a document node 
//     const document = new DocumentNode();
//     //create a topic node
//     const topic = new TopicNode();
//     document.add(topic);
//     //create a title node
//     const title = new TitleNode();
//     // add title to the topic node
//     topic.add(title);
//     //create a text node
//     const text = new TextNode('Hello World');
//     //add text to the title node
//     title.add(text);
//     // visit the document node
//     document.accept(visitor);    

//     // expect the outPutArray to contain the correct XMLTags
//     expect(outPutArray).deep.equal([
//       new XMLTag('topic', {}, false, true),
//       new XMLTag('title', {}, false, true),
//       new TextContent('Hello World'),
//       new XMLTag('title', {}, false, false),
//       new XMLTag('topic', {}, false, false)
//     ]);
    
//   });

//   it('should visit XMLNodes with attributes', () => {
//     // test setup
//     //create a document node 
//     const document = new DocumentNode();
//     //create a topic node
//     const topic = new TopicNode();
//     document.add(topic);
//     //create a title node with attributes
//     const title = new TitleNode({dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'});
//     // add title to the topic node
//     topic.add(title);

//     // visit the document node
//     document.accept(visitor);

//     // expect the outPutArray to contain the correct XMLTags
//     expect(outPutArray).deep.equal([
//       new XMLTag('topic', {}, false, true),
//       new XMLTag('title', {dir: 'ltr', class: 'title', outputclass: 'title', translate: 'no', 'xml:lang': 'en'}, true, true),
//       new XMLTag('topic', {}, false, false)
//     ]);
    
//   });

//   it('should visit XMLNodes and produce xml output', () => {
//     // test setup
//     //create a document node 
//     const document = new DocumentNode();
//     //create a topic node
//     const topic = new TopicNode();
//     document.add(topic);
//     //create a title node with attributes
//     const title = new TitleNode();
//     // add title to the topic node
//     topic.add(title);

//     // visit the document node
//     document.accept(visitor);

//     // expect the outPutArray to contain the correct XMLTags
//     expect(visitor.serialize()).equal("<topic><title/></topic>");

//   });


//   it('should visit XMLNodes and produce xml output with indentation', () => {
//     // test setup
//     const outPutArray: XMLTag[] = [];
//     visitor = new Visitor(outPutArray, true, 4);
//     //create a document node 
//     const document = new DocumentNode();
//     //create a topic node
//     const topic = new TopicNode();
//     document.add(topic);
//     //create a title node with attributes
//     const title = new TitleNode();
//     // add title to the topic node
//     topic.add(title);

//     // visit the document node
//     document.accept(visitor);

//     // expect the outPutArray to contain the correct XMLTags
//     expect(visitor.serialize()).equal("<topic>\n    <title/>\n</topic>\n");

//   });

// });