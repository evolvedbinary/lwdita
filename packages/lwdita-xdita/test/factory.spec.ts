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
import { createNode } from "../factory";
import { XMLNode } from "../classes";
import { XMLNODE_AUDIO, AUDIO_NODE_OBJECT, XMLNODE_UNKNOWN } from "./test-utils";

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
