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

import { doNodeTest } from "./tests";
import { PNode, isPNode } from "../src/nodes/p";
import { expect } from "chai";

doNodeTest(
  PNode,
  'p',
  isPNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%inline*']
);

describe('Class PNode', () => {
  it("sets correct attributes", () => {
    const p = new PNode({});

    p.dir = "dir";
    p["xml:lang"] = "lang";
    p.translate = "translate";
    p.props = "props";
    p.id = "id";
    p.outputclass = "outputclass";
    p.class = "class";

    expect(p.dir).to.equal("dir");
    expect(p["xml:lang"]).to.equal("lang");
    expect(p.translate).to.equal("translate");
    expect(p.props).to.equal("props");
    expect(p.id).to.equal("id");
    expect(p.outputclass).to.equal("outputclass");
    expect(p.class).to.equal("class");
  });
});


describe("Get rank for special node p",() => {
  it("The rank should be 10 for special node p", () => {
    const rank = PNode.rank;
    
    expect(rank).to.eq(10);
  });
});

describe('followingSiblings', () => {
  it('get the followingSiblings of strong in the p element', () => {
    const p = new PNode({});
    const childTypes = p.followingSiblings("strong");
    
    expect(childTypes).to.deep.equal([
      { name: 'inline', single: false, required: false, isGroup: true },
    ]);
  });

  it('get the followingSiblings of image in the p element', () => {
    const p = new PNode({});
    const childTypes = p.followingSiblings("image");
    
    expect(childTypes).to.deep.equal([
      { name: 'inline', single: false, required: false, isGroup: true },
    ]);
  });
});