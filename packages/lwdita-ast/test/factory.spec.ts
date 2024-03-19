import { getNodeClass, createNode } from "../factory";
import { AltNode } from "../nodes/alt";
import { SectionNode } from "../nodes/section";
import { VideoPosterNode } from "../nodes/video-poster";
import { expect } from 'chai';
import { XMLNode } from "@evolvedbinary/lwdita-xdita/classes";

/**
 * Unit tests for factory.ts
 */

// Get the Node class constructor based on the node type
describe('getNodeClass()', () => {
  let nodeClass;

  describe('when passed a node name "alt"', () => {
    it('returns an "AltNode"', () => {
      nodeClass = getNodeClass('alt');
      expect(nodeClass).to.equal(AltNode);
    });
  });

  describe('when passed a node name "section"', () => {
    it('returns a "SectionNode"', () => {
      nodeClass = getNodeClass('section');
      expect(nodeClass).to.equal(SectionNode);
    });
  });

  describe('when passed a node name "video-poster"', () => {
    it('returns a "VideoPosterNode"', () => {
      nodeClass = getNodeClass('video-poster');
      expect(nodeClass).to.equal(VideoPosterNode);
    });
  });

  describe('when passed an unknown node name', () => {
    it('throws an error"', () => {
      expect(() => getNodeClass('unknown-node')).to.throw();
    });
  });
});

// Creates different types of nodes based on the input XMLNode type
describe.skip('createNode', () => {
  let nodeClass;

  describe('when passed an XMLNode node type "TextNode"', () => {
    it('returns the text content', () => {
      nodeClass = createNode('Some text content');
      console.log(nodeClass);
      const expected = JSON.parse("{_props:{content:'Some text content'}}");
      expect(nodeClass).to.equal(expected);
    });
  });
});
