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
import { getNodeClass } from "../src/factory";
import { AltNode } from "../src/nodes/alt";
import { SectionNode } from "../src/nodes/section";
import { VideoPosterNode } from "../src/nodes/video-poster";

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
