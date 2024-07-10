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
import { ShortDescNode, isShortDescNode } from "../src/nodes/shortdesc";
import { expect } from "chai";

doNodeTest(
  ShortDescNode,
  'shortdesc',
  isShortDescNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['%inline*']
);

describe('Class ShortDescNode', () => {
  it("sets correct attributes", () => {
    const shortdesc = new ShortDescNode({});

    shortdesc.dir = "dir";
    shortdesc["xml:lang"] = "lang";
    shortdesc.translate = "translate";
    shortdesc.props = "props";
    shortdesc.id = "id";
    shortdesc.conref = "conref";
    shortdesc.outputclass = "outputclass";
    shortdesc.class = "class";

    expect(shortdesc.dir).to.equal("dir");
    expect(shortdesc["xml:lang"]).to.equal("lang");
    expect(shortdesc.translate).to.equal("translate");
    expect(shortdesc.props).to.equal("props");
    expect(shortdesc.id).to.equal("id");
    expect(shortdesc.conref).to.equal("conref");
    expect(shortdesc.outputclass).to.equal("outputclass");
    expect(shortdesc.class).to.equal("class");
  });
});