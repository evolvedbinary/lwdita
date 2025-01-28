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
import { DlNode, isDlNode } from "../src/nodes/dl";
import { expect } from "chai";

doNodeTest(
  DlNode,
  'dl',
  isDlNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['dlentry+']
);

describe('Class DlNode', () => {
  it("sets correct attributes", () => {
    const dl = new DlNode({});

    dl.dir = "dir";
    dl["xml:lang"] = "lang";
    dl.translate = "translate";
    dl.props = "props";
    dl.id = "id";
    dl.conref = "conref";
    dl.outputclass = "outputclass";
    dl.class = "class";

    expect(dl.dir).to.equal("dir");
    expect(dl["xml:lang"]).to.equal("lang");
    expect(dl.translate).to.equal("translate");
    expect(dl.props).to.equal("props");
    expect(dl.id).to.equal("id");
    expect(dl.conref).to.equal("conref");
    expect(dl.outputclass).to.equal("outputclass");
    expect(dl.class).to.equal("class");
  });
});

describe('followingSiblings', () => {
  it('get the followingSiblings of dlentry in the dl element', () => {
    const dl = new DlNode({});

    const childTypes = dl.followingSiblings("dlentry");
    
    expect(childTypes).to.deep.equal([
      { name: 'dlentry', single: false, required: true, isGroup: false }
    ]);
  });
});