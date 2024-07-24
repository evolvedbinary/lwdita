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
import { PreNode, isPreNode } from "../src/nodes/pre";
import { expect } from "chai";

doNodeTest(
  PreNode,
  'pre',
  isPreNode,
  ['xml:space', 'dir', 'xml:lang', 'translate', 'props', 'id', 'conref', 'outputclass', 'class'],
  ['(text|%ph|xref|cdata)*']
);

describe('Class PreNode', () => {
  it("sets correct attributes", () => {
    const pre = new PreNode({});

    pre["xml:space"]= "preserve";
    pre.dir = "dir";
    pre["xml:lang"] = "lang";
    pre.translate = "translate";
    pre.props = "props";
    pre.id = "id";
    pre.conref = "conref";
    pre.outputclass = "outputclass";
    pre.class = "class";

    expect(pre['xml:space']).to.equal("preserve");
    expect(pre.dir).to.equal("dir");
    expect(pre["xml:lang"]).to.equal("lang");
    expect(pre.translate).to.equal("translate");
    expect(pre.props).to.equal("props");
    expect(pre.id).to.equal("id");
    expect(pre.conref).to.equal("conref");
    expect(pre.outputclass).to.equal("outputclass");
    expect(pre.class).to.equal("class");
  });
});
