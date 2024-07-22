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
import { StRowNode, isStRowNode } from "../src/nodes/strow";
import { expect } from "chai";

doNodeTest(
  StRowNode,
  'strow',
  isStRowNode,
  ['dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['stentry*']
);

describe('Class StRowNode', () => {
  it("sets correct attributes", () => {
    const strow = new StRowNode({});

    strow.dir = "dir";
    strow["xml:lang"] = "lang";
    strow.translate = "translate";
    strow.props = "props";
    strow.id = "id";
    strow.conref = "conref";
    strow.outputclass = "outputclass";
    strow.class = "class";

    expect(strow.dir).to.equal("dir");
    expect(strow["xml:lang"]).to.equal("lang");
    expect(strow.translate).to.equal("translate");
    expect(strow.props).to.equal("props");
    expect(strow.id).to.equal("id");
    expect(strow.conref).to.equal("conref");
    expect(strow.outputclass).to.equal("outputclass");
    expect(strow.class).to.equal("class");
  });
});