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
import { getNodeClass, createNode } from "../factory";
import { AltNode } from "../nodes/alt";
import { SectionNode } from "../nodes/section";
import { VideoPosterNode } from "../nodes/video-poster";
import { XMLNODE_AUDIO, AUDIO_NODE_OBJECT, XMLNODE_UNKNOWN } from "./test-utils";
import { XMLNode } from '../ast-utils';

/**
 * Unit tests for factory.ts
 */

// Gets the Node class constructor based on the node type
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
    it('throws an error', () => {
      expect(() => getNodeClass('unknown-node')).to.throw();
    });
  });
});

// Creates different types of nodes based on the input XMLNode type
describe('createNode', () => {
  let nodeClass, expected;

  describe('when passed an XMLNode node type "TextNode"', () => {
    it('returns the text content', () => {
      nodeClass = createNode('Some text content');
      expected = JSON.parse(`{"_props":{"content":"Some text content"}}`);
      expect(nodeClass).to.be.deep.equal(expected);
    });
  });

  describe('when passed an XMLNode node type "AudioNode"', () => {
    it('returns the audio node object containing name and attributes', () => {
      const node: XMLNode<'audio'> = JSON.parse(XMLNODE_AUDIO);
      nodeClass = createNode(node);
      expected = AUDIO_NODE_OBJECT;
      expect(nodeClass).to.be.deep.equal(expected);
    });
  });

  describe('when passed an XMLNode node with unknown type', () => {
    it('throws an error', () => {
      const node: XMLNode<'unknown'> = JSON.parse(XMLNODE_UNKNOWN);
      expect(() => createNode(node)).to.throw();
    });
  });
});
