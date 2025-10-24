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
import { UlNode, isUlNode } from "../src/nodes/ul";
import { expect } from "chai";

doNodeTest(
  UlNode,
  'ul',
  isUlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['li+']
);

describe('Class UlNode', () => {
  it("sets correct attributes", () => {
    const ul = new UlNode({});

    ul.dir = "dir";
    ul["xml:lang"] = "lang";
    ul.translate = "translate";
    ul.props = "props";
    ul.id = "id";
    ul.conref = "conref";
    ul.outputclass = "outputclass";
    ul.class = "class";

    expect(ul.dir).to.equal("dir");
    expect(ul["xml:lang"]).to.equal("lang");
    expect(ul.translate).to.equal("translate");
    expect(ul.props).to.equal("props");
    expect(ul.id).to.equal("id");
    expect(ul.conref).to.equal("conref");
    expect(ul.outputclass).to.equal("outputclass");
    expect(ul.class).to.equal("class");
  });
});


describe('followingSiblings', () => {
  it('get the followingSiblings of li in the ul element', () => {
    const ul = new UlNode({});

    const childTypes = ul.followingSiblings("li");
    
    expect(childTypes).to.deep.equal([
      { name: 'li', single: false, required: true, isGroup: false }
    ]);
  });
});